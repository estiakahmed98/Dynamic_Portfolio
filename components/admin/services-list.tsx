"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Service } from "@prisma/client"
import { Plus, Trash2, Edit, Image as ImageIcon } from "lucide-react"

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "layout",
    imageUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        await fetch(`/api/admin/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      setFormData({ title: "", description: "", icon: "layout", imageUrl: "" })
      setShowAdd(false)
      setEditingId(null)
      router.refresh()
    } catch (error) {
      alert("Failed to save service")
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      imageUrl: (service as any).imageUrl || "",
    })
    setEditingId(service.id)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" })
      router.refresh()
    } catch (error) {
      alert("Failed to delete service")
    }
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.id} className="p-4 bg-muted rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                {(service as any).imageUrl && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={(service as any).imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                  <p className="text-xs text-accent mt-2">Icon: {service.icon}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {showAdd ? (
        <form onSubmit={handleSubmit} className="p-6 bg-muted rounded-lg space-y-4">
          <h3 className="font-bold">{editingId ? "Edit Service" : "Add Service"}</h3>
          <input
            type="text"
            placeholder="Service title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            rows={3}
            required
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
          />
          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
          >
            <option value="layout">Layout (UI/UX)</option>
            <option value="monitor">Monitor (Web Design)</option>
            <option value="smartphone">Smartphone (App Design)</option>
            <option value="palette">Palette (Graphic Design)</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
              {editingId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAdd(false)
                setEditingId(null)
                setFormData({ title: "", description: "", icon: "layout", imageUrl: "" })
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      )}
    </div>
  )
}
