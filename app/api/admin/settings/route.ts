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
    const settings = await prisma.siteSettings.findFirst()

    if (settings) {
      await prisma.siteSettings.update({
        where: { id: settings.id },
        data,
      })
    } else {
      await prisma.siteSettings.create({ data })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Settings update error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
