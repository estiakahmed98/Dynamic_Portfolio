"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Project } from "@prisma/client"
import { Plus, Trash2, Edit } from "lucide-react"
import Image from "next/image"

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Design",
    imageUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        await fetch(`/api/admin/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      setFormData({ title: "", description: "", category: "Web Design", imageUrl: "" })
      setShowAdd(false)
      setEditingId(null)
      router.refresh()
    } catch (error) {
      alert("Failed to save project")
    }
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description || "",
      category: project.category,
      imageUrl: project.imageUrl,
    })
    setEditingId(project.id)
    setShowAdd(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
      router.refresh()
    } catch (error) {
      alert("Failed to delete project")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-muted rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image src={project.imageUrl || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <span className="text-xs text-accent font-medium">{project.category}</span>
              <h3 className="font-bold mt-1">{project.title}</h3>
              {project.description && <p className="text-sm text-muted-foreground mt-1">{project.description}</p>}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd ? (
        <form onSubmit={handleSubmit} className="p-6 bg-muted rounded-lg space-y-4">
          <h3 className="font-bold">{editingId ? "Edit Project" : "Add Project"}</h3>
          <input
            type="text"
            placeholder="Project title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border bg-background"
          >
            <option>Web Design</option>
            <option>UI/UX</option>
            <option>App Design</option>
            <option>Graphic Design</option>
          </select>
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
                setFormData({ title: "", description: "", category: "Web Design", imageUrl: "" })
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
          Add Project
        </button>
      )}
    </div>
  )
}
