"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Calendar, ScrollText } from "lucide-react"
import type { Book } from "@/lib/types"

interface StatsCardsProps {
  books: Book[]
}

export function StatsCards({ books }: StatsCardsProps) {
  const totalBooks = books.length
  const uniqueAuthors = new Set(books.map((book) => book.author)).size
  const currentYear = new Date().getFullYear()
  const recentBooks = books.filter((book) => book.publicationYear >= currentYear - 5).length
  const totalPages = books.reduce((sum, book) => sum + book.pages, 0)

  const stats = [
    {
      title: "Volumes",
      value: totalBooks.toLocaleString(),
      icon: BookOpen,
    },
    {
      title: "Authors",
      value: uniqueAuthors.toLocaleString(),
      icon: Users,
    },
    {
      title: "Recent Acquisitions",
      value: recentBooks.toLocaleString(),
      icon: Calendar,
    },
    {
      title: "Pages",
      value: totalPages.toLocaleString(),
      icon: ScrollText,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="classical-card border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-marble-700 dark:text-marble-300 mb-1 font-serif">{stat.title}</p>
                <p className="text-2xl font-bold text-marble-900 dark:text-marble-100 font-serif">{stat.value}</p>
              </div>
              <div className="p-3 border border-terracotta-200 dark:border-terracotta-800 rounded-md">
                <stat.icon className="h-5 w-5 text-terracotta-800 dark:text-terracotta-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
