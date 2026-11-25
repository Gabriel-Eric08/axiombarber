import { motion } from 'framer-motion'
import { waLink } from '../data/site.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import './WhatsAppFloat.css'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="wafloat"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="wafloat__pulse" />
      <WhatsAppIcon size={28} />
      <span className="wafloat__tip">Agende pelo WhatsApp</span>
    </motion.a>
  )
}
