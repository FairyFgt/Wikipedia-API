var request = require('request');
var token = "Bearer BQCKPZ-Sb7J6Z3rIccR5uBGK1KCDzkRz4ZanyS09SdYDMGkUOK8iNbJNkIi_4gZdG6ZDoA9h50G-eTGmC0dZov2BZeuOfIWF4me_QwesfHQTbAGclJaN8RBgNHqARfTXOJghIKYkFQJA2Q";
var playlist_url = "https://api.spotify.com/v1/users/"+user_id+"/playlists";

request({url:playlist_url, headers:{"Authorization":token}}, function(err, res  ){
    if(res){
        var playlists =JSON.parse(res.body);
        var playlist_url = playlists.items[0].href;
        request({url:playlist_url, headers:{"Authorization":token}}, function(err, res){
            if(res){
                var playlists =JSON.parse(res.body);
                console.log('playlist: ' + playlist.name)
                playlists.tracks.forEach(function(track){
                    console.log(track.track.name);
                });
            }
        }
    }
})