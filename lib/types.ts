export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  volume?: number
  marketCap?: number
  pe?: number
}

export interface NewsItem {
  id: string
  title: string
  source: string
  date: string
  url: string
  summary: string
}

export interface MarketData {
  id: string
  name: string
  value: string
  change: number
}

export interface ChartData {
  date: string
  value: number
}

export interface IndexData {
  sp500: ChartData[]
  nasdaq: ChartData[]
  dowjones: ChartData[]
}

export interface PortfolioHolding {
  symbol: string
  name: string
  shares: number
  purchasePrice: number
  currentPrice: number
}
