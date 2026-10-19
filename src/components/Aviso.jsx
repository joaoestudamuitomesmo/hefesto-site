import styles from './Aviso.module.css'

export default function Aviso({ children }) {
  return <p className={styles.aviso}>{children}</p>
}
