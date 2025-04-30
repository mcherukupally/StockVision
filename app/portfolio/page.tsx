"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { mockPortfolioPerformance } from "@/lib/mockData"

// Mock portfolio data
const initialHoldings = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    purchasePrice: 175.32,
    currentPrice: 198.76,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 15,
    purchasePrice: 380.45,
    currentPrice: 415.32,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 10,
    purchasePrice: 750.2,
    currentPrice: 845.27,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    shares: 20,
    purchasePrice: 185.67,
    currentPrice: 178.25,
  },
]

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState(initialHoldings)
  const [loading, setLoading] = useState(true)
  const [showAddStockModal, setShowAddStockModal] = useState(false)
  const [newStock, setNewStock] = useState({
    symbol: "",
    shares: 0,
    purchasePrice: 0,
  })
  const [message, setMessage] = useState("")
  const [performanceData, setPerformanceData] = useState([])

  // Load initial data
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPerformanceData(mockPortfolioPerformance)
      setLoading(false)
    }, 1000)
  }, [])

  // Calculate portfolio value
  let portfolioValue = 0
  let portfolioCost = 0

  for (let i = 0; i < holdings.length; i++) {
    portfolioValue += holdings[i].currentPrice * holdings[i].shares
    portfolioCost += holdings[i].purchasePrice * holdings[i].shares
  }

  const portfolioGain = portfolioValue - portfolioCost
  const portfolioGainPercent = portfolioCost > 0 ? (portfolioGain / portfolioCost) * 100 : 0
  const isPositive = portfolioGain > 0

  // Handle adding a stock
  function handleAddStock(e) {
    e.preventDefault()

    if (!newStock.symbol || newStock.shares <= 0 || newStock.purchasePrice <= 0) {
      setMessage("Please enter valid values")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    // Add new stock
    const newHolding = {
      symbol: newStock.symbol,
      name: `${newStock.symbol} Corporation`,
      shares: newStock.shares,
      purchasePrice: newStock.purchasePrice,
      currentPrice: newStock.purchasePrice * (1 + (Math.random() * 0.2 - 0.1)), // Random price ±10%
    }

    setHoldings([...holdings, newHolding])
    setShowAddStockModal(false)
    setNewStock({ symbol: "", shares: 0, purchasePrice: 0 })
    setMessage(`${newStock.symbol} added to portfolio!`)
    setTimeout(() => setMessage(""), 3000)
  }

  // Handle removing a stock
  function handleRemoveStock(symbol) {
    const updatedHoldings = []
    for (let i = 0; i < holdings.length; i++) {
      if (holdings[i].symbol !== symbol) {
        updatedHoldings.push(holdings[i])
      }
    }
    setHoldings(updatedHoldings)
    setMessage(`${symbol} removed from portfolio!`)
    setTimeout(() => setMessage(""), 3000)
  }

  if (loading) {
    return (
      <div className="content">
        <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
      </div>
    )
  }

  return (
    <div className="content">
      <div className="container">
        <h1>My Portfolio</h1>
        <p>Track your investments and monitor performance</p>

        {/* Portfolio Summary */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
          <div className="card" style={{ flex: "1", minWidth: "200px" }}>
            <h2>Total Value</h2>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>${portfolioValue.toFixed(2)}</div>
          </div>

          <div className="card" style={{ flex: "1", minWidth: "200px" }}>
            <h2>Total Gain/Loss</h2>
            <div
              style={{
                fontSize: "20px",
                fontWeight: isPositive ? "bold" : "bold",
                color: isPositive ? "green" : "red",
              }}
            >
              ${Math.abs(portfolioGain).toFixed(2)}
              {isPositive ? " (+" : " (-"}
              {Math.abs(portfolioGainPercent).toFixed(2)}%)
            </div>
          </div>

          <div className="card" style={{ flex: "1", minWidth: "200px" }}>
            <h2>Number of Holdings</h2>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>{holdings.length}</div>
          </div>
        </div>

        {/* Portfolio Chart */}
        <div className="card">
          <h2>Portfolio Performance</h2>
          <div style={{ height: "300px", marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0000ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0000ff" stopOpacity={0} />
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
                  dataKey="value"
                  stroke="#0000ff"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <h2>Holdings</h2>
            <div>
              <Link href="/stocks">
                <button className="button-secondary" style={{ marginRight: "10px" }}>
                  Search Stocks
                </button>
              </Link>
              <button className="button" onClick={() => setShowAddStockModal(true)}>
                Add Position
              </button>
            </div>
          </div>

          {holdings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <p>You don't have any stocks in your portfolio yet.</p>
              <button className="button" onClick={() => setShowAddStockModal(true)} style={{ marginTop: "10px" }}>
                Add Your First Stock
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Shares</th>
                    <th>Avg. Cost</th>
                    <th>Current Price</th>
                    <th>Market Value</th>
                    <th>Gain/Loss</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => {
                    const marketValue = holding.currentPrice * holding.shares
                    const costBasis = holding.purchasePrice * holding.shares
                    const gain = marketValue - costBasis
                    const gainPercent = (gain / costBasis) * 100
                    const isPositive = gain > 0

                    return (
                      <tr key={holding.symbol}>
                        <td>
                          <a href={`/stocks/${holding.symbol}`} style={{ color: "blue", textDecoration: "underline" }}>
                            {holding.symbol}
                          </a>
                        </td>
                        <td>{holding.name}</td>
                        <td align="right">{holding.shares}</td>
                        <td align="right">${holding.purchasePrice.toFixed(2)}</td>
                        <td align="right">${holding.currentPrice.toFixed(2)}</td>
                        <td align="right">${marketValue.toFixed(2)}</td>
                        <td align="right" className={isPositive ? "positive" : "negative"}>
                          {isPositive ? "+" : "-"}${Math.abs(gain).toFixed(2)} ({Math.abs(gainPercent).toFixed(2)}%)
                        </td>
                        <td align="center">
                          <button
                            onClick={() => handleRemoveStock(holding.symbol)}
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Stock Modal - Simplified */}
      {showAddStockModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Stock to Portfolio</h2>
            <form onSubmit={handleAddStock}>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  Stock Symbol:
                  <input
                    type="text"
                    className="input"
                    placeholder="e.g., AAPL"
                    value={newStock.symbol}
                    onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                    required
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  Number of Shares:
                  <input
                    type="number"
                    className="input"
                    placeholder="e.g., 10"
                    value={newStock.shares || ""}
                    onChange={(e) => setNewStock({ ...newStock, shares: Number.parseFloat(e.target.value) })}
                    required
                  />
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  Purchase Price per Share ($):
                  <input
                    type="number"
                    className="input"
                    placeholder="e.g., 150.00"
                    value={newStock.purchasePrice || ""}
                    onChange={(e) => setNewStock({ ...newStock, purchasePrice: Number.parseFloat(e.target.value) })}
                    required
                  />
                </label>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setShowAddStockModal(false)}
                  style={{
                    backgroundColor: "#cccccc",
                    color: "black",
                    border: "none",
                    padding: "8px 15px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="button">
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Toast Message */}
      {message && <div className="toast">{message}</div>}
    </div>
  )
}
