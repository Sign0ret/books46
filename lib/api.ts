"use client"

import { getAuthHeader } from "./auth"
import type { Book } from "./types"

const API_URL = "/api" // Changed from "http://localhost:8080/api"

// Generic fetch function with auth header
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const authHeader = getAuthHeader()

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `API error: ${response.status}`)
  }

  return response.json()
}

// Book API functions
export async function getAllBooks(): Promise<Book[]> {
  return fetchWithAuth("/books")
}

export async function getBookById(id: string | number): Promise<Book> {
  return fetchWithAuth(`/books/${id}`)
}

export async function createBook(bookData: Omit<Book, "id">): Promise<Book> {
  return fetchWithAuth("/books", {
    method: "POST",
    body: JSON.stringify(bookData),
  })
}

export async function updateBook(id: string | number, bookData: Partial<Book>): Promise<Book> {
  return fetchWithAuth(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(bookData),
  })
}

export async function deleteBook(id: string | number): Promise<void> {
  return fetchWithAuth(`/books/${id}`, {
    method: "DELETE",
  })
}
