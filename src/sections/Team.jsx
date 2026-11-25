import { motion } from 'framer-motion'
import Instagram from '../components/InstagramIcon.jsx'
import { barbers, brand } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import './Team.css'

export default function Team() {
  return (
    <section id="equipe" className="section team">
      <div className="container">
        <SectionHeading
          kicker="Equipe"
          title={<>Mãos que <em>sabem o que fazem.</em></>}
          sub="Profissionais com anos de cadeira e reciclagem constante. Escolha o seu ou deixe com a gente."
        />
        <div className="team__grid">
          {barbers.map((b, i) => (
            <motion.article
              key={b.id}
              className="barber"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="barber__img">
                <ImageSlot src={b.img} alt={`Foto de ${b.name}`} label="Foto do barbeiro" />
                <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="barber__ig" aria-label={`Instagram de ${b.name}`}>
                  <Instagram size={18} />
                </a>
              </div>
              <div className="barber__info">
                <h3>{b.name}</h3>
                <p>{b.role}</p>
                <span>{b.years} anos de experiência</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
