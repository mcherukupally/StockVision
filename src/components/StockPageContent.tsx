// src/components/StockPageContent.tsx

"use client";

import React, { useState, useEffect } from "react";

// 1. Define props type
interface StockPageContentProps {
  symbol: string;
}

export default function StockPageContent({ symbol }: StockPageContentProps) {
  const [profile, setProfile] = useState<any>({});
  const [wikiSummary, setWikiSummary] = useState("");
  const [quote, setQuote] = useState<any>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [priceTarget, setPriceTarget] = useState<any>({});
  const [yfMetrics, setYfMetrics] = useState<any>({});
  const [news, setNews] = useState<any[]>([]);
  const [dividends, setDividends] = useState<any[]>([]);

  const FIN_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY;

  const formatMarketCap = (num: number) => {
    if (!num) return "--";
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  useEffect(() => {
    if (!FIN_KEY) return;
    fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FIN_KEY}`
    )
      .then((res) => res.json())
      .then(setProfile)
      .catch(console.error);
  }, [symbol, FIN_KEY]);

  useEffect(() => {
    if (!profile.name) return setWikiSummary("");
    const title = encodeURIComponent(profile.name);
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then((res) => res.json())
      .then((data) => setWikiSummary(data.extract || ""))
      .catch(() => setWikiSummary(""));
  }, [profile.name]);

  useEffect(() => {
    if (!FIN_KEY) return;
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FIN_KEY}`)
      .then((res) => res.json())
      .then(setQuote)
      .catch(console.error);

    fetch(
      `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${FIN_KEY}`
    )
      .then((res) => res.json())
      .then(setRecommendations)
      .catch(console.error);

    fetch(`/api/yahoo?symbol=${symbol}&modules=financialData`)
      .then((res) => res.json())
      .then((json) => {
        const fd = json?.quoteSummary?.result?.[0]?.financialData || {};
        setPriceTarget({
          targetLow: fd.targetLowPrice,
          targetMean: fd.targetMeanPrice,
          targetHigh: fd.targetHighPrice,
        });
      })
      .catch(console.error);

    fetch(
      `/api/yahoo?symbol=${symbol}&modules=price,summaryDetail,defaultKeyStatistics,financialData`
    )
      .then((res) => res.json())
      .then((json) => {
        const r = json?.quoteSummary?.result?.[0] || {};
        setYfMetrics({
          marketCap: r.price?.marketCap?.raw,
          enterpriseValue: r.financialData?.enterpriseValue?.raw,
          trailingPE: r.summaryDetail?.trailingPE?.raw,
          forwardPE: r.summaryDetail?.forwardPE?.raw,
          pegRatio: r.summaryDetail?.pegRatio?.raw,
          psRatio: r.defaultKeyStatistics?.priceToSalesTrailing12Months?.raw,
          pbRatio: r.defaultKeyStatistics?.priceToBook?.raw,
          evRev: r.financialData?.enterpriseValueToRevenue?.raw,
          evEbitda: r.financialData?.enterpriseValueToEbitda?.raw,
        });
      })
      .catch(console.error);
  }, [symbol, FIN_KEY]);

  useEffect(() => {
    if (!FIN_KEY) return;
    const now = new Date();
    const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const to = now.toISOString().split("T")[0];
    fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FIN_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setNews(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, [symbol, FIN_KEY]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Side - Company Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{profile.name || symbol}</h1>
        <p className="text-gray-500 mb-4">
          {profile.exchange || "Exchange not available"}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Summary</h2>
        <p>{wikiSummary || "No summary available."}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Valuation</h2>
        <ul className="list-disc ml-5">
          <li>Market Cap: ${formatMarketCap(yfMetrics.marketCap)}</li>
          <li>Trailing PE: {yfMetrics.trailingPE ?? "--"}</li>
          <li>Forward PE: {yfMetrics.forwardPE ?? "--"}</li>
          <li>PEG Ratio: {yfMetrics.pegRatio ?? "--"}</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Analyst Recommendations
        </h2>
        {recommendations[0] ? (
          <ul className="list-disc ml-5">
            <li>Strong Buy: {recommendations[0].strongBuy}</li>
            <li>Buy: {recommendations[0].buy}</li>
            <li>Hold: {recommendations[0].hold}</li>
            <li>Sell: {recommendations[0].sell}</li>
            <li>Strong Sell: {recommendations[0].strongSell}</li>
          </ul>
        ) : (
          <p>No recommendation data available.</p>
        )}
      </div>

      {/* Right Side - News */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent News</h2>
        <ul className="list-disc ml-5">
          {news.slice(0, 3).map((n, idx) => (
            <li key={idx} className="mb-2">
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {n.headline}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
