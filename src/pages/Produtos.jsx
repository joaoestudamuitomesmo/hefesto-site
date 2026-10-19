import { useState } from 'react'
import dados from '../data/materiais.json'
import impressora from '../assets/impressora.png'
import filamentos from '../assets/filamentos.png'
import Card from '../components/Card'
import MaterialCard from '../components/MaterialCard'
import Secao from '../components/Secao'
import Botao from '../components/Botao'
import { Input, Select } from '../components/Campos'
import styles from './Produtos.module.css'

const { materiais } = dados

const todasCores = [...new Set(materiais.flatMap(m => m.cores.map(c => c.nome)))].sort()

export default function Produtos() {
  const [linha, setLinha] = useState('todas')
  const [cor, setCor] = useState('')
  const [busca, setBusca] = useState('')

  const filtrados = materiais.filter(m => {
    if (linha !== 'todas' && m.linha !== linha) return false
    if (cor && !m.cores.some(c => c.nome === cor)) return false
    return m.nome.toLowerCase().includes(busca.toLowerCase())
  })

  return (
    <>
      <Secao centro>
        <Card titulo="Impressão" imagem={impressora}>
          Envie seu modelo para impressão nas melhores impressoras.
        </Card>
        <Botao to="/orcamento">Solicitar orçamento</Botao>
      </Secao>

      <Secao>
        <div className={styles.materiaisBloco}>
          <img src={filamentos} alt="Carretéis de filamento" />
          <div className={styles.materiaisTexto}>
            <h2>Materiais</h2>
            <p>
              Filamentos PLA, PETG, ABS, TPU, Nylon, Fibra de Carbono de alta qualidade para
              qualquer tipo de impressão.
            </p>
          </div>
        </div>
      </Secao>

      <Secao>
        <div className={styles.filtros}>
          <Input placeholder="Buscar material" value={busca} onChange={e => setBusca(e.target.value)} />
          <Select value={linha} onChange={e => setLinha(e.target.value)}>
            <option value="todas">Todas as linhas</option>
            <option value="virgem">Virgem técnica</option>
            <option value="reciclado">Eco-Tech (reciclado)</option>
          </Select>
          <Select value={cor} onChange={e => setCor(e.target.value)}>
            <option value="">Qualquer cor</option>
            {todasCores.map(c => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </div>

        <div className={styles.listaMateriais}>
          {filtrados.map(m => (
            <MaterialCard key={m.id} material={m} />
          ))}
          {filtrados.length === 0 && <p>Nenhum material encontrado.</p>}
        </div>
      </Secao>
    </>
  )
}
