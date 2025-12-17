"use client"

import Link from "next/link"
import Image from "next/image"
import type { SiteSettings } from "@prisma/client"
import { useState, useEffect } from "react"

interface HeaderProps {
  settings: SiteSettings | null
}

export function Header({ settings }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "projects", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur border-b" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#35577D'}}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            {settings?.logoUrl && (
              <Image
                src={settings.logoUrl || "/placeholder.svg"}
                alt={settings.siteName}
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            )}
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold font-heading" style={{color: '#141E30'}}>{settings?.siteName || "Portfolio"}</span>
              <span className="text-xs md:text-sm" style={{color: '#35577D'}}>{(settings as any).subtitle || "Software Engineer"}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#home" 
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === "home" ? "font-bold" : ""
              }`}
              style={{
                color: activeSection === "home" ? '#141E30' : '#666666',
                borderBottom: activeSection === "home" ? '2px solid #141E30' : 'none'
              }}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === "about" ? "font-bold" : ""
              }`}
              style={{
                color: activeSection === "about" ? '#141E30' : '#666666',
                borderBottom: activeSection === "about" ? '2px solid #141E30' : 'none'
              }}
            >
              About Me
            </Link>
            <Link 
              href="#services" 
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === "services" ? "font-bold" : ""
              }`}
              style={{
                color: activeSection === "services" ? '#141E30' : '#666666',
                borderBottom: activeSection === "services" ? '2px solid #141E30' : 'none'
              }}
            >
              Services
            </Link>
            <Link 
              href="#projects" 
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === "projects" ? "font-bold" : ""
              }`}
              style={{
                color: activeSection === "projects" ? '#141E30' : '#666666',
                borderBottom: activeSection === "projects" ? '2px solid #141E30' : 'none'
              }}
            >
              Projects
            </Link>
            <Link 
              href="#testimonials" 
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === "testimonials" ? "font-bold" : ""
              }`}
              style={{
                color: activeSection === "testimonials" ? '#141E30' : '#666666',
                borderBottom: activeSection === "testimonials" ? '2px solid #141E30' : 'none'
              }}
            >
              Testimonials
            </Link>
            <Link 
              href="#contact" 
              className={`text-sm font-medium transition-all duration-300 ${
                activeSection === "contact" ? "font-bold" : ""
              }`}
              style={{
                color: activeSection === "contact" ? '#141E30' : '#666666',
                borderBottom: activeSection === "contact" ? '2px solid #141E30' : 'none'
              }}
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/cv.pdf"
            download
            className="hidden md:inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{backgroundColor: '#141E30', color: '#FFFFFF'}}
          >
            Download CV
          </Link>
        </div>
      </div>
    </header>
  )
}
