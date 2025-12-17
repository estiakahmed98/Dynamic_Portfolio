import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { SettingsForm } from "@/components/admin/settings-form"

export default async function SettingsPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect("/admin/login")

  const settings = await prisma.siteSettings.findFirst()

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader admin={admin} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold font-heading mb-6">Site Settings</h1>
          <div className="bg-background rounded-xl shadow-sm p-6">
            <SettingsForm settings={settings} />
          </div>
        </div>
      </main>
    </div>
  )
}
