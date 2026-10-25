import { formatarPreco } from '../storage'
import styles from './ResumoPreco.module.css'

// estado: { tipo: 'analisando' | 'manual' | 'erro' | 'ok', mensagem?, calculo? }
export default function ResumoPreco({ estado }) {
  if (!estado) return null

  if (estado.tipo === 'analisando') {
    return <div className={styles.resumo}><p>Analisando o modelo 3D…</p></div>
  }

  if (estado.tipo !== 'ok') {
    return (
      <div className={styles.resumo}>
        <h3>Orçamento sob análise</h3>
        <p>{estado.mensagem}</p>
      </div>
    )
  }

  const { calculo } = estado
  return (
    <div className={styles.resumo}>
      <h3>Estimativa de preço</h3>
      <p className={styles.dims}>
        Peça: {calculo.dims.map(d => d.toFixed(1).replace('.', ',')).join(' × ')} mm. Confira se as medidas
        estão certas; se não, ajuste a unidade do arquivo.
      </p>

      <ul className={styles.linhas}>
        {calculo.linhas.map(l => (
          <li key={l.rotulo}>
            <span>{l.rotulo}</span>
            <span>{formatarPreco(l.valor)}</span>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        <span>Total ({calculo.quantidade} un.)</span>
        <strong>{formatarPreco(calculo.total)}</strong>
      </div>
      {calculo.quantidade > 1 && <p className={styles.dims}>{formatarPreco(calculo.unitario)} por peça</p>}

      {calculo.avisos.map(a => (
        <p key={a} className={styles.aviso}>{a}</p>
      ))}
      <p className={styles.aviso}>
        Valor estimado a partir da geometria. O orçamento final é confirmado após a validação do modelo.
      </p>
    </div>
  )
}
