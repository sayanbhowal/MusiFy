"use client"

export function TrackCard({ track, onPlay }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-[#1f1f1f] p-3 text-white">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded bg-neutral-700" aria-hidden />
        <div>
          <div className="text-sm font-medium">{track.title}</div>
          <div className="text-xs text-neutral-400">{track.artist}</div>
        </div>
      </div>
      {/* Conditionally render the button only if onPlay is provided */}
      {onPlay && (
        <button
          onClick={() => onPlay(track)}
          className="rounded bg-[#1DB954] px-3 py-1 text-sm font-medium text-black hover:opacity-90"
        >
          Play
        </button>
      )}
    </div>
  )
}