"use client"

import { useState } from "react"
import { apiFetch } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !title || !artist) {
      setError("Please fill out all fields and select a file.")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccessMessage("")

    const formData = new FormData()
    formData.append("title", title)
    formData.append("artist", artist)
    formData.append("audio_file", file)

    try {
      // This will require the updated api.js file to work
      await apiFetch("/api/tracks/", {
        method: "POST",
        body: formData,
      })
      setSuccessMessage("Track uploaded successfully! Redirecting to home...")
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      setError(err.message || "An error occurred during upload.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold text-white">Upload a New Track</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form inputs go here, same as previous response... */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm text-neutral-300">Title</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded border border-neutral-700 bg-[#1f1f1f] px-3 py-2 text-white outline-none focus:border-[#1DB954]"/>
        </div>
        <div>
          <label htmlFor="artist" className="mb-1 block text-sm text-neutral-300">Artist</label>
          <input id="artist" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required className="w-full rounded border border-neutral-700 bg-[#1f1f1f] px-3 py-2 text-white outline-none focus:border-[#1DB954]"/>
        </div>
        <div>
          <label htmlFor="file" className="mb-1 block text-sm text-neutral-300">Audio File (MP3)</label>
          <input id="file" type="file" onChange={handleFileChange} required accept=".mp3,audio/*" className="block w-full text-sm text-neutral-400 file:mr-4 file:rounded-md file:border-0 file:bg-[#1DB954] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:opacity-90"/>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {successMessage && <p className="text-sm text-green-400">{successMessage}</p>}
        <button type="submit" disabled={isLoading} className="w-full rounded bg-[#1DB954] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {isLoading ? "Uploading..." : "Upload Track"}
        </button>
      </form>
    </main>
  )
}