import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scissors } from 'lucide-react'
import { brand, nav, waLink } from '../data/site.js'
import Button from '../components/Button.jsx'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Fecha o menu se a tela crescer para desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)')
    const h = () => mq.matches && setOpen(false)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label={brand.name}>
          <Scissors size={20} strokeWidth={1.6} />
          <span>{brand.name}</span>
        </a>

        <nav className="nav__links" aria-label="Principal">
          {nav.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__cta">
          <Button href="#agenda" variant="primary">Agendar</Button>
        </div>

        <button className="nav__burger" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}>
          <Menu />
        </button>
      </div>

      {/* Portal: fica fora do header (que tem transform/backdrop-filter e prenderia o position: fixed) */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="nav__mobile"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="nav__mobile-top">
                <a href="#top" className="nav__logo" onClick={() => setOpen(false)}>
                  <Scissors size={20} strokeWidth={1.6} />
                  <span>{brand.name}</span>
                </a>
                <button className="nav__close" onClick={() => setOpen(false)} aria-label="Fechar menu">
                  <X />
                </button>
              </div>

              <nav className="nav__mobile-links">
                {nav.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="nav__mobile-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button href="#agenda" onClick={() => setOpen(false)}>Agendar horário</Button>
                <Button href={waLink()} variant="wa" external>WhatsApp</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  )
}
