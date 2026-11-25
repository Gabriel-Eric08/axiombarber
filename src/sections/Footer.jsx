import { Scissors, ArrowUp } from 'lucide-react'
import Instagram from '../components/InstagramIcon.jsx'
import { brand, nav, waLink } from '../data/site.js'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="footer__logo"><Scissors size={22} strokeWidth={1.5} /> {brand.name}</a>
            <p>{brand.tagline}</p>
            <div className="footer__social">
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={18} /></a>
            </div>
          </div>
          <nav className="footer__nav" aria-label="Rodapé">
            {nav.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="footer__contact">
            <span>{brand.address}</span>
            <span>{brand.phoneLabel}</span>
            <span>{brand.email}</span>
          </div>
        </div>

        <div className="footer__huge" aria-hidden="true">{brand.short}</div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.</span>
          <a href="#top" className="footer__up">Voltar ao topo <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  )
}
