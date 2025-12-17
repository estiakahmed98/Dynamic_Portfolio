import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { AboutForm } from "@/components/admin/about-form"
import { SkillsList } from "@/components/admin/skills-list"

export default async function AboutPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect("/admin/login")

  const about = await prisma.about.findFirst({
    include: { skills: { orderBy: { order: "asc" } } },
  })

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader admin={admin} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold font-heading mb-6">Edit About Section</h1>

          <div className="space-y-6">
            <div className="bg-background rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">About Content</h2>
              <AboutForm about={about} />
            </div>

            <div className="bg-background rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <SkillsList skills={about?.skills || []} aboutId={about?.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
