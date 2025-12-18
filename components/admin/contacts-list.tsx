"use client"

import { useState, useEffect } from "react"
import type { ContactSubmission } from "@prisma/client"
import { toast } from "sonner"

export function ContactsList() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts")
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) {
      return
    }

    setDeleting(id)
    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== id))
        toast.success("Contact deleted successfully!")
      } else {
        toast.error("Failed to delete contact")
      }
    } catch (error) {
      toast.error("Failed to delete contact")
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading contacts...</div>
      </div>
    )
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">No contact submissions yet</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Contact Submissions</h3>
        <div className="text-sm text-muted-foreground">
          {contacts.length} {contacts.length === 1 ? "submission" : "submissions"}
        </div>
      </div>

      <div className="border rounded-lg divide-y">
        {contacts.map((contact) => (
          <div key={contact.id} className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium">{contact.email}</div>
              <div className="text-sm text-muted-foreground">
                Submitted: {new Date(contact.createdAt).toLocaleDateString()} at{" "}
                {new Date(contact.createdAt).toLocaleTimeString()}
              </div>
            </div>
            <button
              onClick={() => handleDelete(contact.id)}
              disabled={deleting === contact.id}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {deleting === contact.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
