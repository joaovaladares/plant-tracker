import { useLiveQuery } from 'dexie-react-hooks'
import { db, type Plant, type WateringLog } from '../db'
import { getDaysUntilWatering } from '../utils/watering'

export function usePlants() {
  const plants = useLiveQuery(() => db.plants.orderBy('addedAt').reverse().toArray(), [])
  return plants ?? []
}

export function usePlant(id: number) {
  return useLiveQuery(() => db.plants.get(id), [id])
}

export function useWateringLogs(plantId: number) {
  return useLiveQuery(
    () =>
      db.wateringLogs
        .where('plantId')
        .equals(plantId)
        .sortBy('wateredAt')
        .then((logs) => logs.reverse()),
    [plantId]
  )
}

export interface DetailedLog extends WateringLog {
  plantName: string
  photoDataUrl?: string
  speciesEmoji?: string
}

export function useAllWateringLogs() {
  return useLiveQuery(async () => {
    const logs = await db.wateringLogs.orderBy('wateredAt').reverse().toArray()
    const plants = await db.plants.toArray()
    const plantMap = new Map(plants.map((p) => [p.id!, p]))

    return logs.map((log) => {
      const plant = plantMap.get(log.plantId)
      return {
        ...log,
        plantName: plant ? plant.name : 'Planta removida',
        photoDataUrl: plant?.photoDataUrl,
      } as DetailedLog
    })
  }, [])
}

export function useNextWateringPlant() {
  const plants = usePlants()
  if (plants.length === 0) return null

  // Ordena por dias restantes (o menor/mais urgente primeiro)
  const sorted = [...plants].sort((a, b) => {
    return getDaysUntilWatering(a) - getDaysUntilWatering(b)
  })

  return sorted[0]
}

export async function addPlant(plant: Omit<Plant, 'id'>): Promise<number> {
  return db.plants.add(plant)
}

export async function updatePlant(id: number, changes: Partial<Plant>): Promise<void> {
  await db.plants.update(id, changes)
}

export async function deletePlant(id: number): Promise<void> {
  await db.wateringLogs.where('plantId').equals(id).delete()
  await db.plants.delete(id)
}

export async function waterPlant(plant: Plant): Promise<void> {
  const now = new Date()
  await db.plants.update(plant.id!, { lastWateredAt: now })
  await db.wateringLogs.add({ plantId: plant.id!, wateredAt: now })
}
