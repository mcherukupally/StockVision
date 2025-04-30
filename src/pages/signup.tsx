"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle registration here
    console.log("Signup attempt with:", formData);
  };

  // Password strength indicators
  const hasMinLength = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*]/.test(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Join StockVision and start investing smarter
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="input-field pr-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password strength indicators */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs font-medium mb-2">
                    Password strength:
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                        hasMinLength ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {hasMinLength && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span
                      className={
                        hasMinLength ? "text-green-600" : "text-gray-500"
                      }
                    >
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                        hasUpperCase ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {hasUpperCase && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span
                      className={
                        hasUpperCase ? "text-green-600" : "text-gray-500"
                      }
                    >
                      At least one uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                        hasNumber ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {hasNumber && <Check size={12} className="text-white" />}
                    </div>
                    <span
                      className={hasNumber ? "text-green-600" : "text-gray-500"}
                    >
                      At least one number
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                        hasSpecialChar ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {hasSpecialChar && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <span
                      className={
                        hasSpecialChar ? "text-green-600" : "text-gray-500"
                      }
                    >
                      At least one special character
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#007AFF] focus:ring-[#007AFF] border-gray-300 rounded mt-1"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-600"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#007AFF] hover:text-[#0055b3]"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#007AFF] hover:text-[#0055b3]"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#007AFF] hover:bg-[#0055b3] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#007AFF] hover:text-[#0055b3] font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
