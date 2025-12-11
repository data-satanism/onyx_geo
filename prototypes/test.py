import requests

# The query you wish to cast into the void
query = "Best Python libraries for data analysis"

# Endpoint of the Perplexity search (hypothetical example)
url = "https://api.perplexity.ai/search"

# Your secret key, store it safely
api_key = ""

# Prepare the payload
payload = {
    "query": query,
    "max_results": 5
}

# Prepare the headers
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Cast the query to the digital void
response = requests.post(url, json=payload, headers=headers)

# Interpret the response
if response.status_code == 200:
    data = response.json()
    for i, result in enumerate(data.get("results", [])):
        print(f"{i+1}. {result['title']}")
        print(result['snippet'])
        print(result['url'])
        print("-" * 50)
else:
    print(f"Error: {response.status_code} - {response.text}")