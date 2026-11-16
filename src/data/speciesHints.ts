export interface SpeciesHint {
  id: string
  commonName: string
  scientificName: string
  emoji: string
  wateringDays: {
    summer: number
    winter: number
  }
  tips: string[]
  difficulty: 'fácil' | 'médio' | 'difícil'
  sun: string              // Ex: 'Sol indireto', 'Sol pleno', 'Meia-sombra'
  wateringSummary: string  // Ex: '1x por semana', 'A cada 10 a 15 dias'
}

export const SPECIES_HINTS: SpeciesHint[] = [
  {
    id: 'jiboia',
    commonName: 'Jiboia',
    scientificName: 'Epipremnum aureum',
    emoji: '🍃',
    wateringDays: { summer: 5, winter: 10 },
    tips: ['Tolera pouca luz', 'Deixe os 2 cm de cima do solo secarem antes de regar', 'Ótima para ambientes internos'],
    difficulty: 'fácil',
    sun: 'Sol indireto',
    wateringSummary: '1x por semana',
  },
  {
    id: 'zamioculca',
    commonName: 'Zamioculca',
    scientificName: 'Zamioculcas zamiifolia',
    emoji: '🌿',
    wateringDays: { summer: 12, winter: 25 },
    tips: ['Muito resistente à seca', 'Prefere solo bem drenado', 'Não exige muita luz'],
    difficulty: 'fácil',
    sun: 'Meia-sombra ou sombra',
    wateringSummary: 'A cada 15 a 20 dias',
  },
  {
    id: 'espada-sao-jorge',
    commonName: 'Espada-de-São-Jorge',
    scientificName: 'Sansevieria trifasciata',
    emoji: '🗡️',
    wateringDays: { summer: 12, winter: 25 },
    tips: ['Quase impossível de matar', 'Nunca deixe água parada no prato', 'Tolera ambientes secos'],
    difficulty: 'fácil',
    sun: 'Sol pleno ou indireto',
    wateringSummary: 'A cada 10 a 15 dias',
  },
  {
    id: 'costela-de-adao',
    commonName: 'Costela-de-Adão',
    scientificName: 'Monstera deliciosa',
    emoji: '🌴',
    wateringDays: { summer: 7, winter: 12 },
    tips: ['Gosta de luz indireta', 'Pulverize as folhas com água', 'Cresce bastante — deixe espaço'],
    difficulty: 'médio',
    sun: 'Luz indireta brilhante',
    wateringSummary: '1x por semana',
  },
  {
    id: 'samambaia',
    commonName: 'Samambaia',
    scientificName: 'Nephrolepis exaltata',
    emoji: '🌱',
    wateringDays: { summer: 3, winter: 6 },
    tips: ['Nunca deixe o solo secar completamente', 'Adora umidade', 'Borrife água nas folhas'],
    difficulty: 'médio',
    sun: 'Meia-sombra',
    wateringSummary: '2x a 3x por semana',
  },
  {
    id: 'cacto',
    commonName: 'Cacto / Suculenta',
    scientificName: 'Cactaceae spp.',
    emoji: '🌵',
    wateringDays: { summer: 14, winter: 30 },
    tips: ['Solo precisa secar completamente entre regas', 'Adora sol direto', 'Menos é mais!'],
    difficulty: 'fácil',
    sun: 'Sol pleno',
    wateringSummary: 'A cada 15 a 30 dias',
  },
  {
    id: 'lirio-da-paz',
    commonName: 'Lírio-da-Paz',
    scientificName: 'Spathiphyllum wallisii',
    emoji: '🤍',
    wateringDays: { summer: 5, winter: 10 },
    tips: ['A planta "pede água" tombando as folhas', 'Boa para ambientes internos', 'Floresce em ambientes com pouca luz'],
    difficulty: 'fácil',
    sun: 'Sombra ou meia-sombra',
    wateringSummary: '1x a 2x por semana',
  },
  {
    id: 'calathea',
    commonName: 'Calathea / Maranta',
    scientificName: 'Calathea spp.',
    emoji: '🍂',
    wateringDays: { summer: 5, winter: 8 },
    tips: ['Use água filtrada ou fervida e resfriada', 'Alta umidade é essencial', 'Evite sol direto'],
    difficulty: 'difícil',
    sun: 'Luz indireta filtrada',
    wateringSummary: '1x a 2x por semana',
  },
  {
    id: 'orquidea',
    commonName: 'Orquídea',
    scientificName: 'Phalaenopsis spp.',
    emoji: '🌸',
    wateringDays: { summer: 6, winter: 10 },
    tips: ['Mergulhe o vaso em água por 10 minutos', 'Nunca deixe água na coroa', 'Luz indireta brilhante'],
    difficulty: 'médio',
    sun: 'Luz difusa',
    wateringSummary: '1x por semana',
  },
  {
    id: 'antúrio',
    commonName: 'Antúrio',
    scientificName: 'Anthurium andraeanum',
    emoji: '❤️',
    wateringDays: { summer: 7, winter: 12 },
    tips: ['Gosta de luz indireta brilhante', 'Solo levemente úmido', 'Flores duradouras'],
    difficulty: 'médio',
    sun: 'Luz indireta',
    wateringSummary: '1x por semana',
  },
  {
    id: 'suculenta',
    commonName: 'Suculenta',
    scientificName: 'Echeveria spp.',
    emoji: '🪴',
    wateringDays: { summer: 10, winter: 21 },
    tips: ['Regar direto na terra, não nas folhas', 'Solo deve secar completamente', 'Precisa de boa luz'],
    difficulty: 'fácil',
    sun: 'Sol direto ou meia-sombra',
    wateringSummary: 'A cada 7 a 10 dias',
  },
  {
    id: 'outro',
    commonName: 'Outro / Não sei',
    scientificName: '',
    emoji: '🌱',
    wateringDays: { summer: 7, winter: 10 },
    tips: ['Faça o teste do dedo no solo', 'Em caso de dúvida, regue menos'],
    difficulty: 'fácil',
    sun: 'Luz indireta',
    wateringSummary: '1x por semana',
  },
]

export function getSpeciesById(id: string): SpeciesHint | undefined {
  return SPECIES_HINTS.find((s) => s.id === id)
}
