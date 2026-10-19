import { Link } from 'react-router-dom'
import { cx } from '../cx'
import styles from './Botao.module.css'

// Com `to` renderiza um <Link>, sem `to` renderiza um <button>.
// variante: 'primario' (padrão) | 'secundario' | 'link'
export default function Botao({ to, variante = 'primario', className, ...props }) {
  const classes = cx(styles.botao, variante !== 'primario' && styles[variante], className)

  if (to) return <Link to={to} className={classes} {...props} />
  return <button className={classes} {...props} />
}
