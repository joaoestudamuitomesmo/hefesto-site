import styles from './Quantidade.module.css'

export default function Quantidade({ valor, onDiminuir, onAumentar }) {
  return (
    <div className={styles.qtd}>
      <button type="button" onClick={onDiminuir}>-</button>
      <span>{valor}</span>
      <button type="button" onClick={onAumentar}>+</button>
    </div>
  )
}
