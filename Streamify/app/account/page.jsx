"use client"

import { useAuth } from "@/components/auth/auth-context"

export default function AccountPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-neutral-300">Loading account...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="mb-4 text-2xl font-semibold text-white">Account</h1>
        <p className="text-neutral-300">Please log in to view your account.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-white">Account</h1>
      <div className="rounded-lg border border-neutral-800 bg-[#1f1f1f] p-4 text-white">
        <div className="text-sm">
          <div className="mb-2">
            <span className="text-neutral-400">Username:</span> {user.username}
          </div>
          <div className="mb-2">
            <span className="text-neutral-400">Email:</span> {user.email}
          </div>
        </div>
      </div>
    </main>
  )
}
