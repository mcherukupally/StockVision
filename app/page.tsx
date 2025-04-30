"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { mockWinners, mockLosers } from "@/lib/mockData"
import StockCard from "@/components/StockCard"
import MarketOverview from "@/components/MarketOverview"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery) {
      window.location.href = `/stocks/${searchQuery}`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#0000ff",
          color: "white",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <div className="container mx-auto">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>StockVision</h1>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>Where Data Meets Destiny</p>
            <p style={{ marginBottom: "20px" }}>
              AI-powered insights to transform your investment strategy with real-time analysis and predictive
              forecasting.
            </p>
            <form onSubmit={handleSearch} style={{ maxWidth: "500px", margin: "0 auto" }}>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  placeholder="Search for a stock symbol (e.g., AAPL)"
                  className="input"
                  style={{ flex: "1", marginRight: "10px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="button">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-center mb-12">Market Overview</h2>
          <MarketOverview />
        </div>
      </section>

      {/* Top Movers Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Winners */}
            <div>
              <div className="flex items-center mb-6">
                <TrendingUp className="text-green-500 mr-2" size={24} />
                <h2 className="text-2xl font-bold">Today's Top Winners</h2>
              </div>
              <div className="space-y-4">
                {mockWinners.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
              <div className="mt-6 text-right">
                <Link
                  href="/research"
                  className="inline-flex items-center text-[#007AFF] hover:text-[#0055b3] font-medium"
                >
                  View all winners <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Losers */}
            <div>
              <div className="flex items-center mb-6">
                <TrendingDown className="text-red-500 mr-2" size={24} />
                <h2 className="text-2xl font-bold">Today's Top Losers</h2>
              </div>
              <div className="space-y-4">
                {mockLosers.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
              <div className="mt-6 text-right">
                <Link
                  href="/research"
                  className="inline-flex items-center text-[#007AFF] hover:text-[#0055b3] font-medium"
                >
                  View all losers <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "15px", color: "#0000ff" }}>What is StockVision?</h2>
            <p style={{ marginBottom: "15px" }}>
              StockVision is an AI-powered platform that analyzes real-time financial news, market sentiment, earnings
              reports, and historical stock data to generate actionable insights and trend forecasts for investors.
            </p>
            <p style={{ marginBottom: "15px" }}>
              Our advanced algorithms process vast amounts of market data to identify patterns and predict trends before
              they become obvious to the average investor.
            </p>
            <div style={{ textAlign: "center" }}>
              <Link href="/research">
                <button className="button">Explore Our Research</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#0000ff", color: "white" }}>
        <div className="container mx-auto max-w-6xl text-center">
          <h2 style={{ marginBottom: "10px", fontSize: "24px" }}>Ready to Transform Your Investment Strategy?</h2>
          <p style={{ marginBottom: "20px" }}>
            Join thousands of investors who are already leveraging StockVision's AI-powered insights to make smarter
            investment decisions.
          </p>
          <div>
            <Link href="/signup">
              <button
                style={{
                  backgroundColor: "white",
                  color: "#0000ff",
                  border: "none",
                  padding: "10px 20px",
                  marginRight: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Get Started Free
              </button>
            </Link>
            <Link href="/research">
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid white",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Explore Features
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
