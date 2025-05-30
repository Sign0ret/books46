"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NotificationProps {
  message: string
  type: "success" | "error"
  duration?: number
  onClose?: () => void
}

export function Notification({ message, type, duration = 3000, onClose }: NotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-fade-in">
      <Alert
        variant={type === "error" ? "destructive" : "default"}
        className={
          type === "error"
            ? "border-wine-300 bg-wine-50 dark:bg-wine-900/30 flex items-center"
            : "border-olive-300 bg-olive-50 dark:bg-olive-900/30 flex items-center"
        }
      >
        {type === "success" ? (
          <CheckCircle className="h-4 w-4 mr-2 text-olive-800 dark:text-olive-300" />
        ) : (
          <AlertCircle className="h-4 w-4 mr-2 text-wine-800 dark:text-wine-300" />
        )}
        <AlertDescription
          className={type === "error" ? "text-wine-800 dark:text-wine-300" : "text-olive-800 dark:text-olive-300"}
        >
          {message}
        </AlertDescription>
        <button
          onClick={() => {
            setVisible(false)
            if (onClose) onClose()
          }}
          className="ml-auto"
        >
          <X
            className={
              type === "error"
                ? "h-4 w-4 text-wine-800 dark:text-wine-300"
                : "h-4 w-4 text-olive-800 dark:text-olive-300"
            }
          />
        </button>
      </Alert>
    </div>
  )
}
