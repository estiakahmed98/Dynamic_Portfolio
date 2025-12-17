"use client"

import { useState } from "react"
import Image from "next/image"
import type { Project } from "@prisma/client"

interface ProjectsSectionProps {
  data: Project[]
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All")

  const categories = ["All", ...Array.from(new Set(data.map((p) => p.category)))]

  const filteredProjects = activeFilter === "All" ? data : data.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-20" style={{backgroundColor: '#F5F5F5'}}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{color: '#141E30'}}>My Projects</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{color: '#666666'}}>
            Lorem ipsum dolor sit amet consectetur. Mollis erat duis aliquam mauris est risus lectus. Phasellus
            consequat urna tellus
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
                activeFilter === category ? "shadow-lg scale-105" : "hover:scale-105"
              }`}
              style={{
                backgroundColor: activeFilter === category ? '#35577D' : '#FFFFFF',
                color: activeFilter === category ? '#FFFFFF' : '#141E30',
                border: activeFilter === category ? 'none' : `2px solid #35577D`
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{backgroundColor: '#FFFFFF', border: '1px solid rgba(53, 87, 125, 0.1)'}}
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{color: '#35577D', backgroundColor: 'rgba(53, 87, 125, 0.1)'}}>{project.category}</span>
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#35577D'}} />
                </div>
                <h3 className="text-xl font-bold font-heading" style={{color: '#141E30'}}>{project.title}</h3>
                {project.description && <p className="leading-relaxed" style={{color: '#666666'}}>{project.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
