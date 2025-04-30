"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Redirect to portfolio page after successful login
      router.push("/portfolio")
    }, 1500)
  }

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "0 auto", paddingTop: "50px" }}>
      {registered && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #c3e6cb",
          }}
        >
          <b>Success!</b> Account created successfully! Please log in.
        </div>
      )}

      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Welcome Back</h1>
          <p>Sign in to your StockVision account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Email Address:
              <input
                name="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>
              Password:
              <input
                name="password"
                type="password"
                className="input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div style={{ textAlign: "right", marginBottom: "15px" }}>
            <Link href="/forgot-password" style={{ color: "blue", textDecoration: "underline" }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="button" style={{ width: "100%" }} disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "blue", textDecoration: "underline" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
