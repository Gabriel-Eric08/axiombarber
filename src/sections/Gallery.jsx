import { useState, useEffect } from 'react'
import Instagram from '../components/InstagramIcon.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { gallery, brand } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import Button from '../components/Button.jsx'
import './Gallery.css'

export default function Gallery() {
  const [idx, setIdx] = useState(null)
  const withImg = gallery.map((g, i) => ({ ...g, i })).filter((g) => g.src)
  const open = idx !== null
  const cur = open ? withImg.findIndex((g) => g.i === idx) : -1

  const go = (dir) => setIdx(withImg[(cur + dir + withImg.length) % withImg.length].i)

  useEffect(() => {
    if (!open) return
    const k = (e) => {
      if (e.key === 'Escape') setIdx(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })

  return (
    <section id="galeria" className="section gallery">
      <div className="container">
        <div className="gallery__head">
          <SectionHeading kicker="Galeria" title={<>Trabalhos <em>recentes.</em></>} />
          <Button href={brand.instagram} variant="ghost" external icon={Instagram}>Ver no Instagram</Button>
        </div>

        <div className="gallery__grid">
          {gallery.map((g, i) => (
            <motion.button
              key={i}
              className={`gitem ${g.tall ? 'gitem--tall' : ''}`}
              onClick={() => g.src && setIdx(i)}
              disabled={!g.src}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              aria-label={g.alt}
            >
              <ImageSlot src={g.src} alt={g.alt} />
              {g.src && <span className="gitem__cap">{g.alt}</span>}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)}>
            <button className="lightbox__close" aria-label="Fechar"><X /></button>
            <button className="lightbox__nav lightbox__nav--l" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); go(-1) }}><ChevronLeft /></button>
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={gallery[idx].src.replace('w=900', 'w=1600')}
                alt={gallery[idx].alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button className="lightbox__nav lightbox__nav--r" aria-label="Próxima" onClick={(e) => { e.stopPropagation(); go(1) }}><ChevronRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
