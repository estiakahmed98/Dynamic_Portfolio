import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentSubmissions } from "@/components/admin/recent-submissions"
import { ContactsList } from "@/components/admin/contacts-list"

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin()

  if (!admin) {
    redirect("/admin/login")
  }

  const [projectsCount, servicesCount, testimonialsCount, contactCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count(),
  ])

  const recentContacts = await prisma.contactSubmission.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader admin={admin} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {admin.name}</p>
        </div>

        <DashboardStats
          projects={projectsCount}
          services={servicesCount}
          testimonials={testimonialsCount}
          contacts={contactCount}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <RecentSubmissions submissions={recentContacts} />
          </div>
          <div className="bg-background rounded-xl shadow-sm p-6">
            <ContactsList />
          </div>
        </div>
      </main>
    </div>
  )
}
