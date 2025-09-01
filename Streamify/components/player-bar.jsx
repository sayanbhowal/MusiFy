"use client"

import { useRef, useState } from "react"

export function PlayerBar({ initialQueue = [] }) {
  const [queue, setQueue] = useState(initialQueue)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const current = queue[currentIndex]

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const next = () => {
    setCurrentIndex((i) => (i + 1) % (queue.length || 1))
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 0)
  }

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + (queue.length || 1)) % (queue.length || 1))
    setIsPlaying(true)
    setTimeout(() => audioRef.current?.play().catch(() => {}), 0)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-[#121212] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 rounded bg-neutral-700" aria-hidden>
            {/* Cover image placeholder */}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{current ? current.title : "No track selected"}</div>
            <div className="truncate text-xs text-neutral-400">{current ? current.artist : "—"}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={prev} className="rounded px-2 py-1 text-sm hover:text-[#1DB954]" aria-label="Previous">
            {"⏮"}
          </button>
          <button
            onClick={togglePlay}
            className="rounded bg-white px-3 py-1 text-sm font-medium text-black hover:opacity-90"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={next} className="rounded px-2 py-1 text-sm hover:text-[#1DB954]" aria-label="Next">
            {"⏭"}
          </button>
        </div>
      </div>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={current?.audio_url} crossOrigin="anonymous" onEnded={next} />
    </div>
  )
}