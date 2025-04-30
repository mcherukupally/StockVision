import type { Stock, NewsItem, MarketData, ChartData, IndexData, PortfolioHolding } from "./types"

// Mock data for top winners
export const mockWinners: Stock[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 845.27, change: 5.23 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 248.42, change: 4.87 },
  { symbol: "AAPL", name: "Apple Inc.", price: 198.76, change: 3.21 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 415.32, change: 2.98 },
]

// Mock data for top losers
export const mockLosers: Stock[] = [
  { symbol: "META", name: "Meta Platforms, Inc.", price: 472.18, change: -3.42 },
  { symbol: "NFLX", name: "Netflix, Inc.", price: 632.77, change: -2.87 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 178.25, change: -2.34 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 165.93, change: -1.76 },
]

// Mock data for market overview
export const mockMarketData: MarketData[] = [
  { id: "vol", name: "Volume", value: "12.5B", change: 3.2 },
  { id: "adv", name: "Advancers", value: "2,345", change: 5.7 },
  { id: "dec", name: "Decliners", value: "1,876", change: -4.3 },
  { id: "vix", name: "VIX", value: "18.45", change: -2.1 },
]

// Generate mock chart data
export const generateChartData = (days: number, startValue: number, volatility: number): ChartData[] => {
  const data: ChartData[] = []
  let currentValue = startValue

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Add some random movement
    const change = (Math.random() - 0.5) * volatility
    currentValue = Math.max(currentValue + change, 0)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Number.parseFloat(currentValue.toFixed(2)),
    })
  }

  return data
}

// Mock data for index charts
export const mockIndexData: IndexData = {
  sp500: generateChartData(30, 4800, 50),
  nasdaq: generateChartData(30, 16800, 150),
  dowjones: generateChartData(30, 38500, 200),
}

// Mock data for news
export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Federal Reserve Signals Potential Rate Cut in September",
    source: "Financial Times",
    date: "2 hours ago",
    url: "#",
    summary:
      "The Federal Reserve has indicated it may cut interest rates in September, citing improving inflation data and concerns about economic growth.",
  },
  {
    id: "2",
    title: "NVIDIA Surges on AI Chip Demand and Strong Earnings",
    source: "Wall Street Journal",
    date: "4 hours ago",
    url: "#",
    summary:
      "NVIDIA shares jumped after the company reported better-than-expected earnings, driven by continued strong demand for its AI chips.",
  },
  {
    id: "3",
    title: "Oil Prices Drop Amid Global Economic Concerns",
    source: "Bloomberg",
    date: "6 hours ago",
    url: "#",
    summary:
      "Crude oil prices fell sharply today as investors worry about slowing global economic growth and potential decrease in demand.",
  },
  {
    id: "4",
    title: "Tech Sector Leads Market Rally as Inflation Cools",
    source: "CNBC",
    date: "8 hours ago",
    url: "#",
    summary:
      "Technology stocks led a broad market rally after new data showed inflation continuing to moderate, potentially easing pressure on the Fed.",
  },
  {
    id: "5",
    title: "Treasury Yields Fall to Six-Month Low",
    source: "Reuters",
    date: "10 hours ago",
    url: "#",
    summary:
      "U.S. Treasury yields dropped to their lowest level in six months as investors anticipate a shift in Federal Reserve policy.",
  },
]

// Mock data for stock details
export const mockStockDetails: Record<string, Stock> = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 198.76,
    change: 3.21,
    volume: 58432156,
    marketCap: 3120000000000,
    pe: 32.5,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 415.32,
    change: 2.98,
    volume: 25678943,
    marketCap: 3090000000000,
    pe: 36.2,
  },
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 845.27,
    change: 5.23,
    volume: 42567890,
    marketCap: 2080000000000,
    pe: 75.3,
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.42,
    change: 4.87,
    volume: 35678912,
    marketCap: 790000000000,
    pe: 68.7,
  },
  AMZN: {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.25,
    change: -2.34,
    volume: 32456789,
    marketCap: 1850000000000,
    pe: 42.8,
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 165.93,
    change: -1.76,
    volume: 18765432,
    marketCap: 2090000000000,
    pe: 25.1,
  },
  META: {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 472.18,
    change: -3.42,
    volume: 21345678,
    marketCap: 1210000000000,
    pe: 31.4,
  },
  NFLX: {
    symbol: "NFLX",
    name: "Netflix, Inc.",
    price: 632.77,
    change: -2.87,
    volume: 12345678,
    marketCap: 280000000000,
    pe: 43.6,
  },
}

// Mock data for portfolio
export const mockPortfolio: PortfolioHolding[] = [
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

// Generate mock portfolio performance data
export const mockPortfolioPerformance = generateChartData(90, 100000, 2000)
