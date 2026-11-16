import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SPECIES_HINTS } from '../data/speciesHints'
import { compressImage } from '../utils/imageUtils'
import { getRecommendedInterval, getCurrentSeason } from '../utils/watering'
import { addPlant } from '../hooks/usePlants'

export default function AddPlant() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [speciesId, setSpeciesId] = useState('')
  const [frequency, setFrequency] = useState(7)
  const [lastWatered, setLastWatered] = useState(
    () => new Date().toISOString().split('T')[0]
  )
  const [notes, setNotes] = useState('')
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const season = getCurrentSeason()
  const selectedSpecies = SPECIES_HINTS.find((s) => s.id === speciesId)

  function handleSpeciesChange(id: string) {
    setSpeciesId(id)
    if (id) {
      setFrequency(getRecommendedInterval(id))
    }
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const compressed = await compressImage(file, 800, 0.8)
      setPhotoDataUrl(compressed)
    } catch {
      setError('Não foi possível carregar a imagem. Tente outra foto.')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Por favor, informe o nome da planta.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const wateredDate = lastWatered
        ? new Date(lastWatered + 'T12:00:00')
        : new Date()

      await addPlant({
        name: name.trim(),
        speciesId: speciesId || undefined,
        photoDataUrl: photoDataUrl ?? undefined,
        intervalDays: Number(frequency),
        notificationsEnabled: true,
        notes: notes.trim() || undefined,
        addedAt: new Date(),
        lastWateredAt: wateredDate,
      })
      navigate('/')
    } catch {
      setError('Erro ao salvar a planta.')
      setLoading(false)
    }
  }

  return (
    <div className="py-2">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="eyebrow">NOVO CANTINHO VERDE</p>
          <h2 className="font-heading font-bold text-xl text-gray-900 m-0">
            Adicionar planta
          </h2>
        </div>
        <Link
          to="/"
          className="icon-button"
          aria-label="Fechar"
        >
          ×
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Foto Real da sua Planta */}
        <div className="flex flex-col items-center py-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-28 h-28 rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--mint2)] hover:bg-[var(--mint)] flex flex-col items-center justify-center gap-1.5 overflow-hidden transition-all active:scale-95"
          >
            {photoDataUrl ? (
              <img
                src={photoDataUrl}
                alt="Prévia da foto"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <span className="text-3xl">📷</span>
                <span className="text-[10px] font-bold text-[var(--green)]">
                  Tirar foto real
                </span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handlePhotoChange}
          />
          {photoDataUrl && (
            <button
              type="button"
              onClick={() => setPhotoDataUrl(null)}
              className="text-[11px] text-rose-500 font-semibold mt-1.5"
            >
              Remover foto
            </button>
          )}
        </div>

        {/* Nome */}
        <div>
          <label className="block text-xs font-bold text-[var(--ink)] mb-1">
            Nome da planta
          </label>
          <input
            type="text"
            required
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Jiboia da sala"
            className="w-full border border-[#e4eae2] rounded-xl p-3 text-sm bg-[#fcfdfb] outline-none focus:border-[var(--green)]"
          />
        </div>

        {/* Espécie para Dicas de Rega */}
        <div>
          <label className="block text-xs font-bold text-[var(--ink)] mb-1">
            Tipo / Espécie <span className="font-normal text-[var(--muted)]">(para dicas de rega)</span>
          </label>
          <select
            value={speciesId}
            onChange={(e) => handleSpeciesChange(e.target.value)}
            className="w-full border border-[#e4eae2] rounded-xl p-3 text-sm bg-[#fcfdfb] outline-none focus:border-[var(--green)]"
          >
            <option value="">Selecione para receber dicas...</option>
            {SPECIES_HINTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.emoji} {s.commonName}
              </option>
            ))}
          </select>
        </div>

        {/* Dica da Espécie Selecionada */}
        {selectedSpecies && (
          <div className="p-3 bg-[var(--mint2)] rounded-xl border border-[#e4ede3] text-xs space-y-1">
            <p className="font-bold text-[var(--green-dark)]">
              💡 Recomendação para {selectedSpecies.commonName}:
            </p>
            <p className="text-[11px] text-gray-600">
              {selectedSpecies.wateringSummary} (sugerido: {season === 'summer' ? selectedSpecies.wateringDays.summer : selectedSpecies.wateringDays.winter} dias no {season === 'summer' ? 'verão' : 'inverno'}).
            </p>
          </div>
        )}

        {/* Frequência de Rega */}
        <div>
          <label className="block text-xs font-bold text-[var(--ink)] mb-1">
            Frequência de rega <span className="font-normal text-[var(--muted)]">em dias</span>
          </label>
          <input
            type="number"
            min={1}
            max={90}
            required
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full border border-[#e4eae2] rounded-xl p-3 text-sm bg-[#fcfdfb] outline-none focus:border-[var(--green)]"
          />
        </div>

        {/* Última Rega */}
        <div>
          <label className="block text-xs font-bold text-[var(--ink)] mb-1">
            Última rega
          </label>
          <input
            type="date"
            required
            value={lastWatered}
            onChange={(e) => setLastWatered(e.target.value)}
            className="w-full border border-[#e4eae2] rounded-xl p-3 text-sm bg-[#fcfdfb] outline-none focus:border-[var(--green)]"
          />
        </div>

        {/* Observações */}
        <div>
          <label className="block text-xs font-bold text-[var(--ink)] mb-1">
            Observações <span className="font-normal text-[var(--muted)]">opcional</span>
          </label>
          <textarea
            rows={2}
            maxLength={180}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex.: gosta de luz indireta, vaso de barro"
            className="w-full border border-[#e4eae2] rounded-xl p-3 text-sm bg-[#fcfdfb] outline-none focus:border-[var(--green)] resize-none"
          />
        </div>

        {error && <p className="text-xs text-rose-500 font-bold">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="primary-button w-full mt-2"
        >
          {loading ? 'Salvando...' : 'Adicionar ao meu jardim'}
        </button>
      </form>
    </div>
  )
}
