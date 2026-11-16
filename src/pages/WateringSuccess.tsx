import { useParams, Link } from 'react-router-dom'
import { usePlant } from '../hooks/usePlants'
import { Check } from 'lucide-react'

export default function WateringSuccess() {
  const { id } = useParams<{ id: string }>()
  const plant = usePlant(Number(id))

  const plantName = plant ? plant.name : 'sua planta'

  return (
    <div className="min-h-[85dvh] flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden">
      {/* Espaço superior */}
      <div />

      {/* Bloco Central de Celebração */}
      <div className="flex flex-col items-center text-center max-w-xs z-10">
        <div className="relative flex items-center justify-center mb-6">
          {/* Gotículas e confetes ao redor do círculo */}
          <span className="absolute -top-3 w-1.5 h-3 bg-emerald-400 rounded-full rotate-12" />
          <span className="absolute -top-1 -right-4 w-2 h-2 bg-amber-300 rounded-full" />
          <span className="absolute top-1/2 -right-5 w-2 h-3.5 bg-teal-400 rounded-full rotate-45" />
          <span className="absolute -bottom-2 -right-3 w-1.5 h-2.5 bg-emerald-400 rounded-full" />
          <span className="absolute -bottom-3 w-2 h-2 bg-amber-300 rounded-full" />
          <span className="absolute -bottom-2 -left-4 w-1.5 h-3.5 bg-teal-400 rounded-full -rotate-45" />
          <span className="absolute top-1/3 -left-5 w-2 h-2 bg-emerald-400 rounded-full" />
          <span className="absolute -top-2 -left-3 w-2 h-3 bg-amber-300 rounded-full -rotate-12" />

          {/* Círculo verde com checkmark */}
          <div className="w-24 h-24 rounded-full bg-[var(--green)] text-white flex items-center justify-center shadow-lg shadow-[var(--green)]/20 ring-6 ring-white">
            <Check className="w-12 h-12 stroke-[3]" />
          </div>
        </div>

        <h1 className="font-heading font-extrabold text-2xl text-[var(--ink)] tracking-tight">
          Rega registrada!
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1.5">
          Sua <strong>{plantName}</strong> está bem cuidada 🌱
        </p>
      </div>

      {/* Ilustração de folhagem e botão de voltar no rodapé */}
      <div className="w-full max-w-xs flex flex-col items-center z-10 pt-4">
        {/* Folhagens suaves decorativas no rodapé */}
        <div className="w-full h-24 opacity-25 pointer-events-none -mb-3 flex justify-center">
          <svg viewBox="0 0 320 120" className="w-full h-full fill-[var(--green)]">
            <path d="M40 120 C20 70, 70 30, 100 50 C130 70, 80 110, 60 120 Z" />
            <path d="M120 120 C100 60, 160 20, 190 50 C210 70, 170 110, 150 120 Z" />
            <path d="M220 120 C190 80, 240 40, 270 60 C300 80, 260 110, 240 120 Z" />
          </svg>
        </div>

        <Link
          to="/"
          className="w-full py-3.5 rounded-2xl bg-[var(--mint)] hover:bg-[#dfeee0] text-[var(--green-dark)] font-bold text-sm shadow-xs text-center border border-[var(--line)] transition-all active:scale-95"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
