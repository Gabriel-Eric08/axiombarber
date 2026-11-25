import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { brand, images, stats } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ImageSlot from '../components/ImageSlot.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import './About.css'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 90])

  return (
    <section id="sobre" className="section about" ref={ref}>
      <div className="container about__grid">
        {/* O gatilho de visibilidade fica no wrapper (não no elemento recortado, que teria área visível zero) */}
        <motion.div className="about__media" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.div style={{ y: y1 }} className="about__main">
            <motion.div
              variants={{ hidden: { clipPath: 'inset(100% 0% 0% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)' } }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            >
              <ImageSlot src={images.about} alt="Interior da barbearia" />
            </motion.div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="about__detail">
            <ImageSlot src={images.aboutDetail} alt="Ferramentas de barbeiro" />
          </motion.div>
          <div className="about__badge">
            <span>Desde</span>
            <strong>{brand.since}</strong>
          </div>
        </motion.div>

        <div className="about__text">
          <SectionHeading
            kicker="Sobre nós"
            title={<>Tradição de navalha, <em>olhar de hoje.</em></>}
          />
          <Reveal as="p" className="about__p">
            A {brand.name} nasceu da vontade de resgatar a barbearia como ponto de encontro: um lugar
            onde o corte é feito sem pressa, o café é passado na hora e a conversa é boa.
          </Reveal>
          <Reveal as="p" className="about__p" delay={0.1}>
            Unimos técnicas clássicas — toalha quente, navalha, tesoura — com as tendências de corte
            mais atuais. Cada cliente sai com um visual pensado para o formato do rosto e o estilo de vida.
          </Reveal>

          <div className="about__stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="about__stat">
                <strong><Counter value={s.value} decimals={s.decimals} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
