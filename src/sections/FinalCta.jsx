import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import { images, waLink } from '../data/site.js'
import ImageSlot from '../components/ImageSlot.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import './FinalCta.css'

export default function FinalCta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const clip = useTransform(scrollYProgress, [0, 0.4], ['inset(12% 8% round 24px)', 'inset(0% 0% round 0px)'])

  return (
    <section className="fcta" ref={ref}>
      <motion.div className="fcta__frame" style={{ clipPath: clip }}>
        <motion.div className="fcta__bg" style={{ y }}>
          <ImageSlot src={images.finalCta} alt="Cliente na cadeira com toalha quente" />
        </motion.div>
        <div className="fcta__veil" />
        <div className="container fcta__content">
          <Reveal as="h2">Sua próxima cadeira<br /><em>já está esperando.</em></Reveal>
          <Reveal as="p" delay={0.1}>Agende agora e garanta seu horário. Encaixes no mesmo dia pelo WhatsApp.</Reveal>
          <Reveal className="fcta__actions" delay={0.2}>
            <Button href="#agenda" icon={CalendarCheck}>Agendar horário</Button>
            <Button href={waLink()} variant="wa" external icon={WhatsAppIcon}>Falar no WhatsApp</Button>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}
