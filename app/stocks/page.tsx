"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function StocksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [marketTrendData, setMarketTrendData] = useState([])
  const router = useRouter()

  // Generate market trend data on component mount
  useEffect(() => {
    const data = []
    const startValue = 4500 + Math.random() * 200
    let currentValue = startValue

    for (let i = 0; i < 30; i++) {
      // Random price movement
      currentValue = currentValue + (Math.random() * 50 - 25)
      if (currentValue < 4000) currentValue = 4000

      data.push({
        day: `Day ${i + 1}`,
        value: currentValue,
      })
    }

    setMarketTrendData(data)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery) {
      setIsLoading(true)
      // Simulate a delay and redirect
      setTimeout(() => {
        router.push(`/stocks/${searchQuery}`)
      }, 500)
    }
  }

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 198.76, change: 3.21 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 415.32, change: 2.98 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 165.93, change: -1.76 },
    { symbol: "AMZN", name: "Amazon.com, Inc.", price: 178.25, change: -2.34 },
    { symbol: "TSLA", name: "Tesla, Inc.", price: 248.42, change: 4.87 },
    { symbol: "META", name: "Meta Platforms, Inc.", price: 472.18, change: -3.42 },
  ]

  return (
    <div className="content">
      <div className="container">
        <h1>Stock Search</h1>
        <p>Search for any stock by its ticker symbol</p>

        {/* Search Bar */}
        <div className="card">
          <form onSubmit={handleSearch}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL, MSFT, TSLA)"
                className="input"
                style={{ flex: "1" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              />
              <button type="submit" className="button" disabled={isLoading || !searchQuery}>
                {isLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>

        {/* Popular Stocks */}
        <div className="card">
          <h2>Popular Stocks</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {popularStocks.map((stock) => (
              <div
                key={stock.symbol}
                style={{
                  border: "1px solid #cccccc",
                  padding: "10px",
                  width: "calc(50% - 15px)",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                }}
                onClick={() => router.push(`/stocks/${stock.symbol}`)}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: "bold" }}>{stock.symbol}</div>
                    <div style={{ color: "#666666" }}>{stock.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "bold" }}>${stock.price.toFixed(2)}</div>
                    <div style={{ color: stock.change > 0 ? "green" : "red" }}>
                      {stock.change > 0 ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends Chart */}
        <div className="card">
          <h2>Market Trends</h2>
          <div style={{ height: "300px", marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0000ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0000ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  domain={["dataMin - 100", "dataMax + 100"]}
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
                  formatter={(value) => [`$${value.toFixed(2)}`, "S&P 500"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0000ff"
                  fillOpacity={1}
                  fill="url(#colorMarket)"
                  strokeWidth={2}
                  name="S&P 500"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "12px", color: "#666666" }}>
            S&P 500 Index - Last 30 Days
          </div>
        </div>
      </div>
    </div>
  )
}
