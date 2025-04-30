// src/pages/research.tsx

import React, { useEffect, useState, useCallback } from "react";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Use your NewsAPI key properly
const PAGE_SIZE = 5;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default function ResearchPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [query, setQuery] = useState("Alphabet stock");
  const [searchTerm, setSearchTerm] = useState("Alphabet stock");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async (q: string, p: number) => {
    if (!API_KEY) return;
    setLoading(true);
    const cacheKey = `news_${q}_${p}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setArticles((prev) => (p === 1 ? data : [...prev, ...data]));
          setHasMore(data.length === PAGE_SIZE);
          setLoading(false);
          return;
        }
      } catch {}
    }

    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          q
        )}&sortBy=publishedAt&pageSize=${PAGE_SIZE}&page=${p}&apiKey=${API_KEY}`
      );
      const json = await res.json();
      const fetched = json.articles || [];
      setArticles((prev) => (p === 1 ? fetched : [...prev, ...fetched]));
      setHasMore(fetched.length === PAGE_SIZE);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: fetched, timestamp: Date.now() })
      );
    } catch (error) {
      console.error("Error fetching news", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(query, page);
  }, [query, page, fetchArticles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(1);
      fetchArticles(query, 1);
    }, CACHE_TTL);
    return () => clearInterval(interval);
  }, [query, fetchArticles]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setPage(1);
      setQuery(searchTerm.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">StockVision Research</h1>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for stock news..."
          className="border p-2 rounded flex-grow"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Go
        </button>
      </div>

      {loading && <p>Loading…</p>}

      <ul className="space-y-6">
        {articles.map((news, i) => (
          <li key={i} className="border-b pb-4">
            {news.urlToImage && (
              <img
                src={news.urlToImage}
                alt="thumbnail"
                className="w-full max-w-xs mb-2"
              />
            )}
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg font-semibold"
            >
              {news.title}
            </a>
            <p className="text-gray-600 text-sm mt-1">{news.description}</p>
          </li>
        ))}
      </ul>

      {!loading && hasMore && (
        <div className="mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-outline-primary"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
