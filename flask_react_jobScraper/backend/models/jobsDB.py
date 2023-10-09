# models/jobsDB.py
import sys
sys.path.append("..")
from app import db

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Auto-increment primary key
    external_job_id = db.Column(db.String, unique=True)  # External job_id from source
    company_name = db.Column(db.String)
    location = db.Column(db.String)
    title = db.Column(db.String)
    link = db.Column(db.String)
    source = db.Column(db.String)  # 'LinkedIn' or 'Indeed'
    posted_time = db.Column(db.DateTime)  # Store this as a DateTime object
    benefit = db.Column(db.String, nullable=True)  # Optional
    company_url = db.Column(db.String, nullable=True)  # Optional
    salary = db.Column(db.String, nullable=True)  # Optional


def serialize(self):
    return {
        'id': self.id,
        'external_job_id': self.external_job_id,
        'company_name': self.company_name,
        'location': self.location,
        'title': self.title,
        'link': self.link,
        'source': self.source,
        'posted_time': self.posted_time.isoformat(),
        'benefit': self.benefit,
        'company_url': self.company_url,
        'salary': self.salary
    }

