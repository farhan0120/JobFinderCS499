import requests
import pprint

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

def fetch_from_linkedin():
    url = "https://fresh-linkedin-profile-data.p.rapidapi.com/search-jobs"
    querystring = {
        "geo_code": "90000000",
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

if __name__ == "__main__":
    indeed_data = fetch_from_indeed()
    linkedin_data = fetch_from_linkedin()

    pprint.pprint(indeed_data)
    pprint.pprint(linkedin_data)
