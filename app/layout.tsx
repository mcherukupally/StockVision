import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "StockVision - Stock Market App",
  description: "Track stocks and manage your portfolio",
  keywords: "stocks, finance, investment, market analysis, financial news",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="content">{children}</div>
      </body>
    </html>
  )
}
