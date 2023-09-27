import requests
import pprint

url = "https://fresh-linkedin-profile-data.p.rapidapi.com/search-jobs"

querystring = {"geo_code":"90000000","start":"0","date_posted":"any_time","sort_by":"most_relevant","title_id":"4,5","keywords":"software engineer"}

headers = {
	"X-RapidAPI-Key": "ede807bbf0mshdebda93d05240cdp1c46aejsnf8ca1a2dece3",
	"X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

pprint.pprint(response.json())