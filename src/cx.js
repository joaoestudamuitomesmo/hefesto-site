// junta classes ignorando valores vazios: cx(styles.a, cond && styles.b, className)
export const cx = (...classes) => classes.filter(Boolean).join(' ')
