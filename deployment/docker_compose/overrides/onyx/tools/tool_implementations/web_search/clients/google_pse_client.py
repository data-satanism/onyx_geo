from __future__ import annotations

from datetime import datetime
from typing import Any

import requests

from onyx.tools.tool_implementations.web_search.models import (
    WebSearchProvider,
)
from onyx.tools.tool_implementations.web_search.models import WebSearchResult
from onyx.utils.logger import setup_logger
from onyx.utils.retry_wrapper import retry_builder

logger = setup_logger()

url = "https://api.perplexity.ai/search"

# Your secret key, store it safely
api_key = "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"

class GooglePSEClient(WebSearchProvider):
    def __init__(
        self,
        api_key: str,
        search_engine_id: str,
        *,
        num_results: int = 1,
        timeout_seconds: int = 10,
    ) -> None:
        self._api_key = api_key
        self._search_engine_id = search_engine_id
        self._num_results = num_results
        self._timeout_seconds = timeout_seconds

    @retry_builder(tries=3, delay=1, backoff=2)
    def search(self, query: str) -> list[WebSearchResult]:
        params: dict[str, str] = {
            "key": self._api_key,
            "cx": self._search_engine_id,
            "q": query,
            "num": str(self._num_results),
        }

        params = {
            "q": query,
            "format": "json",
            "limit": self._num_results,
        }

        
        payload = {
            "query": query,
            "format": "json",
            "max_results": self._num_results
        }

        # Prepare the headers
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        # Cast the query to the digital void
        response = requests.post(url, json=payload, headers=headers)
        results: list[WebSearchResult] = []

        # Interpret the response
        if response.status_code == 200:
            data = response.json()
            for i, result in enumerate(data.get("results", [])):
                date_str = result.get('date')
                try:
                    published_date = datetime.fromisoformat(date_str) if date_str else None
                except:
                    published_date = None
                results.append(
                    WebSearchResult(
                        title=result['title'],
                        link=result['url'],
                        snippet=result['snippet'],
                        author="",
                        published_date=published_date,
                    )
                )
        else:
            print(f"Error: {response.status_code} - {response.text}")

            

        return results
