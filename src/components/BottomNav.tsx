import { Link, useLocation } from 'react-router-dom'
import { Home, History, Sprout } from 'lucide-react'

export default function BottomNav() {
  const { pathname } = useLocation()

  // Oculta a navegação no fluxo de adicionar e na tela de celebração de sucesso
  if (pathname === '/add' || pathname.includes('/success')) {
    return null
  }

  // O botão (+) flutuante de adicionar agora aparece APENAS na aba de plantas
  const showFab = pathname === '/plantas'

  return (
    <>
      <nav className="bottom-nav" aria-label="Navegação principal">
        <Link
          to="/"
          className={`nav-item ${pathname === '/' ? 'active' : ''}`}
        >
          <Home className="nav-item-icon" />
          <span className="nav-item-label">Início</span>
        </Link>
        <Link
          to="/historico"
          className={`nav-item ${pathname === '/historico' ? 'active' : ''}`}
        >
          <History className="nav-item-icon" />
          <span className="nav-item-label">Histórico</span>
        </Link>
        <Link
          to="/plantas"
          className={`nav-item ${pathname === '/plantas' ? 'active' : ''}`}
        >
          <Sprout className="nav-item-icon" />
          <span className="nav-item-label">Plantas</span>
        </Link>
      </nav>

      {/* Botão de adicionar (+) visível exclusivamente na aba de Plantas */}
      {showFab && (
        <Link
          to="/add"
          className="fab"
          aria-label="Adicionar planta"
          title="Adicionar planta"
        >
          ＋
        </Link>
      )}
    </>
  )
}
