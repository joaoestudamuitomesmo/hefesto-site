import { Link } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'
import { formatarPreco } from '../storage'
import PaginaForm from '../components/PaginaForm'
import ItemLista from '../components/ItemLista'
import Quantidade from '../components/Quantidade'
import Botao from '../components/Botao'
import Titulo from '../components/Titulo'
import styles from './Carrinho.module.css'

export default function Carrinho() {
  const { itens, alterarQtd, remover, total } = useCarrinho()

  return (
    <PaginaForm>
      <Titulo>Carrinho</Titulo>

      {itens.length === 0 && (
        <p>Seu carrinho está vazio. <Link to="/produtos">Ver materiais</Link></p>
      )}

      {itens.map(item => (
        <ItemLista className={styles.item} key={item.chave}>
          <div>
            <h3>{item.nome}</h3>
            <p>{item.cor} · {formatarPreco(item.preco)} / carretel</p>
          </div>
          <Quantidade
            valor={item.qtd}
            onDiminuir={() => alterarQtd(item.chave, item.qtd - 1)}
            onAumentar={() => alterarQtd(item.chave, item.qtd + 1)}
          />
          <Botao variante="link" onClick={() => remover(item.chave)}>Remover</Botao>
        </ItemLista>
      ))}

      {itens.length > 0 && (
        <>
          <p className={styles.total}>Total estimado: {formatarPreco(total)}</p>
          <Botao to="/orcamento">Solicitar orçamento</Botao>
        </>
      )}
    </PaginaForm>
  )
}
