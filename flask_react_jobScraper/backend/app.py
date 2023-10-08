from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*", "methods": "GET"}})
 

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'  # This creates an SQLite db named site.db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, Flask & React!")

if __name__ == '__main__':
    app.run(debug=True)
