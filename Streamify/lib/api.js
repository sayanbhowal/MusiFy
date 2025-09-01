// lib/api.js

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export async function apiFetch(path, options = {}) {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null

  // --- START OF UPDATE ---
  // Create base headers
  const headers = {
    ...(options.headers || {}),
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  // Do NOT set Content-Type for FormData, the browser does it automatically
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }
  // --- END OF UPDATE ---

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: headers, // Use the dynamically created headers
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => res.text())
    console.error("API Error Response:", errorData)
    const errorMessage = typeof errorData === 'object' && errorData.detail ? errorData.detail : JSON.stringify(errorData);
    throw new Error(`API Error: ${errorMessage}`)
  }

  if (res.status === 204) { // No Content
    return null
  }
  return res.json()
}

export const swrFetcher = (url) => apiFetch(url.replace(API_BASE_URL, ""))