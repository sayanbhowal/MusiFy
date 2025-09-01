"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadMe = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
    }
    try {
      const me = await apiFetch("/api/auth/me/")
      setUser(me)
    } catch {
      setUser(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadMe()
  }, [])

  const signup = async (data) => {
    await apiFetch("/api/auth/signup/", {
      method: "POST",
      body: JSON.stringify(data),
    })
    await login({ username: data.username, password: data.password })
  }

  const login = async (data) => {
    const res = await apiFetch("/api/auth/login/", {
      method: "POST",
      body: JSON.stringify(data),
    })
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", res.access)
      localStorage.setItem("refreshToken", res.refresh)
    }
    await loadMe();
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
    setUser(null)
  }

  const value = { user, isLoading, signup, login, logout }

  // This is the corrected line
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}