import { cx } from '../cx'
import styles from './Secao.module.css'

export default function Secao({ centro, className, children, ...props }) {
  return (
    <section className={cx(styles.secao, centro && styles.centro, className)} {...props}>
      {children}
    </section>
  )
}
