"use client"

import { useState, useCallback } from "react"
import { Notification } from "@/components/notification"

type NotificationType = "success" | "error"

interface NotificationItem {
  id: string
  message: string
  type: NotificationType
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const showNotification = useCallback((message: string, type: NotificationType) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { id, message, type }])
    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const notifySuccess = useCallback(
    (message: string) => {
      return showNotification(message, "success")
    },
    [showNotification],
  )

  const notifyError = useCallback(
    (message: string) => {
      return showNotification(message, "error")
    },
    [showNotification],
  )

  const NotificationsContainer = useCallback(
    () => (
      <>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </>
    ),
    [notifications, removeNotification],
  )

  return {
    notifySuccess,
    notifyError,
    NotificationsContainer,
  }
}
