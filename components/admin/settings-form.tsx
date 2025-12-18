"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { SiteSettings } from "@prisma/client"
import { toast } from "sonner"

interface SettingsFormProps {
  settings: SiteSettings | null
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    siteName: settings?.siteName || "Name Here",
    logoUrl: settings?.logoUrl || "",
    footerText: settings?.footerText || "© 2026 All Rights Reserved",
    servicesDescription: (settings as any)?.servicesDescription || "Description Here",
    facebookUrl: settings?.facebookUrl || "",
    twitterUrl: settings?.twitterUrl || "",
    instagramUrl: settings?.instagramUrl || "",
    linkedinUrl: settings?.linkedinUrl || "",
  })


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitFormData = new FormData()
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value)
      })

      const response = await fetch("/api/admin/settings", {
        method: "POST",
        body: submitFormData,
      })

      if (response.ok) {
        router.refresh()
        toast.success("Settings updated successfully!")
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update settings")
      }
    } catch (error) {
      toast.error("Failed to update settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Site Name</label>
        <input
          type="text"
          value={formData.siteName}
          onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Logo URL</label>
        <input
          type="text"
          value={formData.logoUrl}
          onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Footer Text</label>
        <input
          type="text"
          value={formData.footerText}
          onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Services Description</label>
        <textarea
          value={formData.servicesDescription}
          onChange={(e) => setFormData({ ...formData, servicesDescription: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
          placeholder="Describe your services here..."
          rows={3}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="font-bold mb-4">Social Links</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Facebook URL</label>
            <input
              type="url"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background mt-1"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Twitter URL</label>
            <input
              type="url"
              value={formData.twitterUrl}
              onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background mt-1"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Instagram URL</label>
            <input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background mt-1"
              placeholder="https://instagram.com/yourprofile"
            />
          </div>
          <div>
            <label className="text-sm font-medium">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background mt-1"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Settings"}
      </button>
    </form>
  )
}
