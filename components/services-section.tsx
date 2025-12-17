import type { Service } from "@prisma/client"
import { Layout, Monitor, Smartphone, Palette } from "lucide-react"

const iconMap = {
  layout: Layout,
  monitor: Monitor,
  smartphone: Smartphone,
  palette: Palette,
}

interface ServicesSectionProps {
  data: Service[]
}

export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading" style={{color: '#141E30'}}>Services</h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{color: '#666666'}}>
            Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi
            convallis pretium
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Layout
            return (
              <div
                key={service.id}
                className="group p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
                style={{backgroundColor: '#F5F5F5'}}
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{backgroundColor: 'rgba(53, 87, 125, 0.1)'}}>
                  <IconComponent className="w-8 h-8" style={{color: '#35577D'}} />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3" style={{color: '#141E30'}}>{service.title}</h3>
                <p className="leading-relaxed" style={{color: '#666666'}}>{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
