import { Briefcase, FolderOpen, MessageSquare, Mail } from "lucide-react"

interface DashboardStatsProps {
  projects: number
  services: number
  testimonials: number
  contacts: number
}

export function DashboardStats({ projects, services, testimonials, contacts }: DashboardStatsProps) {
  const stats = [
    { label: "Projects", value: projects, icon: FolderOpen, color: "bg-blue-500" },
    { label: "Services", value: services, icon: Briefcase, color: "bg-green-500" },
    { label: "Testimonials", value: testimonials, icon: MessageSquare, color: "bg-purple-500" },
    { label: "Contact Submissions", value: contacts, icon: Mail, color: "bg-orange-500" },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-background rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold font-heading mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
