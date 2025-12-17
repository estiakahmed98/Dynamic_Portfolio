import { prisma } from "@/lib/prisma"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [hero, about, services, projects, testimonials, settings] = await Promise.all([
    prisma.hero.findFirst(),
    prisma.about.findFirst({ include: { skills: { orderBy: { order: "asc" } } } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.siteSettings.findFirst(),
  ])

  return (
    <div className="min-h-screen">
      <Header settings={settings} />
      <main>
        {hero && <HeroSection data={hero} />}
        {about && <AboutSection data={about} />}
        {services.length > 0 && <ServicesSection data={services} />}
        {projects.length > 0 && <ProjectsSection data={projects} />}
        {testimonials.length > 0 && <TestimonialsSection data={testimonials} />}
        <ContactSection />
      </main>
      <Footer settings={settings} />
    </div>
  )
}
