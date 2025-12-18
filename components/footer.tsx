import Link from "next/link"
import Image from "next/image"
import type { SiteSettings } from "@prisma/client"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface FooterProps {
  settings: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="py-12" style={{backgroundColor: '#141E30', color: '#FFFFFF'}}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <Link href="/" className="flex items-center">
            {settings?.logoUrl ? (
              <Image
                src={settings.logoUrl || "/placeholder.svg"}
                alt={settings?.siteName || "Portfolio"}
                width={150}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            ) : (
              <span className="text-2xl font-bold font-heading">{settings?.siteName || "Portfolio"}</span>
            )}
          </Link>

          <nav className="flex flex-wrap justify-center gap-8">
            <Link href="#home" className="text-sm hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
              Home
            </Link>
            <Link href="#about" className="text-sm hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
              About Me
            </Link>
            <Link href="#services" className="text-sm hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
              Services
            </Link>
            <Link href="#projects" className="text-sm hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
              Projects
            </Link>
            <Link href="#testimonials" className="text-sm hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
              Contact
            </Link>
          </nav>

          <div className="flex gap-6">
            {settings?.facebookUrl && (
              <Link href={settings.facebookUrl} className="hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
                <Facebook className="w-5 h-5" />
              </Link>
            )}
            {settings?.twitterUrl && (
              <Link href={settings.twitterUrl} className="hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
                <Twitter className="w-5 h-5" />
              </Link>
            )}
            {settings?.instagramUrl && (
              <Link href={settings.instagramUrl} className="hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
                <Instagram className="w-5 h-5" />
              </Link>
            )}
            {settings?.linkedinUrl && (
              <Link href={settings.linkedinUrl} className="hover:opacity-80 transition-colors" style={{color: '#FFFFFF'}}>
                <Linkedin className="w-5 h-5" />
              </Link>
            )}
          </div>

          <div className="text-center text-sm" style={{color: '#E0E0E0'}}>
            <p>{settings?.footerText || "© 2026 All Rights Reserved"}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
