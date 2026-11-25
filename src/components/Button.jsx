import { motion } from 'framer-motion'
import './Button.css'

export default function Button({ href, children, variant = 'primary', icon: Icon, external, ...rest }) {
  return (
    <motion.a
      href={href}
      className={`btn btn--${variant}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span>{children}</span>
      {Icon && <Icon size={18} strokeWidth={1.8} />}
    </motion.a>
  )
}
