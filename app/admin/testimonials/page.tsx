import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminHeader } from "@/components/admin/admin-header"
import { TestimonialsList } from "@/components/admin/testimonials-list"

export default async function TestimonialsPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect("/admin/login")

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader admin={admin} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold font-heading mb-6">Manage Testimonials</h1>
          <div className="bg-background rounded-xl shadow-sm p-6">
            <TestimonialsList testimonials={testimonials} />
          </div>
        </div>
      </main>
    </div>
  )
}
