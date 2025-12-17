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

    const hero = await prisma.hero.findFirst()

    if (hero) {
      await prisma.hero.update({
        where: { id: hero.id },
        data,
      })
    } else {
      await prisma.hero.create({ data })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Hero update error:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
