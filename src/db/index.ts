import Dexie, { type Table } from 'dexie'

export interface Plant {
  id?: number
  name: string
  speciesId?: string
  photoDataUrl?: string
  addedAt: Date
  lastWateredAt?: Date
  intervalDays: number
  notificationsEnabled: boolean
  notes?: string
}

export interface WateringLog {
  id?: number
  plantId: number
  wateredAt: Date
  note?: string
}

class PlantTrackerDB extends Dexie {
  plants!: Table<Plant>
  wateringLogs!: Table<WateringLog>

  constructor() {
    super('PlantTrackerDB')
    this.version(1).stores({
      plants: '++id, speciesId, lastWateredAt, addedAt',
      wateringLogs: '++id, plantId, wateredAt',
    })
  }
}

export const db = new PlantTrackerDB()
