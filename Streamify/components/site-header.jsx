"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"

export function SiteHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="w-full border-b border-neutral-800 bg-[#121212] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Site Title Link */}
        <Link href="/" className="font-semibold text-balance text-xl">
          Streamify
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:text-[#1DB954]">
            Home
          </Link>
          <Link href="/search" className="text-sm hover:text-[#1DB954]">
            Search
          </Link>

          {/* This part changes based on whether the user is logged in */}
          {user ? (
            // Links for LOGGED-IN users
            <>
              <Link href="/upload" className="text-sm hover:text-[#1DB954]">
                Upload
              </Link>
              <Link href="/account" className="text-sm hover:text-[#1DB954]">
                Account
              </Link>
              <button
                onClick={logout}
                className="rounded bg-white px-3 py-1 text-sm font-medium text-black hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            // Links for LOGGED-OUT users
            <>
              <Link href="/login" className="text-sm hover:text-[#1DB954]">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded bg-[#1DB954] px-3 py-1 text-sm font-medium text-black hover:opacity-90"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}