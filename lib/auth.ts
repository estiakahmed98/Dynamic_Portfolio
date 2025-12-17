import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(adminId: string) {
  const sessionToken = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  ;(await cookies()).set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return sessionToken
}

export async function getSession() {
  const sessionToken = (await cookies()).get("admin_session")?.value
  return sessionToken || null
}

export async function deleteSession() {
  ;(await cookies()).delete("admin_session")
}

export async function getCurrentAdmin() {
  const sessionToken = await getSession()
  if (!sessionToken) return null

  // In production, store sessions in database
  // For now, we'll validate by checking if admin exists
  const admin = await prisma.admin.findFirst()
  return admin
}
