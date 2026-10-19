import styles from './ListaCards.module.css'

export default function ListaCards({ children }) {
  return <div className={styles.cards}>{children}</div>
}
