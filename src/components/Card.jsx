import styles from './Card.module.css'

export default function Card({ titulo, imagem, children }) {
  return (
    <div className={styles.card}>
      <h3>{titulo}</h3>
      <div className={styles.imagem}>{imagem && <img src={imagem} alt="" />}</div>
      <p>{children}</p>
    </div>
  )
}
