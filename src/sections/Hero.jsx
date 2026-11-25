import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarCheck, Star } from 'lucide-react'
import { brand, images, waLink } from '../data/site.js'
import Button from '../components/Button.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { isOpenNow } from '../utils/hours.js'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]
const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: 0, transition: { duration: 1.1, delay: 0.3 + i * 0.12, ease } }),
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const status = isOpenNow()

  return (
    <section id="top" className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ y: imgY, scale: imgScale }}>
        <ImageSlot src={images.hero} alt="Barbeiro finalizando um corte" />
      </motion.div>
      <div className="hero__veil" />

      <motion.div className="container hero__content" style={{ y: textY, opacity: fade }}>
        <motion.div
          className={`hero__status ${status.open ? 'is-open' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
        >
          <span className="dot" /> {status.label}
        </motion.div>

        <h1 className="hero__title">
          {['Corte de', 'respeito.', 'Barba de lei.'].map((t, i) => (
            <span className="mask" key={t}>
              <motion.span custom={i} variants={line} initial="hidden" animate="show" className={i === 1 ? 'italic' : ''}>
                {t}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
        >
          {brand.tagline} Desde {brand.since} cuidando do visual de quem não tem tempo a perder.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease }}
        >
          <Button href="#agenda" icon={CalendarCheck}>Agendar horário</Button>
          <Button href={waLink()} variant="ghost" external icon={WhatsAppIcon}>WhatsApp</Button>
        </motion.div>

        <motion.div
          className="hero__proof"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
          <span><strong>4,9</strong> no Google · +800 avaliações</span>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-label="Rolar para baixo"
      >
        <span />
      </motion.a>
    </section>
  )
}
