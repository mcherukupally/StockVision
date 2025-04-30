"use client"

import { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { mockMarketData, mockIndexData } from "@/lib/mockData"

export default function MarketOverview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartData, setChartData] = useState(mockIndexData.sp500)

  const indexes = [
    { id: "sp500", name: "S&P 500" },
    { id: "nasdaq", name: "NASDAQ" },
    { id: "dowjones", name: "Dow Jones" },
  ]

  useEffect(() => {
    setChartData(mockIndexData[indexes[activeIndex].id as keyof typeof mockIndexData])
  }, [activeIndex])

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-xl font-bold mb-4 md:mb-0">Market Overview</h3>
        <div className="flex space-x-2">
          {indexes.map((index, idx) => (
            <button
              key={index.id}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeIndex === idx ? "bg-[#007AFF] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              {index.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007AFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
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
              stroke="#007AFF"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {mockMarketData.map((item) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{item.name}</p>
            <p className="font-bold text-lg">{item.value}</p>
            <div className={`flex items-center text-sm ${item.change > 0 ? "text-green-500" : "text-red-500"}`}>
              {item.change > 0 ? "+" : ""}
              {item.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
