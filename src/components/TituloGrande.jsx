import styles from './TituloGrande.module.css'

export default function TituloGrande({ children }) {
  return <h2 className={styles.grande}>{children}</h2>
}
