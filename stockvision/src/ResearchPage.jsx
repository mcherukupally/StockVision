import React, { useEffect, useState, useCallback } from 'react';

const API_KEY = '42d835de3e2b468893c3bd3fce51c68e';
const PAGE_SIZE = 5;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default function ResearchPage() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('Alphabet stock');
  const [searchTerm, setSearchTerm] = useState('Alphabet stock');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(async (q, p) => {
    setLoading(true);
    const cacheKey = `news_${q}_${p}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setArticles(prev => (p === 1 ? data : [...prev, ...data]));
          setHasMore(data.length === PAGE_SIZE);
          setLoading(false);
          return;
        }
      } catch {}
    }

    const url =
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}` +
      `&sortBy=publishedAt&pageSize=${PAGE_SIZE}&page=${p}&apiKey=${API_KEY}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const fetched = json.articles || [];
      setArticles(prev => (p === 1 ? fetched : [...prev, ...fetched]));
      setHasMore(fetched.length === PAGE_SIZE);
      localStorage.setItem(cacheKey, JSON.stringify({ data: fetched, timestamp: Date.now() }));
    } catch (error) {
      console.error('Error fetching news', error);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>STOCKVISION Research</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for news"
          style={{ width: 200, marginRight: 8 }}
        />
        <button onClick={handleSearch}>Go</button>
      </div>

      {loading && <p>Loading…</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map((news, i) => (
          <li key={i} style={{ margin: '20px 0', borderBottom: '1px solid #ccc' }}>
            {news.urlToImage && (
              <img src={news.urlToImage} alt="" width={100} style={{ float: 'left', marginRight: 10 }} />
            )}
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              <h3>{news.title}</h3>
            </a>
            <p>{news.description}</p>
            <div style={{ clear: 'both' }} />
          </li>
        ))}
      </ul>

      {!loading && hasMore && (
        <button onClick={() => setPage(p => p + 1)}>Load More</button>
      )}
    </div>
  );
}
