import { cx } from '../cx'
import styles from './ItemLista.module.css'

export default function ItemLista({ className, ...props }) {
  return <div className={cx(styles.item, className)} {...props} />
}
