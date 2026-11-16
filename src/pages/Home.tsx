import { Link } from 'react-router-dom'
import { usePlants } from '../hooks/usePlants'
import { getDaysUntilWatering, getCurrentSeason } from '../utils/watering'
import { getSpeciesById } from '../data/speciesHints'

export default function Home() {
  const plants = usePlants()
  const season = getCurrentSeason()

  // Formata data de hoje por extenso em maiúsculas (ex: "DOMINGO, 15 DE NOVEMBRO")
  const todayLabel = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
    .format(new Date())
    .toUpperCase()

  // Plantas precisando de atenção (atrasadas ou para regar hoje)
  const duePlants = plants.filter((p) => getDaysUntilWatering(p) <= 0)
  const dueCount = duePlants.length

  // Dica dinâmica com base na estação e cuidados reais
  const seasonTip =
    season === 'summer'
      ? 'Estamos no verão: com temperaturas mais altas e evaporação rápida, confira a umidade do solo com maior frequência.'
      : 'No inverno, o crescimento desacelera e a terra demora mais para secar. Espaçe mais as regas para evitar fungos nas raízes.'

  // Helper de status idêntico ao protótipo que o usuário gostou
  function getStatusInfo(plant: (typeof plants)[0]) {
    const n = getDaysUntilWatering(plant)
    if (n === -999) {
      return { cls: 'late', text: 'Precisa de rega' }
    }
    if (n < 0) {
      return { cls: 'late', text: `Atrasada ${Math.abs(n)}d` }
    }
    if (n === 0) {
      return { cls: 'soon', text: 'Regar hoje' }
    }
    if (n <= 2) {
      return { cls: 'soon', text: `Em ${n} dia${n > 1 ? 's' : ''}` }
    }
    return { cls: 'ok', text: `Em ${n} dias` }
  }

  function getRelativeLastWatered(date?: Date) {
    if (!date) return 'ainda não registrada'
    const diffDays = Math.round(
      (new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    )
    if (diffDays === 0) return 'hoje'
    if (diffDays === 1) return 'ontem'
    return `há ${diffDays} dias`
  }

  // Ordena por urgência (atrasadas primeiro)
  const sortedPlants = [...plants].sort(
    (a, b) => getDaysUntilWatering(a) - getDaysUntilWatering(b)
  )

  return (
    <>
      {/* Topbar com marca e botão de configurações */}
      <header className="topbar">
        <Link to="/" className="brand" aria-label="Minhas Plantas - início">
          <span className="brand-mark">✿</span>
          <span>Minhas Plantas</span>
        </Link>
        <Link
          to="/settings"
          className="icon-button"
          aria-label="Configurações"
          title="Configurações"
        >
          ⚙
        </Link>
      </header>

      <main>
        {/* Seção de Boas-Vindas */}
        <section className="welcome">
          <div>
            <p className="eyebrow">{todayLabel}</p>
            <h1>
              Cuide bem do<br />
              seu <em>cantinho verde.</em>
            </h1>
            <p className="subtle">Um pouquinho de cuidado faz diferença.</p>
          </div>
          <div className="welcome-plant" aria-hidden="true">
            🌿
          </div>
        </section>

        {/* Card Resumo de Atenção Hoje */}
        <Link
          to={dueCount > 0 ? `/plant/${duePlants[0].id}` : '/plantas'}
          className="summary-card"
          aria-label="Resumo das regas"
        >
          <div className="summary-icon">💧</div>
          <div className="summary-copy">
            <span className="summary-label">Atenção hoje</span>
            <strong>
              {dueCount === 0
                ? '0 plantas'
                : `${dueCount} ${dueCount === 1 ? 'planta' : 'plantas'}`}
            </strong>
            <span className="summary-note">
              {dueCount === 0
                ? 'Tudo tranquilo por aqui.'
                : 'Podem estar precisando de água.'}
            </span>
          </div>
          <span className="summary-arrow">✦</span>
        </Link>

        {/* Cabeçalho da Seção */}
        <section className="section-heading">
          <div>
            <p className="eyebrow">ROTINA DE CUIDADOS</p>
            <h2>Suas plantas</h2>
          </div>
          {plants.length > 0 && (
            <Link to="/plantas" className="text-button">
              Ver todas <span>→</span>
            </Link>
          )}
        </section>

        {/* Lista de Plantas (com fotos reais das suas plantas) */}
        {plants.length === 0 ? (
          <div className="text-center py-10 px-4 bg-[#fafbf8] rounded-2xl border border-[var(--line)]">
            <div className="text-5xl mb-3">🪴</div>
            <h3 className="font-heading font-bold text-base text-gray-800 mb-1">
              Seu jardim começa aqui
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto mb-4">
              Tire uma foto das suas plantas e adicione para acompanhar as próximas regas.
            </p>
            <Link to="/add" className="primary-button">
              ＋ Adicionar planta
            </Link>
          </div>
        ) : (
          <div className="plant-list">
            {sortedPlants.map((plant) => {
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
                  {/* Foto real da sua planta em avatar proporcional */}
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

                  {/* Informações da planta */}
                  <div className="plant-info">
                    <strong>{plant.name}</strong>
                    <span>Regada {getRelativeLastWatered(plant.lastWateredAt)}</span>
                  </div>

                  {/* Status Pill com cores correspondentes */}
                  <span className={`status ${s.cls}`}>{s.text}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Card de Dicas de Rega Reais */}
        <section className="tip-card">
          <span className="tip-icon">☀️</span>
          <div>
            <strong>Dica de rega para hoje</strong>
            <p>{seasonTip}</p>
          </div>
        </section>
      </main>
    </>
  )
}
