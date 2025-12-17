import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { HeroForm } from "@/components/admin/hero-form"

export default async function HeroPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect("/admin/login")

  const hero = await prisma.hero.findFirst()

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader admin={admin} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold font-heading mb-6">Edit Hero Section</h1>
          <div className="bg-background rounded-xl shadow-sm p-6">
            <HeroForm hero={hero} />
          </div>
        </div>
      </main>
    </div>
  )
}
