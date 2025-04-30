// src/pages/portfolio.tsx

import React from "react";

import { Headset, User, LogOut } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const portfolioData = [
  { date: "Jan", value: 4000 },
  { date: "Feb", value: 4500 },
  { date: "Mar", value: 5000 },
  { date: "Apr", value: 4800 },
  { date: "May", value: 5200 },
  { date: "Jun", value: 6000 },
  { date: "Jul", value: 5800 },
  { date: "Aug", value: 6500 },
];

const marketData = [
  { label: "DJIA", value: "42,149.18", change: "+159.22 (+0.38%)" },
  { label: "NASDAQ", value: "17,533.90", change: "+84.01 (+0.48%)" },
  { label: "S&P 500", value: "5,655.07", change: "+22.00 (+0.39%)" },
  { label: "Russell 2000", value: "2,028.80", change: "+16.56 (+0.84%)" },
];

const positions = [
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    qty: "1.0046",
    price: "$144.70",
    priceChange: "-$2.05",
    marketValue: "$145.37",
    dayChange: "-$2.06",
    costBasis: "$159.57",
    gainLoss: "-$13.90",
    pct: "2.73%",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    qty: "1.0075",
    price: "$335.44",
    priceChange: "-$2.42",
    marketValue: "$358.11",
    dayChange: "-$2.44",
    costBasis: "$427.44",
    gainLoss: "-$69.33",
    pct: "6.73%",
  },
  {
    symbol: "NVDA",
    name: "Nvidia Corp",
    qty: "50.0083",
    price: "$96.30",
    priceChange: "-$1.34",
    marketValue: "$4,815.80",
    dayChange: "-$67.01",
    costBasis: "$7,031.00",
    gainLoss: "-$2,215.20",
    pct: "90.53%",
  },
];

export default function Portfolio() {
  const btnStyle = {
    padding: "4px 8px",
    borderRadius: "999px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    fontSize: "0.75rem",
    cursor: "pointer",
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Main Section */}
        <main className="flex-1 p-6">
          <h2 className="text-blue-600 text-2xl font-bold mb-4">
            Total Portfolio
          </h2>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(val: any) => `$${val}`} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#007AFF"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <h2 className="text-blue-600 text-2xl font-bold mb-4">Positions</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Symbol / Name</th>
                <th className="text-left py-2">Qty</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Change</th>
                <th className="text-left py-2">Market Value</th>
                <th className="text-left py-2">Day Change</th>
                <th className="text-left py-2">Cost Basis</th>
                <th className="text-left py-2">Gain/Loss</th>
                <th className="text-left py-2">% Holding</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">
                    <div>{p.symbol}</div>
                    <div className="text-gray-500 text-xs">{p.name}</div>
                  </td>
                  <td>{p.qty}</td>
                  <td>{p.price}</td>
                  <td
                    className={
                      p.priceChange.startsWith("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {p.priceChange}
                  </td>
                  <td>{p.marketValue}</td>
                  <td
                    className={
                      p.dayChange.startsWith("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {p.dayChange}
                  </td>
                  <td>{p.costBasis}</td>
                  <td
                    className={
                      p.gainLoss.startsWith("-")
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {p.gainLoss}
                  </td>
                  <td>{p.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Sidebar */}
        <aside className="w-72 border-l p-6">
          <h2 className="text-blue-600 text-xl font-bold mb-4">Market</h2>
          <div className="space-y-4">
            {marketData.map((m) => (
              <div key={m.label}>
                <div className="font-semibold">{m.label}</div>
                <div className="text-gray-600 text-sm">{m.value}</div>
                <div className="text-green-600 text-xs">{m.change}</div>
                <hr className="my-2" />
              </div>
            ))}
            <div className="text-center">
              <a href="#" className="text-blue-600">
                Go to Market
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
