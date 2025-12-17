import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const maxOrder = await prisma.project.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    await prisma.project.create({
      data: {
        ...data,
        order: (maxOrder?.order || 0) + 1,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Project create error:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
