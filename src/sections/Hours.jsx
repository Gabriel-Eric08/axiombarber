import { MapPin, Phone, Mail, Navigation } from 'lucide-react'
import { openingHours, brand } from '../data/site.js'
import { isOpenNow } from '../utils/hours.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import './Hours.css'

export default function Hours() {
  const today = new Date().getDay()
  const status = isOpenNow()
  // Começa a lista na segunda-feira
  const ordered = [...openingHours.slice(1), openingHours[0]].map((h, i) => ({ ...h, idx: (i + 1) % 7 }))

  return (
    <section id="horarios" className="section hours">
      <div className="container hours__grid">
        <div>
          <SectionHeading kicker="Funcionamento" title={<>Horários & <em>localização.</em></>} />
          <Reveal className={`hours__status ${status.open ? 'is-open' : ''}`}>
            <span className="dot" /> {status.label}
          </Reveal>

          <Reveal as="ul" className="hours__list" delay={0.1}>
            {ordered.map((h) => (
              <li key={h.day} className={h.idx === today ? 'is-today' : ''}>
                <span>{h.day}{h.idx === today && <em> · hoje</em>}</span>
                <span className="line" />
                <span className="t">{h.open ? `${h.open} — ${h.close}` : 'Fechado'}</span>
              </li>
            ))}
          </Reveal>

          <Reveal className="hours__contact" delay={0.2}>
            <a href={brand.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={18} /> {brand.address}</a>
            <a href={`tel:+${brand.whatsapp}`}><Phone size={18} /> {brand.phoneLabel}</a>
            <a href={`mailto:${brand.email}`}><Mail size={18} /> {brand.email}</a>
          </Reveal>
        </div>

        <Reveal className="hours__map" delay={0.15}>
          {/* Troque por um <iframe> do Google Maps se preferir */}
          <ImageSlot src={null} alt="Mapa da localização" label="Seu mapa aqui" />
          <div className="hours__mapcard">
            <strong>{brand.name}</strong>
            <span>{brand.address}</span>
            <Button href={brand.mapsUrl} external icon={Navigation}>Como chegar</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
