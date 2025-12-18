"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Skill } from "@prisma/client"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface SkillsListProps {
  skills: Skill[]
  aboutId?: string
}

export function SkillsList({ skills, aboutId }: SkillsListProps) {
  const router = useRouter()
  const [showAdd, setShowAdd] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", percentage: 80 })
  const [loading, setLoading] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSkill, aboutId }),
      })

      if (response.ok) {
        setNewSkill({ name: "", percentage: 80 })
        setShowAdd(false)
        router.refresh()
        toast.success("Skill added successfully!")
      }
    } catch (error) {
      toast.error("Failed to add skill")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      await fetch(`/api/admin/skills/${id}`, { method: "DELETE" })
      router.refresh()
      toast.success("Skill deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete skill")
    }
  }

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex-1">
            <p className="font-medium">{skill.name}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${skill.percentage}%` }} />
              </div>
              <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
            </div>
          </div>
          <button onClick={() => handleDelete(skill.id)} className="ml-4 text-red-600 hover:text-red-700">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      {showAdd ? (
        <form onSubmit={handleAdd} className="p-4 bg-muted rounded-lg space-y-4">
          <input
            type="text"
            placeholder="Skill name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
            required
          />
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={newSkill.percentage}
              onChange={(e) => setNewSkill({ ...newSkill, percentage: Number.parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm font-medium w-12">{newSkill.percentage}%</span>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      )}
    </div>
  )
}
