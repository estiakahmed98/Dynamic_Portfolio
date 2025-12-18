"use client"

import type { Service } from "@prisma/client"
import { Layout, Monitor, Smartphone, Palette, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const iconMap = {
  layout: Layout,
  monitor: Monitor,
  smartphone: Smartphone,
  palette: Palette,
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, settingsResponse] = await Promise.all([
          fetch("/api/admin/services"),
          fetch("/api/settings")
        ])

        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json()
          setServices(servicesData)
        }

        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json()
          setSettings(settingsData)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="py-20 text-center animate-pulse">Loading amazing services...</div>
  if (services.length === 0) return null

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-3">
              What We Offer
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 leading-tight">
              Our Premium Services
            </h3>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {settings?.servicesDescription || "We provide high-quality digital solutions tailored to your business needs."}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-px w-24 bg-slate-200 mb-4" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Layout
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={service.id}
                className="group relative p-8 bg-white border border-slate-100 rounded-3xl hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(8,112,184,0.07)] transition-all duration-500"
              >
                {/* Icon Container */}
                <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-slate-50 group-hover:bg-blue-600 transition-colors duration-500">
                  {(service as any).imageUrl ? (
                    <img
                      src={(service as any).imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <IconComponent className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors duration-500" />
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <button className="flex items-center text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-all">
                    Learn More 
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </div>

                {/* Subtle Hover Background Element */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <IconComponent className="w-24 h-24" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}