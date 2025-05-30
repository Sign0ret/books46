export interface Book {
  id: string | number
  title: string
  author: string
  isbn: string
  publicationYear: number
  genre: string
  pages: number
}

export interface AuthResponse {
  token: string
}
