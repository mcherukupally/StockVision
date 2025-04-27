// src/pages/login/Login.jsx
import React from 'react';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-blue-600 text-white p-4">
        <span className="text-lg font-bold">STOCKVISION</span>
        <div className="text-2xl">📈</div>
      </header>
      <div className="flex flex-col items-center justify-center flex-1 p-8 m-4 bg-white border-2 border-black rounded-lg">
        <h1 className="text-2xl text-blue-600 mb-8">StockVision</h1>
        <input type="text" placeholder="Login ID" className="p-3 text-base border rounded mb-4 w-full max-w-md" />
        <input type="password" placeholder="Password" className="p-3 text-base border rounded mb-4 w-full max-w-md" />
        <button className="p-3 w-full max-w-md bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Log In
        </button>
      </div>
    </div>
  );
}
