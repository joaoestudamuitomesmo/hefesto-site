import { Link, Navigate, useNavigate } from 'react-router-dom'
import { formatarPreco, getUsuario, listarPedidos, sairUsuario } from '../storage'
import PaginaForm from '../components/PaginaForm'
import ItemLista from '../components/ItemLista'
import Botao from '../components/Botao'
import Titulo from '../components/Titulo'
import styles from './AreaCliente.module.css'

export default function AreaCliente() {
  const navigate = useNavigate()
  const usuario = getUsuario()

  if (!usuario) return <Navigate to="/login" />

  const pedidos = listarPedidos()

  function sair() {
    sairUsuario()
    navigate('/')
  }

  return (
    <PaginaForm>
      <div className={styles.topo}>
        <div>
          <Titulo>Olá, {usuario.nome}</Titulo>
          <p>{usuario.email}</p>
        </div>
        <Botao variante="secundario" onClick={sair}>Sair</Botao>
      </div>

      {pedidos.length === 0 && (
        <p>Nenhuma solicitação ainda. <Link to="/orcamento">Pedir orçamento</Link></p>
      )}

      {pedidos.map(p => (
        <ItemLista key={p.id}>
          <div>
            <h3>Solicitação #{p.id}</h3>
            <p>{p.servico} · {p.material} · {p.cor} · {p.quantidade} un.</p>
            {p.estimativa && <p>Estimativa: {formatarPreco(p.estimativa.total)}</p>}
          </div>
          <span className={styles.status}>{p.status}</span>
        </ItemLista>
      ))}
    </PaginaForm>
  )
}
