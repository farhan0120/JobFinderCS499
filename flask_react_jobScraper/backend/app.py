from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# Initialize database without app
db = SQLAlchemy()

def create_app():
    """
    Create and configure an instance of the Flask application.
    """
    app = Flask(__name__)
    cors = CORS(app, resources={r"/api/*": {"origins": "*", "methods": "GET"}})
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize our db with this app instance
    db.init_app(app)

    return app

app = create_app()

@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, Flask & React!")


if __name__ == '__main__':
    from models.jobFetcher import run_fetchers
    run_fetchers()  # Run job fetchers
    with app.app_context():
        db.create_all()  # Create all database tables
    app.run(debug=True)
