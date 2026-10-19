import { cx } from '../cx'
import styles from './Formulario.module.css'

export default function Formulario({ className, ...props }) {
  return <form className={cx(styles.formulario, className)} {...props} />
}
