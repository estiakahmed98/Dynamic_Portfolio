import { writeFile, mkdir } from 'fs/promises'
import { unlinkSync } from 'fs'
import { join } from 'path'
import { existsSync } from 'fs'

export async function uploadPDF(file: File): Promise<string> {
  // Validate file type
  if (file.type !== 'application/pdf') {
    throw new Error('Only PDF files are allowed')
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size cannot exceed 10MB')
  }

  // Create uploads directory if it doesn't exist
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  // Generate unique filename
  const timestamp = Date.now()
  const filename = `cv_${timestamp}.pdf`
  const filepath = join(uploadsDir, filename)

  // Convert file to buffer and save
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(filepath, buffer)

  // Return relative path for database storage
  return `/uploads/${filename}`
}

export function deletePDF(filePath: string): void {
  try {
    const fullPath = join(process.cwd(), 'public', filePath)
    if (existsSync(fullPath)) {
      unlinkSync(fullPath)
    }
  } catch (error) {
    console.error('Error deleting PDF file:', error)
  }
}
