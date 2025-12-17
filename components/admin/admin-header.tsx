"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { Admin } from "@prisma/client"
import { LayoutDashboard, User, Briefcase, FolderOpen, MessageSquare, Settings, LogOut, Home } from "lucide-react"

interface AdminHeaderProps {
  admin: Admin
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/hero", label: "Hero", icon: Home },
    { href: "/admin/about", label: "About", icon: User },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/projects", label: "Projects", icon: FolderOpen },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <header className="border-b sticky top-0 z-50" style={{backgroundColor: '#141E30', borderColor: '#35577D'}}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="text-xl font-bold font-heading" style={{color: '#FFFFFF'}}>
            Admin Panel
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "" : ""
                  }`}
                  style={{
                    backgroundColor: isActive ? '#35577D' : 'transparent',
                    color: '#FFFFFF'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm hover:opacity-80 transition-colors"
              style={{color: '#E0E0E0'}}
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{backgroundColor: 'rgba(255, 107, 107, 0.1)', color: '#FF6B6B'}}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
