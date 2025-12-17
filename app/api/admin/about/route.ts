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
    const about = await prisma.about.findFirst()

    if (about) {
      await prisma.about.update({
        where: { id: about.id },
        data,
      })
    } else {
      await prisma.about.create({ data })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("About update error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
