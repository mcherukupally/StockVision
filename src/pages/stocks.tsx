// src/pages/stocks.tsx

import { useState } from "react";
import StockPageContent from "../components/StockPageContent";

export default function Stocks() {
  const [symbol, setSymbol] = useState("AAPL");
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setSymbol(input.trim().toUpperCase());
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex justify-center mb-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="w-72 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
          Search
        </button>
      </form>

      {/* Stock Content */}
      <div className="max-w-4xl mx-auto">
        <StockPageContent symbol={symbol} />
      </div>
    </div>
  );
}
