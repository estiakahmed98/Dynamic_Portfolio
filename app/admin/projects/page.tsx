import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProjectsList } from "@/components/admin/projects-list"

export default async function ProjectsPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect("/admin/login")

  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader admin={admin} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl">
          <h1 className="text-3xl font-bold font-heading mb-6">Manage Projects</h1>
          <div className="bg-background rounded-xl shadow-sm p-6">
            <ProjectsList projects={projects} />
          </div>
        </div>
      </main>
    </div>
  )
}
