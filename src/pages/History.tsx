import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAllWateringLogs } from '../hooks/usePlants'
import { formatDayMonth } from '../utils/watering'

type FilterPeriod = 'all' | 'this_month' | 'three_months'

export default function History() {
  const logs = useAllWateringLogs()
  const [period, setPeriod] = useState<FilterPeriod>('all')

  const now = new Date()

  // Aplicação do filtro temporal
  const filteredLogs = (logs ?? []).filter((log) => {
    const logDate = new Date(log.wateredAt)
    if (period === 'this_month') {
      return (
        logDate.getMonth() === now.getMonth() &&
        logDate.getFullYear() === now.getFullYear()
      )
    }
    if (period === 'three_months') {
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(now.getMonth() - 3)
      return logDate >= threeMonthsAgo
    }
    return true
  })

  function getRelativeText(date: Date) {
    const diffDays = Math.round(
      (new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    )
    if (diffDays === 0) return 'Regada hoje'
    if (diffDays === 1) return 'Regada ontem'
    return `Regada há ${diffDays} dias`
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
        <section className="section-heading pt-2">
          <div>
            <p className="eyebrow">SEU JARDIM</p>
            <h2>Histórico de regas</h2>
          </div>
          <span className="text-xs text-[var(--muted)] font-medium">
            {filteredLogs.length} {filteredLogs.length === 1 ? 'registro' : 'registros'}
          </span>
        </section>

        {/* Filtros Temporais em Pílulas */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setPeriod('all')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
              period === 'all'
                ? 'bg-[var(--green)] text-white border-[var(--green)] shadow-xs'
                : 'bg-white text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => setPeriod('this_month')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
              period === 'this_month'
                ? 'bg-[var(--green)] text-white border-[var(--green)] shadow-xs'
                : 'bg-white text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            Este mês
          </button>
          <button
            type="button"
            onClick={() => setPeriod('three_months')}
            className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
              period === 'three_months'
                ? 'bg-[var(--green)] text-white border-[var(--green)] shadow-xs'
                : 'bg-white text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]'
            }`}
          >
            Últimos 3 meses
          </button>
        </div>

        {/* Linha do Tempo (Timeline) com Fotos Pequenas */}
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 px-4 bg-[#fafbf8] rounded-2xl border border-[var(--line)]">
            <div className="text-4xl mb-2">💧</div>
            <h3 className="font-heading font-bold text-sm text-gray-800 mb-1">
              Nenhuma rega encontrada
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              {period === 'all'
                ? 'Assim que você regar uma planta e registrar, o histórico aparecerá aqui.'
                : 'Nenhum registro para o período selecionado.'}
            </p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-3.5 before:absolute before:left-[13px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[var(--line)]">
            {filteredLogs.map((log) => {
              const date = new Date(log.wateredAt)

              return (
                <div key={log.id} className="relative flex items-center gap-3">
                  {/* Foto da planta pequena na timeline (28px) */}
                  <div className="w-7 h-7 rounded-full bg-[var(--mint)] border-2 border-white shadow-2xs overflow-hidden flex items-center justify-center flex-shrink-0 -ml-6 z-10">
                    {log.photoDataUrl ? (
                      <img
                        src={log.photoDataUrl}
                        alt={log.plantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[12px] leading-none">💧</span>
                    )}
                  </div>

                  {/* Card com os dados da rega */}
                  <div className="bg-white rounded-xl p-2.5 px-3 border border-[var(--line)] shadow-2xs flex-1 flex items-center justify-between min-w-0">
                    <div className="min-w-0 mr-2">
                      <strong className="text-xs font-bold text-[var(--ink)] block truncate">
                        {log.plantName}
                      </strong>
                      <span className="text-[10px] text-[var(--muted)] block mt-0.5">
                        {getRelativeText(date)}
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-gray-500 bg-[#f8faf7] px-2 py-0.5 rounded-md border border-[var(--line)] flex-shrink-0">
                      {formatDayMonth(date)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
