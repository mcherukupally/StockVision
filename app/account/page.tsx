"use client"

import { useState } from "react"
import { User, Mail, Phone, Lock, CreditCard, Bell, LogOut } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account information, security, and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-[#007AFF] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  JD
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-600">Premium Plan</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id ? "bg-blue-50 text-[#007AFF]" : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon size={18} className="mr-3" />
                      {tab.label}
                    </button>
                  )
                })}

                <button className="w-full flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6">
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Profile Information</h2>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input id="firstName" type="text" className="input-field" defaultValue="John" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input id="lastName" type="text" className="input-field" defaultValue="Doe" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="flex">
                        <div className="relative flex-grow">
                          <input
                            id="email"
                            type="email"
                            className="input-field pl-10"
                            defaultValue="john.doe@example.com"
                          />
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="flex">
                        <div className="relative flex-grow">
                          <input id="phone" type="tel" className="input-field pl-10" defaultValue="+1 (555) 123-4567" />
                          <Phone
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="input-field"
                        defaultValue="Passionate investor focused on technology and renewable energy sectors."
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Security Settings</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input id="currentPassword" type="password" className="input-field" placeholder="••••••••" />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input id="newPassword" type="password" className="input-field" placeholder="••••••••" />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input id="confirmPassword" type="password" className="input-field" placeholder="••••••••" />
                        </div>
                        <div className="flex justify-end">
                          <button type="submit" className="btn-primary">
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-600 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <button className="btn-primary">Enable 2FA</button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Sessions</h3>
                      <p className="text-gray-600 mb-4">
                        These are the devices that are currently logged into your account.
                      </p>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Chrome on MacOS</p>
                            <p className="text-sm text-gray-500">Last active: Just now (Current)</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">This Device</button>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Safari on iPhone</p>
                            <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
                          </div>
                          <button className="text-red-500 hover:text-red-600">Log Out</button>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">Firefox on Windows</p>
                            <p className="text-sm text-gray-500">Last active: Yesterday</p>
                          </div>
                          <button className="text-red-500 hover:text-red-600">Log Out</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Billing Information</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-lg">Premium Plan</p>
                            <p className="text-gray-600">$29.99/month</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Active
                          </span>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">Your next billing date is August 15, 2023</p>
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <button className="btn-secondary">Change Plan</button>
                          <button className="text-red-500 hover:text-red-600 font-medium">Cancel Subscription</button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-4">
                        <div className="bg-white p-2 rounded mr-4">
                          <CreditCard className="text-[#007AFF]" size={24} />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2025</p>
                        </div>
                        <div className="ml-auto">
                          <button className="text-[#007AFF] hover:text-[#0055b3] font-medium">Edit</button>
                        </div>
                      </div>
                      <button className="btn-secondary">Add Payment Method</button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Billing History</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-600">Description</th>
                              <th className="text-right py-3 px-4 font-semibold text-gray-600">Amount</th>
                              <th className="text-right py-3 px-4 font-semibold text-gray-600">Status</th>
                              <th className="text-right py-3 px-4 font-semibold text-gray-600">Invoice</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4">Jul 15, 2023</td>
                              <td className="py-4 px-4">Premium Plan - Monthly</td>
                              <td className="py-4 px-4 text-right">$29.99</td>
                              <td className="py-4 px-4 text-right">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Paid
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <a href="#" className="text-[#007AFF] hover:text-[#0055b3]">
                                  Download
                                </a>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4">Jun 15, 2023</td>
                              <td className="py-4 px-4">Premium Plan - Monthly</td>
                              <td className="py-4 px-4 text-right">$29.99</td>
                              <td className="py-4 px-4 text-right">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Paid
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <a href="#" className="text-[#007AFF] hover:text-[#0055b3]">
                                  Download
                                </a>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="py-4 px-4">May 15, 2023</td>
                              <td className="py-4 px-4">Premium Plan - Monthly</td>
                              <td className="py-4 px-4 text-right">$29.99</td>
                              <td className="py-4 px-4 text-right">
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Paid
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                <a href="#" className="text-[#007AFF] hover:text-[#0055b3]">
                                  Download
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Notification Settings</h2>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Stock Alerts</p>
                            <p className="text-sm text-gray-600">
                              Receive alerts when stocks in your watchlist change significantly
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Market News</p>
                            <p className="text-sm text-gray-600">Get updates on important market news and events</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Portfolio Updates</p>
                            <p className="text-sm text-gray-600">Daily summary of your portfolio performance</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Account Activity</p>
                            <p className="text-sm text-gray-600">Security alerts and account updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Price Alerts</p>
                            <p className="text-sm text-gray-600">Notify when stocks reach your target price</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Breaking News</p>
                            <p className="text-sm text-gray-600">Important market-moving news alerts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Earnings Announcements</p>
                            <p className="text-sm text-gray-600">Alerts for upcoming earnings reports</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007AFF]"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
