// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/stocks">Stocks</Link>
      <Link href="/research">Research</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/account">Account</Link>
    </nav>
  );
}