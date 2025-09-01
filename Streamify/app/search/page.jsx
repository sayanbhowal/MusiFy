"use client"

import { useState } from "react"
import useSWR from "swr"
import { swrFetcher } from "@/lib/api"
import { TrackCard } from "@/components/track-card"

export default function SearchPage() {
  const [q, setQ] = useState("")
  const [query, setQuery] = useState("")

  // Removed the TypeScript generic from useSWR
  const { data, isLoading } = useSWR(
    query ? `/api/search/?q=${encodeURIComponent(query)}` : null,
    (path) =>
      swrFetcher(process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}` : path),
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-balance text-2xl font-semibold text-white">Search</h1>
      <form
        className="mb-6 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          setQuery(q.trim())
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search songs, artists..."
          className="w-full rounded border border-neutral-700 bg-[#1f1f1f] px-3 py-2 text-white outline-none focus:border-[#1DB954]"
        />
        <button
          type="submit"
          className="rounded bg-[#1DB954] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
        >
          Search
        </button>
      </form>
      {isLoading && query && <p className="text-neutral-300">Searching...</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.results?.map((t) => (
          <TrackCard key={t.id} track={t} />
        ))}
      </div>
    </main>
  )
}