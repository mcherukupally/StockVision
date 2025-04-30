"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
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
      // Redirect to login page after successful signup
      router.push("/login?registered=true")
    }, 1500)
  }

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "0 auto", paddingTop: "50px" }}>
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Create Account</h1>
          <p>Join StockVision and start investing smarter</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Full Name:
              <input
                name="name"
                type="text"
                className="input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>

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

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "flex", alignItems: "flex-start" }}>
              <input type="checkbox" required style={{ marginRight: "10px", marginTop: "3px" }} />
              <span>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "blue", textDecoration: "underline" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" style={{ color: "blue", textDecoration: "underline" }}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="button" style={{ width: "100%" }} disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "blue", textDecoration: "underline" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
