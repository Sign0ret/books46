"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Book } from "@/lib/types"
import { deleteBook } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, BookOpen } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"

interface BookListProps {
  books: Book[]
  onEdit: (book: Book) => void
  viewMode: "grid" | "list"
}

export function BookList({ books, onEdit, viewMode }: BookListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const queryClient = useQueryClient()
  const { notifySuccess, notifyError } = useNotifications()

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onMutate: async (bookId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["books"] })

      // Snapshot the previous value
      const previousBooks = queryClient.getQueryData(["books"])

      // Optimistically update to remove the book
      queryClient.setQueryData(["books"], (old: Book[] | undefined) => {
        if (!old) return []
        return old.filter((book) => book.id !== bookId)
      })

      // Return a context object with the snapshotted value
      return { previousBooks }
    },
    onError: (err, bookId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousBooks) {
        queryClient.setQueryData(["books"], context.previousBooks)
      }
      notifyError(err instanceof Error ? err.message : "Failed to remove volume")
    },
    onSuccess: () => {
      notifySuccess("Volume removed successfully")
      setDeleteDialogOpen(false)
      setBookToDelete(null)
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["books"] })
    },
  })

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return
    deleteMutation.mutate(bookToDelete.id)
  }

  if (books.length === 0) {
    return (
      <Card className="classical-card border">
        <CardContent className="pt-6 text-center p-12">
          <BookOpen className="h-12 w-12 text-marble-400 dark:text-marble-600 mx-auto mb-4" />
          <p className="text-marble-700 dark:text-marble-300 font-light text-lg">
            Your collection awaits its first volume.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="classical-card border overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2 text-marble-900 dark:text-marble-100">{book.title}</h3>
                  <p className="text-marble-700 dark:text-marble-300 font-light mb-4">by {book.author}</p>

                  <div className="space-y-2 text-sm text-marble-600 dark:text-marble-400">
                    <div className="flex justify-between">
                      <span>Genre:</span>
                      <span className="font-medium text-marble-800 dark:text-marble-200">{book.genre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Year:</span>
                      <span className="font-medium text-marble-800 dark:text-marble-200">{book.publicationYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ISBN:</span>
                      <span className="font-medium text-marble-800 dark:text-marble-200">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pages:</span>
                      <span className="font-medium text-marble-800 dark:text-marble-200">{book.pages}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-marble-200 dark:border-marble-700 p-4 flex justify-end gap-2 bg-parchment-100 dark:bg-marble-800/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(book)}
                    className="text-terracotta-800 dark:text-terracotta-600 hover:text-terracotta-900 dark:hover:text-terracotta-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(book)}
                    disabled={deleteMutation.isPending}
                    className="text-wine-800 dark:text-wine-600 hover:text-wine-900 dark:hover:text-wine-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="classical-card">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-serif text-marble-900 dark:text-marble-100">
                Confirm Removal
              </AlertDialogTitle>
              <AlertDialogDescription className="text-marble-700 dark:text-marble-300 font-light">
                Are you certain you wish to remove "{bookToDelete?.title}" from your collection? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteMutation.isPending} className="classical-button-outline">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="bg-wine-800 hover:bg-wine-900 text-parchment-50 border border-wine-900"
              >
                {deleteMutation.isPending ? "Removing..." : "Remove"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <>
      <div className="classical-card border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-parchment-100 dark:bg-marble-800/50 hover:bg-parchment-200 dark:hover:bg-marble-800">
              <TableHead className="font-serif">Title</TableHead>
              <TableHead className="font-serif">Author</TableHead>
              <TableHead className="font-serif">Genre</TableHead>
              <TableHead className="font-serif">Year</TableHead>
              <TableHead className="font-serif">ISBN</TableHead>
              <TableHead className="font-serif">Pages</TableHead>
              <TableHead className="text-right font-serif">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                className="border-b border-marble-200 dark:border-marble-700 hover:bg-parchment-100 dark:hover:bg-marble-800/30"
              >
                <TableCell className="font-medium text-marble-900 dark:text-marble-100">{book.title}</TableCell>
                <TableCell className="text-marble-700 dark:text-marble-300">{book.author}</TableCell>
                <TableCell className="text-marble-700 dark:text-marble-300">{book.genre}</TableCell>
                <TableCell className="text-marble-700 dark:text-marble-300">{book.publicationYear}</TableCell>
                <TableCell className="text-marble-700 dark:text-marble-300">{book.isbn}</TableCell>
                <TableCell className="text-marble-700 dark:text-marble-300">{book.pages}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(book)}
                      className="text-terracotta-800 dark:text-terracotta-600 hover:text-terracotta-900 dark:hover:text-terracotta-500"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(book)}
                      disabled={deleteMutation.isPending}
                      className="text-wine-800 dark:text-wine-600 hover:text-wine-900 dark:hover:text-wine-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="classical-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-marble-900 dark:text-marble-100">
              Confirm Removal
            </AlertDialogTitle>
            <AlertDialogDescription className="text-marble-700 dark:text-marble-300 font-light">
              Are you certain you wish to remove "{bookToDelete?.title}" from your collection? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending} className="classical-button-outline">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-wine-800 hover:bg-wine-900 text-parchment-50 border border-wine-900"
            >
              {deleteMutation.isPending ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}