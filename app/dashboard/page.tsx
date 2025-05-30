"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { BookList } from "@/components/book-list"
import { BookDialog } from "@/components/book-dialog"
import { StatsCards } from "@/components/stats-cards"
import { isAuthenticated, logout } from "@/lib/auth"
import type { Book } from "@/lib/types"
import { getAllBooks } from "@/lib/api"
import { LogOut, Plus, BookOpen, Search, Grid, List } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { Input } from "@/components/ui/input"
import { ClassicalDivider } from "@/components/classical-divider"

export default function Dashboard() {
  const router = useRouter()
  const { notifyError, NotificationsContainer } = useNotifications()
  const [showDialog, setShowDialog] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: getAllBooks,
    enabled: isAuthenticated(),
  })

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated()
      if (!authenticated) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    if (error) {
      notifyError("Failed to fetch books")
    }
  }, [error, notifyError])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const handleAddBook = () => {
    setSelectedBook(null)
    setShowDialog(true)
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    setShowDialog(true)
  }

  const handleDialogClose = () => {
    setShowDialog(false)
    setSelectedBook(null)
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-parchment-50 dark:bg-marble-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-terracotta-800 dark:border-terracotta-600 rounded-full animate-pulse">
            <BookOpen className="h-8 w-8 text-terracotta-800 dark:text-terracotta-600" />
          </div>
          <p className="mt-4 text-xl text-marble-700 dark:text-marble-300 font-light">Retrieving archives...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-marble-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-terracotta-900 dark:text-terracotta-500 mb-2">
              Books 46
            </h1>
            <p className="text-marble-700 dark:text-marble-300 font-light">Your personal literary collection</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleLogout} className="classical-button-outline">
              <LogOut className="h-4 w-4 mr-2" />
              Depart
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards books={books} />

        <ClassicalDivider text="COLLECTION" />

        {/* Search and Controls */}
        <div className="classical-card p-6 border">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-marble-500" />
                <Input
                  placeholder="Search by title, author, or genre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="classical-input pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-marble-300 dark:border-marble-700 rounded-md p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "classical-button" : ""}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "classical-button" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handleAddBook} className="classical-button">
                <Plus className="h-4 w-4 mr-2" />
                Add Volume
              </Button>
            </div>
          </div>
        </div>

        {/* Books List */}
        <BookList books={filteredBooks} onEdit={handleEditBook} viewMode={viewMode} />

        {/* Book Dialog */}
        <BookDialog book={selectedBook} open={showDialog} onClose={handleDialogClose} />

        {/* Notifications */}
        <NotificationsContainer />
      </div>
    </div>
  )
}
