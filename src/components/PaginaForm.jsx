import { cx } from '../cx'
import Secao from './Secao'
import styles from './PaginaForm.module.css'

export default function PaginaForm({ className, ...props }) {
  return <Secao className={cx(styles.pagina, className)} {...props} />
}
