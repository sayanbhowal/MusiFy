"use client"

import { LoginForm } from "@/components/forms/login-form"
import { useAuth } from "@/components/auth/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push("/")
  }, [user, router])

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-white">Log in</h1>
      <LoginForm />
    </main>
  )
}
