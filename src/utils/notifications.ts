export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

export function showWateringNotification(plantName: string): void {
  if (Notification.permission !== 'granted') return
  new Notification('💧 Hora de regar!', {
    body: `${plantName} precisa de água hoje.`,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  })
}

/** Agenda uma notificação in-app (funciona enquanto o app está aberto) */
export function scheduleWateringReminder(plantName: string, daysUntil: number): ReturnType<typeof setTimeout> | null {
  if (daysUntil <= 0) return null
  const ms = daysUntil * 24 * 60 * 60 * 1000
  return setTimeout(() => showWateringNotification(plantName), ms)
}

export function isNotificationsSupported(): boolean {
  return 'Notification' in window
}
