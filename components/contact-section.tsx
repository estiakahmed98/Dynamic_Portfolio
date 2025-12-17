"use client"

import type React from "react"

import { useState } from "react"

export function ContactSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage("Thank you! I'll get back to you soon.")
        setEmail("")
      } else {
        setMessage("Something went wrong. Please try again.")
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20" style={{backgroundColor: '#35577D'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{color: '#FFFFFF'}}>Lets Design Together</h2>
            <p className="text-lg leading-relaxed" style={{color: '#E0E0E0'}}>
              Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi
              convallis pretium
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              className="flex-1 px-6 py-4 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{backgroundColor: '#FFFFFF', borderColor: '#141E30', color: '#141E30'}}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50"
              style={{backgroundColor: '#141E30', color: '#FFFFFF'}}
            >
              {loading ? "Sending..." : "Contact Me"}
            </button>
          </form>

          {message && (
            <p className={`text-sm ${message.includes("Thank") ? "" : "text-red-500"}`} style={{color: message.includes("Thank") ? '#FFFFFF' : '#FF6B6B'}}>{message}</p>
          )}
        </div>
      </div>
    </section>
  )
}
