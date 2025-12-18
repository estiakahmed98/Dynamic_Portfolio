import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error("Services fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const maxOrder = await prisma.service.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    await prisma.service.create({
      data: {
        ...data,
        order: (maxOrder?.order || 0) + 1,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Service create error:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
