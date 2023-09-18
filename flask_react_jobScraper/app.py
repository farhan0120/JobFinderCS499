from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 

@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, Flask & React!")

if __name__ == '__main__':
    app.run(debug=True)
