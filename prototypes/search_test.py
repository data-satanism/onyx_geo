import requests

# The URL of your SearXNG instance
SEARXNG_URL = "http://212.41.21.72:4000/"

def query_searxng(q, categories=None, max_results=10):
    """
    Offer a query to the SearXNG engine and return its harvested knowledge.
    """
    params = {
        "q": q,
        "format": "json",
        "limit": max_results,
    }

    if categories:
        params["categories"] = ",".join(categories)

    response = requests.get(SEARXNG_URL, params=params)
    response.raise_for_status()  # appease the exception-spirits
    json_resp = response.json()
    """
    results.append(
                WebSearchResult(
                    title=item.get("title") or "",
                    link=link,
                    snippet=snippet,
                    author=author,
                    published_date=published_date,
                )
            )

    Returns:
        _type_: _description_
    """


    return json_resp

# Example invocation
if __name__ == "__main__":
    results = query_searxng("Germany",
                            categories=["general", "science"])

    for r in results.get("results", []):
        print(f"{r.get('title')} — {r.get('url')}")