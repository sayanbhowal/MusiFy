"use client"

import React from "react" // Changed from 'import type'
import { useState } from "react"
import { useAuth } from "@/components/auth/auth-context"

export function LoginForm() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null) // Removed <string | null>

  const onSubmit = async (e) => { // Removed : React.FormEvent
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      await login(form)
    } catch (error) { // Removed : any
      // A more robust way to get an error message in JS
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setErr(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm text-neutral-300">Username</label>
        <input
          type="text"
          required
          value={form.username}
          onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
          className="w-full rounded border border-neutral-700 bg-[#1f1f1f] px-3 py-2 text-white outline-none focus:border-[#1DB954]"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-neutral-300">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="w-full rounded border border-neutral-700 bg-[#1f1f1f] px-3 py-2 text-white outline-none focus:border-[#1DB954]"
        />
      </div>
      {err && <p className="text-sm text-red-400">{err}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}