import Image from "next/image"
import Link from "next/link"
import type { Hero } from "@prisma/client"
import { Facebook, Instagram, Linkedin } from "lucide-react"

interface HeroSectionProps {
  data: Hero
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="home" className="container mx-auto px-4 py-20 md:py-32">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        {/* Mobile: Image on top */}
        <div className="lg:hidden mb-12">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Green background box */}
            <div className="absolute top-8 right-0 w-[85%] h-[85%] rounded-3xl" style={{backgroundColor: '#35577D'}} />

            {/* Black border frame */}
            <div className="absolute top-0 left-0 w-[85%] h-[85%] border-8 rounded-3xl overflow-hidden" style={{borderColor: '#141E30'}}>
              <Image
                src={data.imageUrl || "/placeholder.svg"}
                alt="Portfolio Hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Mobile social links */}
          <div className="flex justify-center gap-4 mt-6">
            <Link href="https://facebook.com" className="p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 group" style={{color: '#141E30'}}>
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="https://instagram.com" className="p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 group" style={{color: '#141E30'}}>
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="https://linkedin.com" className="p-3 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 group" style={{color: '#141E30'}}>
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-6">
          <span className="inline-block px-4 py-1 rounded-full border-2 text-sm font-medium"
            style={{borderColor: '#35577D', color: '#35577D'}}>
            {data.welcome}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight" style={{color: '#141E30'}}>
            {data.title.split("Creative Design").map((part, i) => (
              <span key={i}>
                {part}
              </span>
            ))}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-heading" style={{color: '#35577D'}}>{data.subtitle}</h2>

          <p className="text-lg leading-relaxed max-w-xl" style={{color: '#666666'}}>{data.description}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-medium hover:opacity-90 transition-colors"
              style={{backgroundColor: '#141E30', color: '#FFFFFF'}}
            >
              Contact Me
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg border-2 px-8 py-3 text-base font-medium transition-colors group"
              style={{borderColor: '#35577D', color: '#35577D'}}
            >
              View Portfolio
              <svg
                className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Desktop: Image on right */}
        <div className="hidden lg:block relative">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Green background box */}
            <div className="absolute top-8 right-0 w-[85%] h-[85%] rounded-3xl" style={{backgroundColor: '#35577D'}} />

            {/* Black border frame */}
            <div className="absolute top-0 left-0 w-[85%] h-[85%] border-8 rounded-3xl overflow-hidden" style={{borderColor: '#141E30'}}>
              <Image
                src={data.imageUrl || "/placeholder.svg"}
                alt="Portfolio Hero"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Social links sidebar */}
            <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-4 bg-white shadow-xl rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-bold text-gray-600 mb-2">Follow</span>
              <div className="flex flex-col gap-3">
                <Link href="https://facebook.com" className="p-2 rounded-lg hover:bg-blue-50 transition-all duration-300 group" style={{color: '#141E30'}}>
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
                <Link href="https://instagram.com" className="p-2 rounded-lg hover:bg-pink-50 transition-all duration-300 group" style={{color: '#141E30'}}>
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
                <Link href="https://linkedin.com" className="p-2 rounded-lg hover:bg-blue-50 transition-all duration-300 group" style={{color: '#141E30'}}>
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
