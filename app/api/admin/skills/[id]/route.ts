import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.skill.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Skill delete error:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
