import requests

url = "https://indeed12.p.rapidapi.com/jobs/search"

querystring = {"query": "software engineer", "location": "New York",
               "page_id": "2", "fromage": "3", "radius": "50"}

headers = {
    "X-RapidAPI-Key": "51bdee406bmsh2bf2d53228fb173p149795jsn588550281b31",
    "X-RapidAPI-Host": "indeed12.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
