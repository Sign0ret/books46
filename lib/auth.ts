"use client"

import Cookies from "js-cookie"

const API_URL = "/api" // Changed from "http://localhost:8080/api"
const TOKEN_COOKIE = "auth_token"

export async function login(username: string, password: string, email: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Login failed")
    }

    // The API returns the token directly as text
    const token = await response.text()

    // Store the token in a cookie
    Cookies.set(TOKEN_COOKIE, token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function signup(username: string, password: string, email: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Signup failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Signup error:", error)
    throw error
  }
}

export function logout(): void {
  Cookies.remove(TOKEN_COOKIE)
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export function getAuthHeader(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
