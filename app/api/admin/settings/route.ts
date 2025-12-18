import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentAdmin } from "@/lib/auth"
import { uploadPDF } from "@/lib/file-upload"

export async function GET() {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await prisma.siteSettings.findFirst()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Settings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const settings = await prisma.siteSettings.findFirst()

    // Extract all form data
    const data: any = {}
    for (const [key, value] of formData.entries()) {
      if (key !== 'cvFile') {
        data[key] = value
      }
    }

    // Handle PDF file upload
    if (formData.has('cvFile')) {
      const cvFile = formData.get('cvFile') as File
      if (cvFile && cvFile.size > 0) {
        try {
          const cvFilePath = await uploadPDF(cvFile)
          data.cvFile = cvFilePath
        } catch (error) {
          console.error('CV upload error:', error)
          return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to upload CV' }, { status: 400 })
        }
      }
    }

    // Remove cvUrl if it exists (legacy field)
    delete data.cvUrl

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
