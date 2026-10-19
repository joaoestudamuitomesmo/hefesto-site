import { cx } from '../cx'
import styles from './Campos.module.css'

export const Input = ({ className, ...props }) => (
  <input className={cx(styles.campo, className)} {...props} />
)

export const Select = ({ className, ...props }) => (
  <select className={cx(styles.campo, className)} {...props} />
)

export const Textarea = ({ className, ...props }) => (
  <textarea className={cx(styles.campo, className)} {...props} />
)
