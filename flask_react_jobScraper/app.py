from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, Flask & React!")

if __name__ == '__main__':
    app.run(debug=True)
