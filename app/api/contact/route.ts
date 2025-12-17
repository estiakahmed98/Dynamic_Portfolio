import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    await prisma.contactSubmission.create({
      data: { email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
