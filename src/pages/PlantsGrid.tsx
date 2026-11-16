import { Link } from 'react-router-dom'
import { usePlants } from '../hooks/usePlants'
import { getDaysUntilWatering } from '../utils/watering'
import { getSpeciesById } from '../data/speciesHints'

export default function PlantsGrid() {
  const plants = usePlants()

  function getStatusInfo(plant: (typeof plants)[0]) {
    const n = getDaysUntilWatering(plant)
    if (n === -999) return { cls: 'late', text: 'Precisa de rega' }
    if (n < 0) return { cls: 'late', text: `Atrasada ${Math.abs(n)}d` }
    if (n === 0) return { cls: 'soon', text: 'Regar hoje' }
    if (n <= 2) return { cls: 'soon', text: `Em ${n} dia${n > 1 ? 's' : ''}` }
    return { cls: 'ok', text: `Em ${n} dias` }
  }

  function getRelativeLastWatered(date?: Date) {
    if (!date) return 'não registrada'
    const diffDays = Math.round(
      (new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    )
    if (diffDays === 0) return 'hoje'
    if (diffDays === 1) return 'ontem'
    return `há ${diffDays} dias`
  }

  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand" aria-label="Minhas Plantas - início">
          <span className="brand-mark">✿</span>
          <span>Minhas Plantas</span>
        </Link>
        <Link to="/settings" className="icon-button" aria-label="Configurações">
          ⚙
        </Link>
      </header>

      <main className="pb-8">
        <section className="section-heading pt-4">
          <div>
            <p className="eyebrow">SEU JARDIM COMPLETO</p>
            <h2>Todas as plantas</h2>
          </div>
          <span className="text-xs text-[var(--muted)] font-medium">
            {plants.length} {plants.length === 1 ? 'planta' : 'plantas'}
          </span>
        </section>

        {plants.length === 0 ? (
          <div className="text-center py-12 px-4 bg-[#fafbf8] rounded-2xl border border-[var(--line)]">
            <div className="text-5xl mb-3">🪴</div>
            <h3 className="font-heading font-bold text-base text-gray-800 mb-1">
              Nenhuma planta cadastrada
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
              Toque no botão ＋ abaixo para adicionar sua primeira planta com foto!
            </p>
            <Link to="/add" className="primary-button">
              ＋ Adicionar planta
            </Link>
          </div>
        ) : (
          <div className="plant-list">
            {plants.map((plant) => {
              const s = getStatusInfo(plant)
              const species = plant.speciesId
                ? getSpeciesById(plant.speciesId)
                : null

              return (
                <Link
                  key={plant.id}
                  to={`/plant/${plant.id}`}
                  className="plant-card"
                  aria-label={`Ver ${plant.name}`}
                >
                  <div className="plant-avatar">
                    {plant.photoDataUrl ? (
                      <img
                        src={plant.photoDataUrl}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span>{species?.emoji ?? '🌱'}</span>
                    )}
                  </div>

                  <div className="plant-info">
                    <strong>{plant.name}</strong>
                    <span>Regada {getRelativeLastWatered(plant.lastWateredAt)}</span>
                  </div>

                  <span className={`status ${s.cls}`}>{s.text}</span>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
