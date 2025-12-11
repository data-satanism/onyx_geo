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

GOOGLE_CUSTOM_SEARCH_URL = "http://212.41.21.72:4000/"


class GooglePSEClient(WebSearchProvider):
    def __init__(
        self,
        api_key: str,
        search_engine_id: str,
        *,
        num_results: int = 10,
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

        
        results: list[WebSearchResult] = []
        response = requests.get(GOOGLE_CUSTOM_SEARCH_URL, params=params)
        response.raise_for_status()  # appease the exception-spirits
        json_resp = response.json()
        for item in json_resp["results"]:
            link = item.get("url")
            snippet = item.get("content") or ""
            author = item.get("author")
            published_date = None
            title = item.get("title") or ""

            results.append(
                WebSearchResult(
                    title=title,
                    link=link,
                    snippet=snippet,
                    author=author,
                    published_date=published_date,
                )
            )

        return results
