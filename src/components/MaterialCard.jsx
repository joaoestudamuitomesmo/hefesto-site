import { Link } from 'react-router-dom'
import { formatarPreco } from '../storage'
import styles from './MaterialCard.module.css'

export default function MaterialCard({ material }) {
  return (
    <Link to={`/produtos/${material.id}`} className={styles.material}>
      <h3>{material.nome}</h3>
      <span className={styles.tag}>{material.linha === 'virgem' ? 'Virgem' : 'Reciclado'}</span>
      <div className={styles.cores}>
        {material.cores.map(c => (
          <i key={c.nome} title={c.nome} style={{ background: c.hex }} />
        ))}
      </div>
      <p>{formatarPreco(material.precoGrama)} / g</p>
    </Link>
  )
}
