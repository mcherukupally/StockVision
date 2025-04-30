"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Mock research data API
const fetchResearchData = async (query) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Default research links
  const defaultLinks = [
    {
      id: 1,
      title: "Federal Reserve Signals Potential Rate Cut in September",
      source: "Financial Times",
      date: "2 hours ago",
      url: "#",
      summary:
        "The Federal Reserve has indicated it may cut interest rates in September, citing improving inflation data and concerns about economic growth.",
    },
    {
      id: 2,
      title: "NVIDIA Surges on AI Chip Demand and Strong Earnings",
      source: "Wall Street Journal",
      date: "4 hours ago",
      url: "#",
      summary:
        "NVIDIA shares jumped after the company reported better-than-expected earnings, driven by continued strong demand for its AI chips.",
    },
    {
      id: 3,
      title: "Oil Prices Drop Amid Global Economic Concerns",
      source: "Bloomberg",
      date: "6 hours ago",
      url: "#",
      summary:
        "Crude oil prices fell sharply today as investors worry about slowing global economic growth and potential decrease in demand.",
    },
    {
      id: 4,
      title: "Tech Sector Leads Market Rally as Inflation Cools",
      source: "CNBC",
      date: "8 hours ago",
      url: "#",
      summary:
        "Technology stocks led a broad market rally after new data showed inflation continuing to moderate, potentially easing pressure on the Fed.",
    },
    {
      id: 5,
      title: "Treasury Yields Fall to Six-Month Low",
      source: "Reuters",
      date: "10 hours ago",
      url: "#",
      summary:
        "U.S. Treasury yields dropped to their lowest level in six months as investors anticipate a shift in Federal Reserve policy.",
    },
  ]

  // If no query, return default links
  if (!query) return defaultLinks

  // Custom research links based on query
  const queryLowerCase = query.toLowerCase()

  // Stock-specific research
  if (queryLowerCase === "aapl" || queryLowerCase.includes("apple")) {
    return [
      {
        id: 1,
        title: "Apple's iPhone 16 Expected to Drive Upgrade Super-Cycle",
        source: "Bloomberg",
        date: "1 hour ago",
        url: "#",
        summary:
          "Analysts predict the upcoming iPhone 16 with enhanced AI capabilities will drive the biggest upgrade cycle in years.",
      },
      {
        id: 2,
        title: "Apple Services Revenue Hits All-Time High",
        source: "CNBC",
        date: "3 hours ago",
        url: "#",
        summary:
          "Apple's services segment continues to grow, reaching a new record of $24.2 billion in quarterly revenue.",
      },
      {
        id: 3,
        title: "Apple's Vision Pro: Early Sales Analysis",
        source: "Wall Street Journal",
        date: "1 day ago",
        url: "#",
        summary:
          "Initial sales data for Apple's Vision Pro headset shows strong early adoption despite the high price point.",
      },
    ]
  }

  if (queryLowerCase === "tsla" || queryLowerCase.includes("tesla")) {
    return [
      {
        id: 1,
        title: "Tesla Ramps Up Production at Berlin Gigafactory",
        source: "Reuters",
        date: "2 hours ago",
        url: "#",
        summary: "Tesla has increased production capacity at its Berlin facility to meet growing European demand.",
      },
      {
        id: 2,
        title: "Tesla's Full Self-Driving Beta Expands to New Markets",
        source: "TechCrunch",
        date: "5 hours ago",
        url: "#",
        summary:
          "Tesla is rolling out its FSD beta software to additional international markets following regulatory approvals.",
      },
      {
        id: 3,
        title: "Analysts Divided on Tesla's Valuation After Recent Rally",
        source: "Barron's",
        date: "1 day ago",
        url: "#",
        summary: "Wall Street analysts remain split on Tesla's stock valuation following its recent price surge.",
      },
    ]
  }

  // Topic-specific research
  if (queryLowerCase.includes("ai") || queryLowerCase.includes("artificial intelligence")) {
    return [
      {
        id: 1,
        title: "AI Spending by Enterprises Expected to Double by 2026",
        source: "Gartner",
        date: "3 hours ago",
        url: "#",
        summary:
          "A new report projects enterprise AI spending will reach $300 billion by 2026, more than double current levels.",
      },
      {
        id: 2,
        title: "Nvidia and AMD Battle for AI Chip Dominance",
        source: "Forbes",
        date: "1 day ago",
        url: "#",
        summary: "The competition between Nvidia and AMD intensifies as both companies release new AI-focused GPUs.",
      },
      {
        id: 3,
        title: "AI Regulation: Global Approaches and Market Impact",
        source: "Financial Times",
        date: "2 days ago",
        url: "#",
        summary:
          "Different regulatory approaches to AI across major economies could create compliance challenges for multinational companies.",
      },
    ]
  }

  if (queryLowerCase.includes("crypto") || queryLowerCase.includes("bitcoin")) {
    return [
      {
        id: 1,
        title: "Bitcoin ETFs See Record Inflows as Institutional Adoption Grows",
        source: "CoinDesk",
        date: "4 hours ago",
        url: "#",
        summary:
          "Spot Bitcoin ETFs recorded their highest weekly inflows since launching, signaling growing institutional interest.",
      },
      {
        id: 2,
        title: "Ethereum's Upcoming Protocol Upgrade: What Investors Need to Know",
        source: "The Block",
        date: "1 day ago",
        url: "#",
        summary: "Ethereum's next major upgrade could significantly impact transaction fees and network performance.",
      },
      {
        id: 3,
        title: "Regulatory Clarity Improves for Crypto Markets in Key Jurisdictions",
        source: "Bloomberg",
        date: "3 days ago",
        url: "#",
        summary:
          "Several major economies have introduced clearer regulatory frameworks for cryptocurrency markets, reducing uncertainty.",
      },
    ]
  }

  // Generic filtered results based on query
  return defaultLinks.filter(
    (item) => item.title.toLowerCase().includes(queryLowerCase) || item.summary.toLowerCase().includes(queryLowerCase),
  )
}

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [researchLinks, setResearchLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load initial data
  useEffect(() => {
    async function loadInitialData() {
      const data = await fetchResearchData("")
      setResearchLinks(data)
      setLoading(false)
    }

    loadInitialData()
  }, [])

  async function handleSearch(e) {
    e.preventDefault()

    setIsSearching(true)

    try {
      const results = await fetchResearchData(searchQuery)
      setResearchLinks(results)
    } catch (error) {
      console.error("Error searching:", error)
      alert("Error searching. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="content">
      <div className="container">
        <h1>Market Research</h1>
        <p>Stay informed with the latest financial news, market trends, and expert analysis</p>

        {/* Search Form */}
        <div className="card">
          <form onSubmit={handleSearch}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Search for news, topics, or companies..."
                className="input"
                style={{ flex: "1" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="button" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>

        {/* Research Results */}
        <div className="card">
          <h2>Latest Financial News</h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
          ) : researchLinks.length > 0 ? (
            <div>
              {researchLinks.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <a
                      href={item.url}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </a>
                    <span style={{ color: "#666" }}>{item.date}</span>
                  </div>
                  <p style={{ marginBottom: "5px" }}>{item.summary}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666" }}>Source: {item.source}</span>
                    <a href={item.url} style={{ color: "blue" }}>
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>No research articles found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  )
}
