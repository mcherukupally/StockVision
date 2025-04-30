// src/components/Navbar.tsx
import Link from "next/link";
import "./Navbar.css"; // Ensure this CSS file exists

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link href="/">StockVision</Link>
        </div>
        <div className="navbar-links">
          <Link href="/login">Login</Link>
          <Link href="/stocks">Stocks</Link>
          <Link href="/research">Research</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}
