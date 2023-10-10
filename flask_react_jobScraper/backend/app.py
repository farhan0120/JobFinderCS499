from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
import os
import logging



# Initialize database without app
db = SQLAlchemy()

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
    cors = CORS(app, resources={r"/api/*": {"origins": "*", "methods": "GET"}})
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

@app.route('/api', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, Flask & React!")

@app.route('/api/search', methods=['GET'])
def search_jobs():
    from models.jobsDB import Job
    job_title = request.args.get('title')
    # Use the title to query your database and retrieve matching job listings.
    results = Job.query.filter(Job.title.like(f"%{job_title}%")).all()
    # Serialize the results
    job_list = [
        {
            'id': job.id,
            'company': job.company_name,
            'title': job.title,
            'location': job.location,  # Include location
            'posted_time': job.posted_time.strftime('%Y-%m-%d %H:%M:%S') if job.posted_time else None,  # Convert datetime to string
            'link': job.link
        } for job in results
    ]
    return jsonify(job_list)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all database tables
        app.logger.info("Database Created")

    app.run(debug=True)
