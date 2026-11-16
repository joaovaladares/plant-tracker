import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { usePlant, waterPlant, deletePlant } from '../hooks/usePlants'
import { getSpeciesById } from '../data/speciesHints'
import {
  getDaysUntilWatering,
  getNextWateringDate,
  formatDayMonth,
  getCurrentSeason,
} from '../utils/watering'

export default function PlantDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const plant = usePlant(Number(id))
  const [watering, setWatering] = useState(false)
  const season = getCurrentSeason()

  if (!plant) {
    return (
      <div className="py-20 text-center text-gray-400 text-sm">
        Carregando detalhes...
      </div>
    )
  }

  const species = plant.speciesId ? getSpeciesById(plant.speciesId) : null
  const days = getDaysUntilWatering(plant)
  const nextDate = getNextWateringDate(plant)

  async function handleWater() {
    setWatering(true)
    await waterPlant(plant!)
    navigate(`/plant/${plant!.id}/success`)
  }

  async function handleDelete() {
    if (confirm(`Tem certeza que deseja excluir ${plant!.name}?`)) {
      await deletePlant(plant!.id!)
      navigate('/')
    }
  }

  return (
    <div>
      {/* Topbar com botão voltar */}
      <div className="flex items-center justify-between py-4">
        <div>
          <p className="eyebrow">DETALHES DA PLANTA</p>
          <h2 className="font-heading font-bold text-xl text-gray-900 m-0">
            {plant.name}
          </h2>
        </div>
        <Link
          to="/"
          className="icon-button"
          aria-label="Fechar e voltar para o início"
        >
          ×
        </Link>
      </div>

      {/* Foto Real ou Emoji */}
      <div className="text-center my-4">
        <div className="w-28 h-28 rounded-full bg-[var(--mint2)] mx-auto overflow-hidden shadow-sm flex items-center justify-center ring-4 ring-white border border-[var(--line)]">
          {plant.photoDataUrl ? (
            <img
              src={plant.photoDataUrl}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl">{species?.emoji ?? '🌿'}</span>
          )}
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-gray-900 mt-3 mb-0.5">
          {plant.name}
        </h2>
        {species && (
          <p className="text-xs text-[var(--muted)] m-0">
            {species.commonName} · {species.scientificName}
          </p>
        )}
      </div>

      {/* Próxima Rega Card */}
      <div className="bg-[var(--mint2)] p-4 rounded-2xl my-4 border border-[#e4ede3]">
        <span className="text-[10px] font-bold tracking-wider text-[var(--muted)] uppercase block">
          PRÓXIMA REGA
        </span>
        <strong className="font-heading font-bold text-lg text-gray-900 block mt-1">
          {days < 0
            ? `Atrasada há ${Math.abs(days)} dia(s)`
            : days === 0
            ? 'Hoje'
            : `Em ${days} dia(s)`}
          {nextDate && ` · ${formatDayMonth(nextDate)}`}
        </strong>
      </div>

      {/* Seção: Dicas de Cuidado Reais para esta Planta */}
      <div className="bg-[#fafbf8] p-4 rounded-2xl border border-[var(--line)] my-4 space-y-3">
        <strong className="text-xs font-bold text-gray-900 block uppercase tracking-wider">
          💡 Dicas de rega e cuidados
        </strong>

        <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
          <p>
            ☀️ <strong>Iluminação:</strong>{' '}
            {species?.sun ?? 'Prefere luz indireta brilhante.'}
          </p>
          <p>
            💧 <strong>Rega recomendada:</strong>{' '}
            {species?.wateringSummary ?? `A cada ${plant.intervalDays} dias`}.
          </p>
          <p className="text-[11px] text-[var(--muted)] pt-1 border-t border-[var(--line)]">
            🌡️ <strong>Ajuste de estação:</strong> No{' '}
            {season === 'summer' ? 'verão' : 'inverno'}, o intervalo ideal para
            esta espécie é de aproximadamente{' '}
            {species ? species.wateringDays[season] : plant.intervalDays} dias.
          </p>
          {species?.tips && (
            <ul className="text-[11px] text-gray-500 list-disc list-inside space-y-1 pt-1">
              {species.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Observações da Planta */}
      {plant.notes && (
        <div className="text-xs text-[#667269] leading-relaxed my-3 bg-white p-3 rounded-xl border border-[var(--line)]">
          <strong>Suas anotações:</strong> {plant.notes}
        </div>
      )}

      {/* Ações */}
      <div className="flex gap-2.5 mt-5">
        <button
          onClick={handleWater}
          disabled={watering}
          className="primary-button flex-1"
        >
          {watering ? '✅ Regada!' : '💧 Registrar rega'}
        </button>
        <button
          onClick={handleDelete}
          className="secondary-button"
        >
          Excluir
        </button>
      </div>
    </div>
  )
}
