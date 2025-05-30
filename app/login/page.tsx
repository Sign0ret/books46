"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { login } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, BookOpen, Mail, Lock, User } from "lucide-react"
import { ClassicalDivider } from "@/components/classical-divider"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(username, password, email)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-marble-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-terracotta-800 dark:border-terracotta-600 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-terracotta-800 dark:text-terracotta-600" />
          </div>
          <h1 className="text-2xl font-serif text-terracotta-900 dark:text-terracotta-500">Books 46</h1>
          <p className="text-marble-700 dark:text-marble-300 mt-2 font-light">Enter your credentials</p>
        </div>

        <Card className="classical-card">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-serif text-center text-marble-900 dark:text-marble-100">
              Member Access
            </CardTitle>
            <CardDescription className="text-center text-marble-700 dark:text-marble-300 font-light">
              Provide your credentials to access the archives
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-wine-300 bg-wine-50 dark:bg-wine-900/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-wine-800 dark:text-wine-300">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-marble-800 dark:text-marble-200 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-marble-500" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="classical-input pl-10"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-marble-800 dark:text-marble-200 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-marble-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="classical-input pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-marble-800 dark:text-marble-200 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-marble-500" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="classical-input pl-10"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button type="submit" className="classical-button w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Authenticating...
                  </div>
                ) : (
                  "Enter"
                )}
              </Button>

              <ClassicalDivider text="OR" />

              <div className="text-center">
                <span className="text-marble-700 dark:text-marble-300 font-light">Don't have an account? </span>
                <Link
                  href="/signup"
                  className="text-terracotta-800 hover:text-terracotta-900 dark:text-terracotta-500 dark:hover:text-terracotta-400 font-medium hover:underline"
                >
                  Request membership
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
