"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Stocks", path: "/stocks" },
    { name: "Research", path: "/research" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Account", path: "/account" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 top-0 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${scrolled || pathname !== "/" ? "text-[#007AFF]" : "text-white"}`}>
              StockVision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`font-medium transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-[#007AFF]"
                    : scrolled || pathname !== "/"
                      ? "text-gray-700 hover:text-[#007AFF]"
                      : "text-white hover:text-gray-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className={`font-medium transition-colors duration-200 ${
                  scrolled || pathname !== "/" ? "text-gray-700 hover:text-[#007AFF]" : "text-white hover:text-gray-200"
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#007AFF] hover:bg-[#0055b3] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none ${scrolled || pathname !== "/" ? "text-gray-700" : "text-white"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white mt-4 py-4 px-2 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 font-medium rounded-md ${
                    pathname === link.path
                      ? "text-[#007AFF] bg-blue-50"
                      : "text-gray-700 hover:text-[#007AFF] hover:bg-blue-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="px-4 py-2 font-medium text-gray-700 hover:text-[#007AFF] hover:bg-blue-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="mx-4 bg-[#007AFF] hover:bg-[#0055b3] text-white font-medium py-2 px-4 rounded-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
