import Image from "next/image"
import type { About, Skill } from "@prisma/client"

interface AboutSectionProps {
  data: About & { skills: Skill[] }
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-20" style={{backgroundColor: '#141E30'}}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-md mx-auto">
            <div className="relative w-full aspect-square rounded-full overflow-hidden border-8 border-background shadow-2xl">
              <Image src={data.imageUrl || "/placeholder.svg"} alt="About Me" fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{color: '#FFFFFF'}}>{data.title}</h2>
              <p className="text-lg leading-relaxed" style={{color: '#E0E0E0'}}>{data.description}</p>
            </div>

            <div className="space-y-6">
              {data.skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold" style={{color: '#FFFFFF'}}>{skill.name}</span>
                  </div>
                  <div className="relative h-3 rounded-full overflow-hidden" style={{backgroundColor: '#35577D'}}>
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.percentage}%`, backgroundColor: '#35577D' }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 shadow-md transition-all duration-500"
                      style={{ left: `calc(${skill.percentage}% - 12px)`, backgroundColor: '#FFFFFF', borderColor: '#141E30' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
