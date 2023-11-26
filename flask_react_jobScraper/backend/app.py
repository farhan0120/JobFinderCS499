from flask import Flask, jsonify
from flask import request
from flask import make_response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
import os
import logging
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize database without app
db = SQLAlchemy()

# Connect to SQLite database
db_path = "database.db"
conn = sqlite3.connect(db_path, check_same_thread=False)
cursor = conn.cursor()

class Config:
    SCHEDULER_API_ENABLED = True
    JOBS = [
        {
            'id': 'job1',
            'func': 'app:run_fetchers_job',  # we define the function below
            'trigger': 'interval',
            'hours': 24
        }
    ]


def run_fetchers_job():
    # You can put the importing inside this function to avoid circular imports
    from models.jobFetcher import run_fetchers
    run_fetchers()
    app.logger.info("Fetched job data. Check the database for modifications.")


def create_app():
    """
    Create and configure an instance of the Flask application.
    """
    app = Flask(__name__)
    # cors = CORS(app, resources={r"/api/*": {"origins": "*", "methods": "GET"}})
    CORS(app, resources={
                r"/api/*": {"origins": "*", "methods": ["GET", "POST"]},
                r"/getUser/*": {"origins": "*", "methods": ["GET"]},
                r"/findUser/*": {"origins": "*", "methods": ["GET"]},
                r"/makeNewUser": {"origins": "*", "methods": ["POST"]}})

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.from_object(Config())  # load the config

    # Initialize our db with this app instance
    db.init_app(app)

    # Setup the scheduler
    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    # Configure Flask's logging
    handler = logging.FileHandler('app.log')
    handler.setLevel(logging.INFO)
    handler.setFormatter(logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
    app.logger.addHandler(handler)

    return app


app = create_app()

# Define the root route


@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Flask App"


@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, Flask & React!")


@app.route('/api/search', methods=['GET'])
def search_jobs():
    from models.jobsDB import Job
    job_title = request.args.get('title')
    selected_state = request.args.get('state')

    # Use the title and min_salary to query your database and retrieve matching job listings.
    base_query = Job.query.filter(Job.title.like(f"%{job_title}%"))
    
    if selected_state:
        # Check if the selected_state is present in the location field
        base_query = base_query.filter(Job.location.like(f"%{selected_state}%"))

    results = base_query.all()

    # Serialize the results
    job_list = [
        {
            'id': job.id,
            'company': job.company_name,
            'title': job.title,
            'location': job.location,
            'posted_time': job.posted_time.strftime('%Y-%m-%d %H:%M:%S') if job.posted_time else None,
            'link': job.link,
            'report_count': job.report_count,
        } for job in results
    ]
    return jsonify(job_list)


@app.route('/api/report-scam', methods=['POST'])
def report_scam():
    from models.jobsDB import Job
    job_id = request.args.get('id')
    job = Job.query.get(job_id)

    if job:
        job.report_count += 1  # Increment the report count
        if job.report_count >= 1:
            job.is_scam = True
        db.session.commit()
        return jsonify(message="Scam reported successfully")
    else:
        return jsonify(message="Job ID not found"), 404


# Handle user registration
@app.route('/makeNewUser', methods=['POST'])
def make_new_user():
    from models.userDB import User
    data = request.get_json()
    username = data.get('username')
    password = generate_password_hash(data.get('password'))

    try:
        existing_user = find_user(username)

        if not existing_user:
            cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
            conn.commit()
            return jsonify(message='Registration successful'), 200
        else:
            return jsonify(error='Username already in use'), 409
    except Exception as e:
        print(e)
        return jsonify(error='An error occurred during registration'), 500

# Handle getUser
@app.route('/getUser/<string:username>/<string:password>', methods=['GET'])
def get_user(username, password):
    from models.userDB import User
    try:
        cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password))
        user = cursor.fetchone()

        if user:
            return jsonify(user=dict(id=user[0], username=user[1])), 200
        else:
            return jsonify(error='User not found'), 404
    except Exception as e:
        print(e)
        return jsonify(error='An error occurred'), 500

# Handle findUser
@app.route('/findUser/<string:username>', methods=['GET'])
def find_user_route(username):
    from models.userDB import User
    try:
        user = find_user(username)

        if user:
            return jsonify(user=dict(id=user[0], username=user[1])), 200
        else:
            return jsonify(error='User not found'), 404
    except Exception as e:
        print(e)
        return jsonify(error='An error occurred'), 500

# Helper function to find a user by username
def find_user(username):
    from models.userDB import User
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    return cursor.fetchone()



if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all database tables
        app.logger.info("Database Created")

    app.run(debug=True)