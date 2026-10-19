import { useParams } from 'react-router-dom'
import { buscarPedido } from '../storage'
import Secao from '../components/Secao'
import Botao from '../components/Botao'
import Acoes from '../components/Acoes'

export default function Confirmacao() {
  const { id } = useParams()
  const pedido = buscarPedido(id)

  return (
    <Secao centro>
      <h1>Solicitação enviada</h1>
      <h2>Solicitação #{id}</h2>
      <p>
        Recebemos o seu pedido{pedido?.email ? ` e vamos responder em ${pedido.email}` : ''}. O
        orçamento chega assim que a geometria do modelo for validada.
      </p>
      <Acoes>
        <Botao to="/area-do-cliente">Acompanhar solicitação</Botao>
        <Botao to="/" variante="secundario">Voltar ao início</Botao>
      </Acoes>
    </Secao>
  )
}
