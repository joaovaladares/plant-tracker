import type { Plant } from '../db'
import { getSpeciesById } from '../data/speciesHints'

/** Detecta a estação atual considerando o hemisfério sul (Brasil) */
export function getCurrentSeason(): 'summer' | 'winter' {
  const month = new Date().getMonth() + 1
  return [12, 1, 2, 3].includes(month) ? 'summer' : 'winter'
}

/** Retorna quantos dias faltam para regar. Negativo = atrasado. */
export function getDaysUntilWatering(plant: Plant): number {
  if (!plant.lastWateredAt) return -999

  const nextWatering = new Date(plant.lastWateredAt)
  nextWatering.setDate(nextWatering.getDate() + plant.intervalDays)

  const diffMs = nextWatering.getTime() - Date.now()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

export type WateringStatus = 'overdue' | 'today' | 'soon' | 'ok'

export function getWateringStatus(daysUntil: number): WateringStatus {
  if (daysUntil < 0) return 'overdue'
  if (daysUntil === 0) return 'today'
  if (daysUntil <= 2) return 'soon'
  return 'ok'
}

/** Retorna a próxima data de rega */
export function getNextWateringDate(plant: Plant): Date | null {
  if (!plant.lastWateredAt) return null
  const date = new Date(plant.lastWateredAt)
  date.setDate(date.getDate() + plant.intervalDays)
  return date
}

/** Formata texto de próxima rega amigável: "em 3 dias", "Hoje", "Atrasada há 2 dias" */
export function formatNextWateringLabel(daysUntil: number): string {
  if (daysUntil === -999) return 'Precisa de rega'
  if (daysUntil < 0) return `Atrasada há ${Math.abs(daysUntil)} dia${Math.abs(daysUntil) > 1 ? 's' : ''}`
  if (daysUntil === 0) return 'Hoje'
  if (daysUntil === 1) return 'Amanhã'
  return `em ${daysUntil} dias`
}

/** Formata data curta no estilo do mockup: "18 de Nov", "15 de Nov" */
export function formatDayMonth(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const month = months[date.getMonth()]
  return `${day} de ${month}`
}

/** Texto amigável de última rega: "Regada há 3 dias", "Regada hoje" */
export function formatLastWatered(date?: Date): string {
  if (!date) return 'Ainda não regada'
  const diffMs = Date.now() - new Date(date).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Regada hoje'
  if (days === 1) return 'Regada ontem'
  return `Regada há ${days} dias`
}

/** Calcula porcentagem de hidratação (0 a 100) para a barrinha de progresso */
export function getHydrationProgress(plant: Plant): number {
  if (!plant.lastWateredAt) return 0
  const daysUntil = getDaysUntilWatering(plant)
  if (daysUntil <= 0) return 10 // Quase vazia se atrasada ou hoje
  const progress = (daysUntil / plant.intervalDays) * 100
  return Math.min(100, Math.max(10, Math.round(progress)))
}

/** Retorna o intervalo recomendado para uma espécie, ajustado pela estação */
export function getRecommendedInterval(speciesId: string): number {
  const species = getSpeciesById(speciesId)
  if (!species) return 7
  const season = getCurrentSeason()
  return species.wateringDays[season]
}
