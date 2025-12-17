import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LoginForm } from "@/components/admin/login-form"

export default async function LoginPage() {
  const session = await getSession()

  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-heading">Admin Login</h1>
            <p className="text-muted-foreground">Sign in to manage your portfolio</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
