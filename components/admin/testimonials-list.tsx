"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Testimonial } from "@prisma/client"
import { Plus, Trash2, Edit } from "lucide-react"
import { toast } from "sonner"

interface TestimonialsListProps {
  testimonials: Testimonial[]
}

export function TestimonialsList({ testimonials }: TestimonialsListProps) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    imageUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        await fetch(`/api/admin/testimonials/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      setFormData({ name: "", role: "", content: "", imageUrl: "" })
      setShowAdd(false)
      setEditingId(null)
      router.refresh()
      toast.success("Testimonial saved successfully!")
    } catch (error) {
      toast.error("Failed to save testimonial")
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      imageUrl: testimonial.imageUrl,
    })
    setEditingId(testimonial.id)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" })
      router.refresh()
      toast.success("Testimonial deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete testimonial")
    }
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="p-4 bg-muted rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full" />
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm">{testimonial.content}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(testimonial)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {showAdd ? (
        <form onSubmit={handleSubmit} className="p-6 bg-muted rounded-lg space-y-4">
          <h3 className="font-bold">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h3>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            required
          />
          <input
            type="text"
            placeholder="Role (e.g., CEO, Designer)"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            required
          />
          <textarea
            placeholder="Testimonial content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            rows={4}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">
              {editingId ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAdd(false)
                setEditingId(null)
                setFormData({ name: "", role: "", content: "", imageUrl: "" })
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
          Add Testimonial
        </button>
      )}
    </div>
  )
}
