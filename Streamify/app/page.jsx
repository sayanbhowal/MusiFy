"use client"

import useSWR from "swr"
import { swrFetcher } from "@/lib/api"
import { TrackCard } from "@/components/track-card"
import { useState } from "react"

export default function HomePage() {
  // Removed the TypeScript generic from useSWR
  const { data, isLoading, error } = useSWR("/api/tracks/", (path) =>
    swrFetcher(process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}` : path),
  )

  // Removed the TypeScript generic from useState
  const [nowPlaying, setNowPlaying] = useState(null)

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-balance text-2xl font-semibold text-white">Home</h1>
      {isLoading && <p className="text-neutral-300">Loading tracks...</p>}
      {error && <p className="text-red-400">Failed to load tracks</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.results?.map((t) => (
          <TrackCard key={t.id} track={t} onPlay={setNowPlaying} />
        ))}
      </div>
      {/* Hidden link-up with player via global store could be added.
          For demo, user presses Play on TrackCard and can listen in browser
          if you wire it into PlayerBar's queue through a global store. */}
    </main>
  )
}