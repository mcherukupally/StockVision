import Link from "next/link"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { Stock } from "@/lib/types"

interface StockCardProps {
  stock: Stock
}

export default function StockCard({ stock }: StockCardProps) {
  const isPositive = stock.change > 0

  return (
    <Link href={`/stocks/${stock.symbol}`}>
      <div className="card hover:translate-y-[-4px] cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{stock.symbol}</h3>
            <p className="text-gray-600 text-sm">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">${stock.price.toFixed(2)}</p>
            <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
              <span className="font-medium">
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
