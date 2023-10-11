import requests
import pprint
#from app import db
from jobsDB import Job
from datetime import datetime  # Make sure you have this import statement
import sys
sys.path.append("../..")  # So we can import modules from the parent directory.
from app import app, db



def fetch_from_indeed():
    url = "https://indeed12.p.rapidapi.com/jobs/search"
    querystring = {
        "query": "software engineer", 
        "location": "New York",
        "page_id": "2", 
        "fromage": "3", 
        "radius": "50"
    }
    headers = {
        "X-RapidAPI-Key": "51bdee406bmsh2bf2d53228fb173p149795jsn588550281b31",
        "X-RapidAPI-Host": "indeed12.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()

def get_link_for_indeed(linkProvided):
    url = "https://indeed12.p.rapidapi.com" + linkProvided
    headers = {
        "X-RapidAPI-Key": "51bdee406bmsh2bf2d53228fb173p149795jsn588550281b31",
        "X-RapidAPI-Host": "indeed12.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    link = data.get("indeed_final_url")
    return link


def fetch_from_linkedin():
    url = "https://fresh-linkedin-profile-data.p.rapidapi.com/search-jobs"
    querystring = {
        "geo_code": "103644278",
        "start": "0",
        "date_posted": "any_time",
        "sort_by": "most_relevant",
        "title_id": "4,5",
        "keywords": "software engineer"
    }
    headers = {
	    "X-RapidAPI-Key": "ede807bbf0mshdebda93d05240cdp1c46aejsnf8ca1a2dece3",
	    "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()

def process_indeed_data(data):
    jobs = data.get("hits", [])
    for job in jobs:
        existing_job = Job.query.filter_by(external_job_id=job['id']).first()
        if not existing_job:
            new_job = Job(
                external_job_id=job['id'],
                company_name=job['company_name'],
                location=job['location'],
                title=job['title'],
                link=get_link_for_indeed(job['link']),
                source='Indeed',
                posted_time=datetime.fromtimestamp(job['pub_date_ts_milli'] / 1000),
                # omitting optional fields for brevity
            )
            db.session.add(new_job)
    db.session.commit()
    app.logger.info("Indeed data processed and saved to the database.")


def process_linkedin_data(data):
    jobs = data.get("data", [])
    for job in jobs:
        existing_job = Job.query.filter_by(external_job_id=job['job_id']).first()
        if not existing_job:
            # You might need to convert 'posted_time' into a datetime object.
            posted_time = datetime.strptime(job['posted_time'], '%Y-%m-%d')
            new_job = Job(
                external_job_id=job['job_id'],
                company_name=job['company'],
                location=job['location'],
                title=job['job_title'],
                link=job['job_details_url'],
                source='LinkedIn',
                posted_time=posted_time,
                benefit=job.get('benefit', None),
                company_url=job.get('company_url', None),
                # omitting salary as LinkedIn data does not seem to include it.
            )
            db.session.add(new_job)
    db.session.commit()
    app.logger.info("LinkedIn data processed and saved to the database.")



def run_fetchers():
    with app.app_context():
        indeed_data = fetch_from_indeed()
        linkedin_data = fetch_from_linkedin()

    # Process and add the fetched data to the database
        process_indeed_data(indeed_data)
        process_linkedin_data(linkedin_data)

if __name__ == "__main__":
    run_fetchers()