import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { testimonials } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'
import './Testimonials.css'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  const t = testimonials[i]

  return (
    <section className="section testi" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <SectionHeading kicker="Depoimentos" title={<>Quem senta, <em>volta.</em></>} align="center" />

        <div className="testi__stage">
          <Quote className="testi__quote" size={72} strokeWidth={1} />
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="testi__stars">
                {[...Array(t.rating)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
              </div>
              <blockquote>“{t.text}”</blockquote>
              <figcaption>— {t.name}</figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="testi__dots" role="tablist">
            {testimonials.map((_, k) => (
              <button key={k} role="tab" aria-selected={k === i} aria-label={`Depoimento ${k + 1}`} className={k === i ? 'is-active' : ''} onClick={() => setI(k)}>
                {k === i && !paused && <motion.span layoutId="testi-fill" className="fill" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
