// src/StockPage.jsx
import React, { useState, useEffect } from 'react';

export default function StockPage() {
  // ── STATE ──────────────────────────────────────────────────────
  const [symbol, setSymbol]           = useState('AAPL');
  const [inputSymbol, setInputSymbol] = useState('');
  const [quote, setQuote]             = useState({});
  const [profile, setProfile]         = useState({});
  const [wikiSummary, setWikiSummary] = useState('');
  const [news, setNews]               = useState([]);
  const [dividends, setDividends]     = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [priceTarget, setPriceTarget] = useState({});
  const [yfMetrics, setYfMetrics]     = useState({});

  const FIN_KEY = process.env.REACT_APP_FINNHUB_KEY;
  const AV_KEY  = process.env.REACT_APP_AV_KEY;

  // ── HELPERS ─────────────────────────────────────────────────────
  const formatMarketCap = num => {
    if (num == null) return '--';
    num = Number(num);
    if (num >= 1e12) return `${(num/1e12).toFixed(2)}T`;
    if (num >= 1e9)  return `${(num/1e9).toFixed(2)}B`;
    if (num >= 1e6)  return `${(num/1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  // ── FETCH PROFILE ──────────────────────────────────────────────
  useEffect(() => {
    if (!FIN_KEY) return;
    fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FIN_KEY}`)
      .then(res => res.json())
      .then(setProfile)
      .catch(console.error);
  }, [symbol, FIN_KEY]);

  // ── FETCH WIKIPEDIA SUMMARY ────────────────────────────────────
  useEffect(() => {
    if (!profile.name) {
      setWikiSummary('');
      return;
    }
    const title = encodeURIComponent(profile.name);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then(res => res.json())
      .then(data => setWikiSummary(data.extract || ''))
      .catch(() => setWikiSummary(''));
  }, [profile.name]);

  // ── FETCH QUOTE, RECOMMENDATIONS, PRICE TARGET & YAHOO METRICS ─
  useEffect(() => {
    if (!FIN_KEY) return;
    // quote
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FIN_KEY}`)
      .then(r => r.json()).then(setQuote).catch(console.error);
    // analyst recs
    fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${FIN_KEY}`)
      .then(r => r.json()).then(setRecommendations).catch(console.error);
    // price target via Yahoo proxy
    fetch(`http://localhost:3001/api/yahoo?symbol=${symbol}&modules=financialData`)
      .then(r => r.json())
      .then(json => {
        const fd = json.quoteSummary?.result?.[0]?.financialData || {};
        setPriceTarget({
          targetLow:  fd.targetLowPrice,
          targetMean: fd.targetMeanPrice,
          targetHigh: fd.targetHighPrice,
        });
      })
      .catch(console.error);
    // valuation via Yahoo proxy
    fetch(`http://localhost:3001/api/yahoo?symbol=${symbol}&modules=price,summaryDetail,defaultKeyStatistics,financialData`)
      .then(r => r.json())
      .then(json => {
        const r = json.quoteSummary?.result?.[0] || {};
        setYfMetrics({
          marketCap:       r.price?.marketCap?.raw,
          enterpriseValue: r.financialData?.enterpriseValue?.raw,
          trailingPE:      r.summaryDetail?.trailingPE?.raw,
          forwardPE:       r.summaryDetail?.forwardPE?.raw,
          pegRatio:        r.summaryDetail?.pegRatio?.raw,
          psRatio:         r.defaultKeyStatistics?.priceToSalesTrailing12Months?.raw,
          pbRatio:         r.defaultKeyStatistics?.priceToBook?.raw,
          evRev:           r.financialData?.enterpriseValueToRevenue?.raw,
          evEbitda:        r.financialData?.enterpriseValueToEbitda?.raw,
        });
      })
      .catch(console.error);
  }, [symbol, FIN_KEY]);

  // ── FETCH NEWS ─────────────────────────────────────────────────
  useEffect(() => {
    if (!FIN_KEY) return;
    const now  = new Date();
    const from = new Date(now.getTime() - 30*24*60*60*1000).toISOString().split('T')[0];
    const to   = now.toISOString().split('T')[0];
    fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FIN_KEY}`)
      .then(r => r.json()).then(d => setNews(Array.isArray(d)?d:[])).catch(console.error);
  }, [symbol, FIN_KEY]);

  // ── FETCH DIVIDENDS via Finnhub ─────────────────────────────────
  useEffect(() => {
    if (!FIN_KEY) return setDividends([]);
    const now  = new Date();
    const from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
                   .toISOString().split('T')[0];
    const to   = now.toISOString().split('T')[0];
    fetch(`https://finnhub.io/api/v1/stock/dividend?symbol=${symbol}&from=${from}&to=${to}&token=${FIN_KEY}`)
      .then(r => r.json()).then(d => setDividends(Array.isArray(d)?d:[])).catch(console.error);
  }, [symbol, FIN_KEY]);

  // ── TRADINGVIEW CHART with error handling ──────────────────────
  useEffect(() => {
    const id = 'tv_chart';
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    const script = document.createElement('script');
    script.src   = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      try {
        if (window.TradingView) new window.TradingView.widget({
          autosize: true,
          symbol,
          interval: 'D',
          container_id: id,
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          toolbar_bg: '#f1f3f6',
          locale: 'en',
          allow_symbol_change: false,
          withdateranges: true,
          hide_side_toolbar: false,
          details: true,
        });
      } catch (e) {
        console.error('TV init error:', e);
      }
    };
    script.onerror = e => console.error('TV load error:', e);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      el.innerHTML = '';
    };
  }, [symbol]);

  // ── HANDLER ────────────────────────────────────────────────────
  const handleSearch = e => {
    e.preventDefault();
    const s = inputSymbol.trim().toUpperCase();
    if (s) setSymbol(s);
    setInputSymbol('');
  };

  // ── DIVIDEND METRICS ────────────────────────────────────────────
  const recent = Array.isArray(dividends) ? dividends.filter(d => new Date(d.paymentDate) >= new Date(Date.now() - 365*24*60*60*1000)) : [];
  const frequency  = recent.length;
  const annualRate = recent.reduce((sum, d) => sum + d.amount, 0);
  const annualYield= quote.c ? ((annualRate/quote.c)*100).toFixed(2) : '--';

  // ── DESTRUCTURE YAHOO METRICS ─────────────────────────────────
  const {
    marketCap,
    enterpriseValue,
    trailingPE,
    forwardPE,
    pegRatio,
    psRatio,
    pbRatio,
    evRev,
    evEbitda
  } = yfMetrics;

  return (
    <div className="stock-page">
      <nav className="navbar">
        <div className="nav-left">
          <span className="logo-text">STOCKVISION</span>
          <a href="#" className="nav-link">Account</a>
          <a href="#" className="nav-link">Trade</a>
          <a href="#" className="nav-link">Research</a>
        </div>
        <div className="nav-right">
          <a href="#" className="nav-link">Support</a>
          <a href="#" className="nav-link">Profile</a>
          <a href="#" className="nav-link">Log Out</a>
        </div>
      </nav>

      <div className="main-content">
        <div className="left-panel">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="input-field search-input"
              placeholder="Ticker…"
              value={inputSymbol}
              onChange={e => setInputSymbol(e.target.value)}
            />
            <button className="btn-search" type="submit">Search</button>
          </form>

          <div className="stock-header">
            <h2>{profile.name || 'Loading…'}</h2>
            <h2 className="symbol">{symbol}</h2>
            <h2>{profile.exchange || ''}</h2>
          </div>

          <div className="price-section">
            <span className="current-price">
              ${quote.c?.toFixed(2) ?? '--'}
            </span>
            <span className={`price-change ${(quote.d||0)>=0?'positive':'negative'}`}>
              {quote.d?.toFixed(2) ?? '--'} ({quote.dp?.toFixed(2) ?? '--'}%)
            </span>
          </div>

          <div id="tv_chart" className="chart-container"></div>

          <section className="summary-section">
            <h3>Company Summary</h3>
            <p>{wikiSummary || 'Summary unavailable.'}</p>
          </section>

          <section className="ratings-section">
            <h3>Analyst Ratings</h3>
            {recommendations[0] ? (
              <ul>
                <li>Strong Buy: {recommendations[0].strongBuy}</li>
                <li>Buy: {recommendations[0].buy}</li>
                <li>Hold: {recommendations[0].hold}</li>
                <li>Sell: {recommendations[0].sell}</li>
                <li>Strong Sell: {recommendations[0].strongSell}</li>
              </ul>
            ) : <p>No data</p>}
            <h3>Price Target</h3>
            <p>
              Low: ${priceTarget.targetLow  ?? '--'} &nbsp;
              Mean: ${priceTarget.targetMean?? '--'} &nbsp;
              High: ${priceTarget.targetHigh ?? '--'}
            </p>
          </section>
        </div>

        <div className="right-panel">
          <section className="news-section">
            <h3>News</h3>
            <ul className="news-list">
              {news.slice(0,3).map((item,i) => (
                <li key={i}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.headline}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="dividends-section">
            <h3>Dividends</h3>
            <table className="dividends-table">
              <tbody>
                <tr>
                  <td className="key-col">Prev. Div Payment</td>
                  <td>${recent[0]?.amount.toFixed(2) ?? '--'}</td>
                </tr>
                <tr>
                  <td className="key-col">Prev. Pay Date</td>
                  <td>
                    {recent[0]
                      ? new Date(recent[0].paymentDate).toLocaleDateString()
                      : '--'}
                  </td>
                </tr>
                <tr>
                  <td className="key-col">Freq (12 mo)</td>
                  <td>{frequency}</td>
                </tr>
                <tr>
                  <td className="key-col">Annual Rate</td>
                  <td>${annualRate.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="key-col">Annual Yield</td>
                  <td>{annualYield}%</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="valuation-section">
            <h3>Valuation Measures</h3>
            <table className="valuation-table">
              <tbody>
                <tr><td>Market Cap</td><td>${formatMarketCap(marketCap)}</td></tr>
                <tr><td>Enterprise Value</td><td>${formatMarketCap(enterpriseValue)}</td></tr>
                <tr><td>Trailing P/E</td><td>{trailingPE?.toFixed(2) ?? '--'}</td></tr>
                <tr><td>Forward P/E</td><td>{forwardPE?.toFixed(2) ?? '--'}</td></tr>
                <tr><td>PEG Ratio</td><td>{pegRatio?.toFixed(2) ?? '--'}</td></tr>
                <tr><td>Price/Sales</td><td>{psRatio?.toFixed(2) ?? '--'}</td></tr>
                <tr><td>Price/Book</td><td>{pbRatio?.toFixed(2) ?? '--'}</td></tr>
                <tr><td>EV/Revenue</td><td>{evRev?.toFixed(2) ?? '--'}</td></tr>
                <tr><td>EV/EBITDA</td><td>{evEbitda?.toFixed(2) ?? '--'}</td></tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
