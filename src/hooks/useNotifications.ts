import { useState, useCallback } from 'react'
import { requestNotificationPermission, isNotificationsSupported } from '../utils/notifications'

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(
    isNotificationsSupported() ? Notification.permission : 'denied'
  )

  const request = useCallback(async () => {
    const granted = await requestNotificationPermission()
    setPermission(granted ? 'granted' : 'denied')
    return granted
  }, [])

  return {
    permission,
    isSupported: isNotificationsSupported(),
    isGranted: permission === 'granted',
    request,
  }
}
