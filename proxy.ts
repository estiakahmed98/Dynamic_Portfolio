import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("admin_session")

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Redirect to dashboard if already logged in
  if (pathname === "/admin/login") {
    const session = request.cookies.get("admin_session")

    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
