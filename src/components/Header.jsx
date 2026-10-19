import { Link, NavLink } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'
import { getUsuario } from '../storage'
import styles from './Header.module.css'

export default function Header() {
  const { quantidade } = useCarrinho()
  const logado = getUsuario()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>Hefesto</Link>
      <nav className={styles.nav}>
        <NavLink to="/produtos">Produtos</NavLink>
        <NavLink to="/solucoes">Soluções</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/contato">Contato</NavLink>
        <NavLink to="/carrinho">Carrinho ({quantidade})</NavLink>
        <Link to={logado ? '/area-do-cliente' : '/login'} className={styles.perfil}>
          Perfil
          <svg viewBox="0 0 24 24" width="32" height="32">
            <circle cx="12" cy="12" r="12" fill="#2D2F38" />
            <circle cx="12" cy="9" r="3.5" fill="#ECEEF6" />
            <path d="M5.5 19c.8-3.2 3.5-4.5 6.5-4.5s5.7 1.3 6.5 4.5" fill="#ECEEF6" />
          </svg>
        </Link>
      </nav>
    </header>
  )
}
