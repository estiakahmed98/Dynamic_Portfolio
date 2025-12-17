import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    await prisma.project.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Project update error:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.project.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Project delete error:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
