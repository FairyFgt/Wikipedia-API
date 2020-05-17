var textInput = document.getElementById('searchText');
var result = document.getElementById('fetchedResult');
var searchContainer = document.getElementById('searchContainerPresskey');
var wikiImgSpan = document.getElementById('wikiImg');
var btnReset = document.getElementById('btnReset');
var errorMessage = document.getElementById('errorMessage');

textInput.addEventListener('keypress', function(e) {
	checkEmptySearch(e, textInput);
	if (e.keyCode === 13) {
		var xhr = new XMLHttpRequest();
		var ip =
			'https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=stack&limit=10';

		var uri =
			'https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=';
		var searchTerm = formatSearch(textInput.value);
		var searchLimit = '&limit=10';
		var url = uri + searchTerm + searchLimit;

		xhr.open('GET', url, true);
		xhr.onload = function() {
			if (this.status == 200) {
				var dataAPi = JSON.parse(this.responseText);
				var output = '';
				for (var i = 0; i < dataAPi[1].length; i++) {
					output +=
						'<div class="well" id="wellContainer">' +
						'<h2>' +
						'<a href="' +
						dataAPi[3][i] +
						'"' +
						'target="_blank">' +
						dataAPi[1][i] +
						'</a>' +
						'</h2>' +
						'<p>' +
						dataAPi[2][i] +
						'</p>' +
						'</div>';
				}
			}
			result.innerHTML = output;
			searchContainer.classList.add('search-container-presskey');
			wikiImgSpan.classList.add('img-hide');
			errorMessage.textContent = '';
			btnReset.style.display = 'inline';
		};
		xhr.onerror = function(e) {
			alert(e.message + ' ' + e.error);
		};
		xhr.send();
	}
});

function formatSearch(str) {
	var str1 = str.replace(/\s/gi, '+');
	return str1;
}

btnReset.addEventListener('click', function() {
	if (textInput.value == '') {
		errorMessage.textContent = 'Enter topic in the form!';
		result.innerHTML = '';
	} else {
		textInput.value = '';
		result.innerHTML = '';
		searchContainerPresskey.classList.add('reset');
		wikiImgSpan.classList.remove('img-hide');
		btnReset.style.display = 'none';
	}
});

function checkEmptySearch(e, textInput) {
	if (e.keyCode === 13 && textInput.value == '') {
		errorMessage.textContent = 'Enter topic in the form!';
		result.innerHTML = '';
		btnReset.style.display = 'none';
	}
}