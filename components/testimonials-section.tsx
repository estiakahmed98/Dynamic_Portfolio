"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import type { Testimonial } from "@prisma/client"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TestimonialsSectionProps {
  data: Testimonial[]
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Start automatic rotation
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length)
    }, 2000)

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [data.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length)
    // Reset interval when user manually navigates
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length)
      }, 2000)
    }
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length)
    // Reset interval when user manually navigates
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length)
      }, 2000)
    }
  }

  if (data.length === 0) return null

  const currentTestimonial = data[currentIndex]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{color: '#141E30'}}>Testimonials</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{color: '#666666'}}>
            Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi
            convallis pretium
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl p-8 md:p-12" style={{backgroundColor: '#F5F5F5'}}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-32 h-32">
                <Image
                  src={currentTestimonial.imageUrl || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="text-4xl" style={{color: '#35577D'}}>&ldquo;</div>
                <p className="text-lg leading-relaxed" style={{color: '#666666'}}>{currentTestimonial.content}</p>
                <div className="text-4xl text-right" style={{color: '#35577D'}}>&rdquo;</div>
                <div>
                  <p className="font-bold text-lg font-heading" style={{color: '#141E30'}}>{currentTestimonial.name}</p>
                  <p className="text-sm" style={{color: '#666666'}}>{currentTestimonial.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
              style={{backgroundColor: 'transparent'}}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    // Reset interval when user manually navigates
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current)
                      intervalRef.current = setInterval(() => {
                        setCurrentIndex((prev) => (prev + 1) % data.length)
                      }, 2000)
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8" : "w-2"
                  }`}
                  style={{
                    backgroundColor: index === currentIndex ? '#35577D' : '#E0E0E0'
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
              style={{backgroundColor: 'transparent'}}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
