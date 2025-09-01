export default function RequirementsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6 text-white">
      <h1 className="mb-4 text-2xl font-semibold">Requirements</h1>
      <div className="space-y-4 text-sm leading-6 text-neutral-200">
        <section>
          <h2 className="text-lg font-semibold">Frontend (Next.js)</h2>
          <ul className="list-inside list-disc">
            <li>Node.js v18+ and a modern browser</li>
            <li>Environment: NEXT_PUBLIC_API_BASE_URL set to Django API (default http://localhost:8000)</li>
            <li>Pages: Home, Search, Account, Login, Signup</li>
            <li>Components: Header, Player Bar, Track Card</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Backend (Django)</h2>
          <ul className="list-inside list-disc">
            <li>Django 5+, Django REST Framework, SimpleJWT, CORS Headers</li>
            <li>Models: Track, Playlist</li>
            <li>Auth: JWT login, signup; /api/auth/me/ profile</li>
            <li>Endpoints: /api/tracks/, /api/playlists/, /api/search/?q=, auth endpoints</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Color & Typography</h2>
          <ul className="list-inside list-disc">
            <li>Colors: Primary #1DB954, Neutral #121212, Neutral #1f1f1f, Neutral #ffffff, Accent #3b82f6</li>
            <li>Fonts: Geist (sans) for headings and body, Geist Mono for code where needed</li>
            <li>No gradients, AA contrast respected</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
