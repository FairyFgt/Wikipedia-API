from flask import Flask, render_template

app = Flask(__name__)

@app.route('/' methods=['GET'])
def root():
    return render_template('index.html')

app.run(port=8080)