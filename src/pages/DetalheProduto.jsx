import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dados from '../data/materiais.json'
import filamentos from '../assets/filamentos.png'
import { useCarrinho } from '../context/CarrinhoContext'
import { formatarPreco } from '../storage'
import Secao from '../components/Secao'
import Botao from '../components/Botao'
import Acoes from '../components/Acoes'
import Quantidade from '../components/Quantidade'
import { Select } from '../components/Campos'
import styles from './DetalheProduto.module.css'

export default function DetalheProduto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { adicionar } = useCarrinho()
  const material = dados.materiais.find(m => m.id === id)

  const [cor, setCor] = useState(material?.cores[0].nome)
  const [qtd, setQtd] = useState(1)

  if (!material) return <Secao><p>Material não encontrado.</p></Secao>

  const precoCarretel = material.precoGrama * 1000

  function adicionarAoCarrinho() {
    adicionar({ id: material.id, nome: material.nome, cor, qtd, preco: precoCarretel })
    navigate('/carrinho')
  }

  return (
    <Secao className={styles.detalhe}>
      <img src={filamentos} alt={material.nome} />
      <div className={styles.info}>
        <h1>{material.nome}</h1>
        <p>{material.descricao}</p>

        <label>
          Cor
          <Select value={cor} onChange={e => setCor(e.target.value)}>
            {material.cores.map(c => (
              <option key={c.nome}>{c.nome}</option>
            ))}
          </Select>
        </label>

        <div className={styles.campo}>
          <span>Qtd (carretéis de 1 kg)</span>
          <Quantidade
            valor={qtd}
            onDiminuir={() => setQtd(q => Math.max(1, q - 1))}
            onAumentar={() => setQtd(q => q + 1)}
          />
        </div>

        <strong className={styles.preco}>{formatarPreco(precoCarretel * qtd)}</strong>

        <Acoes>
          <Botao onClick={adicionarAoCarrinho}>Adicionar ao carrinho</Botao>
          <Botao to="/orcamento" variante="secundario">Solicitar orçamento</Botao>
        </Acoes>
      </div>
    </Secao>
  )
}
