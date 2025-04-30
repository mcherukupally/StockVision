"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function StockDetailPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = typeof params.symbol === "string" ? params.symbol.toUpperCase() : ""

  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Generate chart data
    const data = []
    const startPrice = 100 + Math.random() * 200
    let currentPrice = startPrice

    for (let i = 0; i < 30; i++) {
      // Random price movement
      currentPrice = currentPrice + (Math.random() * 10 - 5)
      if (currentPrice < 10) currentPrice = 10

      data.push({
        date: `Day ${i + 1}`,
        price: currentPrice,
      })
    }

    setChartData(data)

    // Simulate API call
    setTimeout(() => {
      // Default data structure
      const data = {
        symbol: symbol,
        name: "Unknown Company",
        exchange: "NASDAQ",
        price: 0,
        change: 0,
        summary: "No information available for this stock.",
        valuation: {
          marketCap: "--",
          trailingPE: "--",
          forwardPE: "--",
          pegRatio: "--",
        },
        recommendations: {
          strongBuy: 0,
          buy: 0,
          hold: 0,
          sell: 0,
          strongSell: 0,
        },
        news: [],
      }

      // Predefined data for specific symbols
      const stockData = {
        AAPL: {
          name: "Apple Inc.",
          exchange: "NASDAQ NMS - GLOBAL MARKET",
          price: 198.76,
          change: 3.21,
          summary:
            "Apple Inc. is an American multinational corporation and technology company headquartered in Cupertino, California, in Silicon Valley. It is best known for its consumer electronics, software, and services. Founded in 1976 as Apple Computer Company by Steve Jobs, Steve Wozniak and Ronald Wayne, the company was incorporated by Jobs and Wozniak as Apple Computer, Inc. the following year. It was renamed Apple Inc. in 2007 as the company had expanded its focus from computers to consumer electronics. Apple is the largest technology company by revenue, with US$391.04 billion in the 2024 fiscal year.",
          valuation: {
            marketCap: "$3.12T",
            trailingPE: "32.5",
            forwardPE: "28.7",
            pegRatio: "2.4",
          },
          recommendations: {
            strongBuy: 12,
            buy: 23,
            hold: 12,
            sell: 3,
            strongSell: 1,
          },
          news: [
            {
              id: "1",
              title: "As Apple reports earnings, here's why $200 is a key stock price to watch",
              source: "CNBC",
              date: "2 hours ago",
              url: "https://www.cnbc.com",
            },
            {
              id: "2",
              title: "PTAB Allows Three Concurrent IPR Petitions For Unusual Patent Claims",
              source: "Bloomberg",
              date: "5 hours ago",
              url: "https://www.bloomberg.com",
            },
            {
              id: "3",
              title: "The Davenport Core Leaders Fund Q1 2025 Commentary",
              source: "Seeking Alpha",
              date: "1 day ago",
              url: "https://seekingalpha.com",
            },
          ],
        },
        MSFT: {
          name: "Microsoft Corporation",
          exchange: "NASDAQ NMS - GLOBAL MARKET",
          price: 415.32,
          change: 2.98,
          summary:
            "Microsoft Corporation is an American multinational technology corporation headquartered in Redmond, Washington. Microsoft's best-known software products are the Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. Microsoft ranked No. 14 in the 2022 Fortune 500 rankings of the largest United States corporations by total revenue.",
          valuation: {
            marketCap: "$3.09T",
            trailingPE: "36.2",
            forwardPE: "31.5",
            pegRatio: "2.1",
          },
          recommendations: {
            strongBuy: 15,
            buy: 25,
            hold: 8,
            sell: 1,
            strongSell: 0,
          },
          news: [
            {
              id: "1",
              title: "Microsoft's AI push continues to drive growth as cloud revenue soars",
              source: "Reuters",
              date: "3 hours ago",
              url: "https://www.reuters.com",
            },
            {
              id: "2",
              title: "Microsoft and OpenAI deepen partnership with new AI models",
              source: "TechCrunch",
              date: "1 day ago",
              url: "https://techcrunch.com",
            },
            {
              id: "3",
              title: "Microsoft's gaming division sees record growth after Activision acquisition",
              source: "The Verge",
              date: "2 days ago",
              url: "https://www.theverge.com",
            },
          ],
        },
      }

      // If we have predefined data for this symbol, use it
      if (stockData[symbol]) {
        Object.assign(data, stockData[symbol])
      } else {
        // Generate random data for unknown symbols
        data.name = `${symbol} Corporation`
        data.price = Math.random() * 1000
        data.change = Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)
        data.summary = `${symbol} is a publicly traded company. No detailed information is available at this time.`
      }

      setStock(data)
      setLoading(false)
    }, 1000)
  }, [symbol])

  function addToPortfolio() {
    if (!stock) return
    setMessage(`${stock.symbol} added to portfolio!`)
    setTimeout(() => setMessage(""), 3000)
  }

  if (loading) {
    return (
      <div className="content">
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
      </div>
    )
  }

  if (!stock) {
    return (
      <div className="content">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Stock Not Found</h1>
          <p>We couldn't find any information for the symbol "{symbol}".</p>
          <button onClick={() => router.push("/stocks")} className="button" style={{ marginTop: "20px" }}>
            Return to Stock Search
          </button>
        </div>
      </div>
    )
  }

  const isPositive = stock.change > 0
  const totalRecommendations =
    stock.recommendations.strongBuy +
    stock.recommendations.buy +
    stock.recommendations.hold +
    stock.recommendations.sell +
    stock.recommendations.strongSell

  return (
    <div className="content">
      <div className="container">
        {/* Stock Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1>
            {stock.name} ({stock.symbol})
          </h1>
          <p>{stock.exchange}</p>
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "24px", fontWeight: "bold", marginRight: "10px" }}>${stock.price.toFixed(2)}</span>
            <span style={{ color: isPositive ? "green" : "red", fontWeight: "bold" }}>
              {isPositive ? "+" : ""}
              {stock.change.toFixed(2)}%
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "#666666", marginTop: "5px" }}>
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={addToPortfolio} className="button" style={{ marginRight: "10px" }}>
            Add to Portfolio
          </button>
          <button onClick={() => router.push("/stocks")} className="button-secondary">
            Search Another Stock
          </button>
        </div>

        {/* Company Summary */}
        <div className="card">
          <h2>Company Summary</h2>
          <p>{stock.summary}</p>
        </div>

        {/* Chart Section */}
        <div className="card">
          <h2>Price Chart</h2>
          <div style={{ height: "300px", marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? "#0000ff" : "#ff0000"} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={isPositive ? "#0000ff" : "#ff0000"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  domain={["dataMin - 10", "dataMax + 10"]}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? "#0000ff" : "#ff0000"}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Info Grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
          {/* Valuation */}
          <div className="card" style={{ flex: "1", minWidth: "300px" }}>
            <h2>Valuation</h2>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>Market Cap</td>
                  <td align="right">{stock.valuation.marketCap}</td>
                </tr>
                <tr>
                  <td>Trailing P/E</td>
                  <td align="right">{stock.valuation.trailingPE}</td>
                </tr>
                <tr>
                  <td>Forward P/E</td>
                  <td align="right">{stock.valuation.forwardPE}</td>
                </tr>
                <tr>
                  <td>PEG Ratio</td>
                  <td align="right">{stock.valuation.pegRatio}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analyst Recommendations */}
          <div className="card" style={{ flex: "1", minWidth: "300px" }}>
            <h2>Analyst Recommendations</h2>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span>Strong Buy</span>
                <span>{stock.recommendations.strongBuy}</span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "#eeeeee" }}>
                <div
                  style={{
                    width: `${(stock.recommendations.strongBuy / totalRecommendations) * 100}%`,
                    height: "10px",
                    backgroundColor: "darkgreen",
                  }}
                ></div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", marginTop: "10px" }}>
                <span>Buy</span>
                <span>{stock.recommendations.buy}</span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "#eeeeee" }}>
                <div
                  style={{
                    width: `${(stock.recommendations.buy / totalRecommendations) * 100}%`,
                    height: "10px",
                    backgroundColor: "green",
                  }}
                ></div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", marginTop: "10px" }}>
                <span>Hold</span>
                <span>{stock.recommendations.hold}</span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "#eeeeee" }}>
                <div
                  style={{
                    width: `${(stock.recommendations.hold / totalRecommendations) * 100}%`,
                    height: "10px",
                    backgroundColor: "yellow",
                  }}
                ></div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", marginTop: "10px" }}>
                <span>Sell</span>
                <span>{stock.recommendations.sell}</span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "#eeeeee" }}>
                <div
                  style={{
                    width: `${(stock.recommendations.sell / totalRecommendations) * 100}%`,
                    height: "10px",
                    backgroundColor: "orange",
                  }}
                ></div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", marginTop: "10px" }}>
                <span>Strong Sell</span>
                <span>{stock.recommendations.strongSell}</span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "#eeeeee" }}>
                <div
                  style={{
                    width: `${(stock.recommendations.strongSell / totalRecommendations) * 100}%`,
                    height: "10px",
                    backgroundColor: "red",
                  }}
                ></div>
              </div>

              <div style={{ textAlign: "center", marginTop: "10px", fontSize: "12px", color: "#666666" }}>
                Based on {totalRecommendations} analyst ratings
              </div>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="card">
          <h2>Recent News</h2>
          {stock.news.map((news) => (
            <div
              key={news.id}
              style={{ borderBottom: "1px solid #eeeeee", paddingBottom: "10px", marginBottom: "10px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline", fontWeight: "bold" }}
                >
                  {news.title}
                </a>
                <span style={{ color: "#666666", fontSize: "12px" }}>{news.date}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <span style={{ color: "#666666" }}>Source: {news.source}</span>
                <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ color: "blue" }}>
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Toast Message */}
      {message && <div className="toast">{message}</div>}
    </div>
  )
}
