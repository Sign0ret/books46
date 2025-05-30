"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Book } from "@/lib/types"
import { createBook, updateBook } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { ClassicalDivider } from "@/components/classical-divider"

interface BookDialogProps {
  book: Book | null
  open: boolean
  onClose: () => void
}

export function BookDialog({ book, open, onClose }: BookDialogProps) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [isbn, setIsbn] = useState("")
  const [publicationYear, setPublicationYear] = useState(new Date().getFullYear())
  const [genre, setGenre] = useState("")
  const [pages, setPages] = useState(0)
  const [error, setError] = useState("")

  const queryClient = useQueryClient()
  const { notifySuccess } = useNotifications()

  const createMutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
      notifySuccess("Volume added successfully")
      onClose()
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "Failed to add volume")
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<Book> }) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] })
      notifySuccess("Volume updated successfully")
      onClose()
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "Failed to update volume")
    },
  })

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setAuthor(book.author)
      setIsbn(book.isbn)
      setPublicationYear(book.publicationYear)
      setGenre(book.genre)
      setPages(book.pages)
    } else {
      setTitle("")
      setAuthor("")
      setIsbn("")
      setPublicationYear(new Date().getFullYear())
      setGenre("")
      setPages(0)
    }
    setError("")
  }, [book, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const bookData = {
      title,
      author,
      isbn,
      publicationYear,
      genre,
      pages,
    }

    if (book) {
      updateMutation.mutate({ id: book.id, data: bookData })
    } else {
      createMutation.mutate(bookData)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="classical-card sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-marble-900 dark:text-marble-100">
            {book ? "Edit Volume" : "Add New Volume"}
          </DialogTitle>
          <DialogDescription className="text-marble-700 dark:text-marble-300 font-light">
            {book
              ? "Update the volume information below."
              : "Fill in the details to add a new volume to your collection."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {error && (
              <Alert variant="destructive" className="border-wine-300 bg-wine-50 dark:bg-wine-900/30">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-wine-800 dark:text-wine-300">{error}</AlertDescription>
              </Alert>
            )}

            <ClassicalDivider text="DETAILS" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-marble-800 dark:text-marble-200 font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="classical-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="text-marble-800 dark:text-marble-200 font-medium">
                  Author
                </Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="classical-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isbn" className="text-marble-800 dark:text-marble-200 font-medium">
                  ISBN
                </Label>
                <Input
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="classical-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicationYear" className="text-marble-800 dark:text-marble-200 font-medium">
                  Publication Year
                </Label>
                <Input
                  id="publicationYear"
                  type="number"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(Number.parseInt(e.target.value))}
                  className="classical-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-marble-800 dark:text-marble-200 font-medium">
                  Genre
                </Label>
                <Input
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="classical-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pages" className="text-marble-800 dark:text-marble-200 font-medium">
                  Pages
                </Label>
                <Input
                  id="pages"
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(Number.parseInt(e.target.value))}
                  className="classical-input"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="classical-button-outline"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="classical-button">
              {isLoading ? "Saving..." : book ? "Update" : "Add to Collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
