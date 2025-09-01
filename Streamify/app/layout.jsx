import React from "react"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { AuthProvider } from "@/components/auth/auth-context"
import { SiteHeader } from "@/components/site-header"
import { PlayerBar } from "@/components/player-bar"
import { Suspense } from "react"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-[#121212] text-white">
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <SiteHeader />
            <div className="pb-20">{children}</div>
            <PlayerBar />
          </Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
