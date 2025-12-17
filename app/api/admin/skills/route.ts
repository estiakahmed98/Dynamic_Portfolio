import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, percentage, aboutId } = await request.json()

    let finalAboutId = aboutId

    if (!finalAboutId) {
      const about = await prisma.about.findFirst()
      if (!about) {
        const newAbout = await prisma.about.create({
          data: {
            title: "About Me",
            description: "Add your description",
            imageUrl: "/placeholder.svg",
          },
        })
        finalAboutId = newAbout.id
      } else {
        finalAboutId = about.id
      }
    }

    const maxOrder = await prisma.skill.findFirst({
      where: { aboutId: finalAboutId },
      orderBy: { order: "desc" },
      select: { order: true },
    })

    await prisma.skill.create({
      data: {
        name,
        percentage: Number.parseInt(percentage),
        aboutId: finalAboutId,
        order: (maxOrder?.order || 0) + 1,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Skill create error:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
