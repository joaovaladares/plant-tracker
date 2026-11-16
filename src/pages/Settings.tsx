import { Link, useNavigate } from 'react-router-dom'
import { useNotifications } from '../hooks/useNotifications'
import { db } from '../db'
import {
  ChevronLeft,
  Bell,
  Sun,
  Info,
  Share2,
  Trash2,
  ChevronRight,
} from 'lucide-react'

export default function Settings() {
  const navigate = useNavigate()
  const { isGranted, request } = useNotifications()

  async function handleToggleNotifications() {
    if (!isGranted) {
      await request()
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minhas Plantas 🌱',
          text: 'Acompanhe a rega das suas plantas com carinho!',
          url: window.location.origin,
        })
      } catch {
        // Cancelado pelo usuário
      }
    } else {
      alert('Link copiado: ' + window.location.origin)
    }
  }

  async function handleReset() {
    if (
      confirm(
        'Tem certeza que deseja apagar todas as plantas e o histórico deste dispositivo?'
      )
    ) {
      await db.plants.clear()
      await db.wateringLogs.clear()
      navigate('/')
    }
  }

  return (
    <div className="py-2 pb-12">
      {/* Topbar com botão voltar */}
      <div className="flex items-center gap-3 py-3 mb-2">
        <Link
          to="/"
          className="icon-button"
          aria-label="Voltar para o início"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading font-bold text-lg text-[var(--ink)] m-0">
          Configurações
        </h1>
      </div>

      <div className="space-y-5">
        {/* Bloco 1: Notificações */}
        <div>
          <p className="eyebrow px-1">NOTIFICAÇÕES</p>
          <div className="bg-white rounded-2xl p-3.5 border border-[var(--line)] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--mint)] text-[var(--green)] flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <strong className="text-xs font-bold text-[var(--ink)] block">
                  Lembretes de rega
                </strong>
                <span className="text-[10px] text-[var(--muted)] block mt-0.5">
                  Avisar quando suas plantas precisarem de água
                </span>
              </div>
            </div>

            {/* Toggle estilo iOS */}
            <button
              type="button"
              onClick={handleToggleNotifications}
              className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer border-0 ${
                isGranted ? 'bg-[var(--green)]' : 'bg-gray-200'
              }`}
              aria-label="Ativar lembretes de rega"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-transform ${
                  isGranted ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bloco 2: Preferências */}
        <div>
          <p className="eyebrow px-1">PREFERÊNCIAS</p>
          <div className="bg-white rounded-2xl p-3.5 border border-[var(--line)] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Sun className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <strong className="text-xs font-bold text-[var(--ink)] block">
                  Unidade de tempo
                </strong>
                <span className="text-[10px] text-[var(--muted)] block mt-0.5">
                  Intervalo dos lembretes de rega
                </span>
              </div>
            </div>

            <span className="text-xs text-[var(--muted)] font-semibold flex items-center gap-0.5">
              Dias <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Bloco 3: Sobre */}
        <div>
          <p className="eyebrow px-1">SOBRE</p>
          <div className="bg-white rounded-2xl border border-[var(--line)] shadow-xs divide-y divide-[var(--line)] overflow-hidden">
            {/* Linha Versão */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[var(--ink)] block">
                    Versão do app
                  </strong>
                  <span className="text-[10px] text-[var(--muted)] block mt-0.5">
                    PWA offline com fotos locais
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[var(--muted)]">1.0.0</span>
            </div>

            {/* Linha Compartilhar */}
            <button
              type="button"
              onClick={handleShare}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50/50 active:bg-slate-50 transition-colors border-0 bg-transparent cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <strong className="text-xs font-bold text-[var(--ink)]">
                  Compartilhar app
                </strong>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            {/* Linha Apagar Dados */}
            <button
              type="button"
              onClick={handleReset}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-50/50 active:bg-rose-50 transition-colors border-0 bg-transparent cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <strong className="text-xs font-bold text-rose-600">
                  Apagar todos os dados
                </strong>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-300" />
            </button>
          </div>
        </div>

        {/* Pílula no Rodapé com a frase carinhosa */}
        <div className="pt-3 flex justify-center">
          <div className="rounded-full bg-[var(--mint)] text-[var(--green-dark)] text-xs font-bold py-3 px-5 shadow-2xs border border-[#dcecdc] flex items-center gap-1.5">
            <span>🌱 Cultive o que te faz bem! 💚</span>
          </div>
        </div>
      </div>
    </div>
  )
}
