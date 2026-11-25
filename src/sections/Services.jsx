import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { services } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'
import './Services.css'

// Dispara um evento para pré-selecionar o serviço na seção de agendamento.
const pick = (id) => window.dispatchEvent(new CustomEvent('booking:service', { detail: id }))

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export default function Services() {
  return (
    <section id="servicos" className="section services">
      <div className="container">
        <div className="services__head">
          <SectionHeading
            kicker="Serviços & preços"
            title={<>O cardápio <em>da casa.</em></>}
            sub="Preços transparentes, sem surpresa no final. Todo serviço inclui café, água ou uma cerveja gelada."
          />
        </div>

        <ul className="services__list">
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              className={`svc ${s.featured ? 'svc--featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#agenda" onClick={() => pick(s.id)} className="svc__link">
                <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="svc__body">
                  <h3>
                    {s.name}
                    {s.featured && <span className="svc__tag">Mais pedido</span>}
                  </h3>
                  <p>{s.desc}</p>
                </div>
                <span className="svc__dur"><Clock size={14} /> {s.duration} min</span>
                <span className="svc__price">{brl(s.price)}</span>
                <span className="svc__arrow"><ArrowUpRight size={22} /></span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
