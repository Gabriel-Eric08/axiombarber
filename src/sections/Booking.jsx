import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check, Scissors, User, CalendarDays, Clock } from 'lucide-react'
import { services, barbers, brand, waLink } from '../data/site.js'
import { nextDays, slotsFor, weekdayShort, dayMonth, fullDate } from '../utils/hours.js'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import './Booking.css'

const ease = [0.22, 1, 0.36, 1]
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

function Step({ n, icon: Icon, title, done, children }) {
  return (
    <div className={`bk-step ${done ? 'is-done' : ''}`}>
      <div className="bk-step__head">
        <span className="bk-step__n">{done ? <Check size={14} /> : n}</span>
        <Icon size={16} strokeWidth={1.6} />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Booking() {
  const days = useMemo(() => nextDays(10), [])
  const [service, setService] = useState(null)
  const [barber, setBarber] = useState('any')
  const [day, setDay] = useState(() => days.find((d) => slotsFor(d).some((s) => s.available)) ?? days[0])
  const [time, setTime] = useState(null)
  const [name, setName] = useState('')

  const sectionRef = useRef(null)
  const summaryRef = useRef(null)
  const inView = useInView(sectionRef, { margin: '-30% 0px -30% 0px' })
  const summaryVisible = useInView(summaryRef, { amount: 0.3 })

  const slots = useMemo(() => slotsFor(day), [day])
  const svc = services.find((s) => s.id === service)
  const brb = barbers.find((b) => b.id === barber)

  // Recebe a pré-seleção vinda da seção de Serviços
  useEffect(() => {
    const h = (e) => setService(e.detail)
    window.addEventListener('booking:service', h)
    return () => window.removeEventListener('booking:service', h)
  }, [])

  useEffect(() => setTime(null), [day])

  const ready = svc && time
  const message = ready
    ? [
        `Olá, ${brand.name}! Quero agendar:`,
        `• Serviço: ${svc.name} (${brl(svc.price)})`,
        `• Barbeiro: ${brb ? brb.name : 'Sem preferência'}`,
        `• Data: ${fullDate(day)}`,
        `• Horário: ${time}`,
        name && `• Nome: ${name}`,
      ].filter(Boolean).join('\n')
    : ''

  return (
    <section id="agenda" className="section booking" ref={sectionRef}>
      <div className="container">
        <SectionHeading
          kicker="Agenda online"
          title={<>Escolha seu <em>horário.</em></>}
          sub="Monte seu agendamento em 4 passos e confirme direto no nosso WhatsApp. Sem cadastro, sem app."
        />

        <div className="booking__grid">
          <div className="booking__steps">
            <Step n={1} icon={Scissors} title="Serviço" done={!!svc}>
              <div className="bk-chips">
                {services.map((s) => (
                  <button key={s.id} className={`bk-chip ${service === s.id ? 'is-active' : ''}`} onClick={() => setService(s.id)}>
                    <span>{s.name}</span>
                    <small>{brl(s.price)} · {s.duration}min</small>
                  </button>
                ))}
              </div>
            </Step>

            <Step n={2} icon={User} title="Barbeiro" done={!!barber}>
              <div className="bk-chips bk-chips--row">
                <button className={`bk-chip ${barber === 'any' ? 'is-active' : ''}`} onClick={() => setBarber('any')}>
                  <span>Sem preferência</span>
                </button>
                {barbers.map((b) => (
                  <button key={b.id} className={`bk-chip ${barber === b.id ? 'is-active' : ''}`} onClick={() => setBarber(b.id)}>
                    <span>{b.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step n={3} icon={CalendarDays} title="Dia" done={!!day}>
              <div className="bk-days">
                {days.map((d) => {
                  const closed = slotsFor(d).length === 0
                  const active = d.toDateString() === day.toDateString()
                  return (
                    <button key={d.toISOString()} disabled={closed} className={`bk-day ${active ? 'is-active' : ''}`} onClick={() => setDay(d)}>
                      <small>{weekdayShort(d)}</small>
                      <strong>{d.getDate()}</strong>
                      <small>{closed ? 'fechado' : dayMonth(d).slice(3)}</small>
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step n={4} icon={Clock} title="Horários disponíveis" done={!!time}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={day.toDateString()}
                  className="bk-slots"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease }}
                >
                  {slots.length === 0 && <p className="bk-empty">Fechado neste dia.</p>}
                  {slots.map((s, i) => (
                    <motion.button
                      key={s.time}
                      disabled={!s.available}
                      className={`bk-slot ${time === s.time ? 'is-active' : ''}`}
                      onClick={() => setTime(s.time)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.015 }}
                    >
                      {s.time}
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
              <div className="bk-legend">
                <span><i className="l-free" /> Livre</span>
                <span><i className="l-busy" /> Ocupado</span>
                <span><i className="l-sel" /> Selecionado</span>
              </div>
            </Step>
          </div>

          <aside className="booking__summary" ref={summaryRef}>
            <div className="bk-ticket">
              <span className="bk-ticket__kicker">Seu agendamento</span>
              <dl>
                <div><dt>Serviço</dt><dd>{svc ? svc.name : '—'}</dd></div>
                <div><dt>Barbeiro</dt><dd>{brb ? brb.name : 'Sem preferência'}</dd></div>
                <div><dt>Data</dt><dd className="cap">{fullDate(day)}</dd></div>
                <div><dt>Horário</dt><dd>{time ?? '—'}</dd></div>
              </dl>
              <div className="bk-ticket__total">
                <span>Total</span>
                <AnimatePresence mode="popLayout">
                  <motion.strong key={svc?.id ?? 'none'} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                    {svc ? brl(svc.price) : 'R$ —'}
                  </motion.strong>
                </AnimatePresence>
              </div>

              <label className="bk-input">
                <span>Seu nome (opcional)</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Como podemos te chamar?" />
              </label>

              <motion.a
                href={ready ? waLink(message) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`bk-confirm ${ready ? '' : 'is-disabled'}`}
                aria-disabled={!ready}
                whileHover={ready ? { y: -2 } : {}}
                whileTap={ready ? { scale: 0.97 } : {}}
              >
                <WhatsAppIcon size={20} />
                {ready ? 'Confirmar no WhatsApp' : 'Escolha serviço e horário'}
              </motion.a>
              <p className="bk-note">A confirmação final é feita pela nossa equipe no WhatsApp em poucos minutos.</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Barra fixa no celular: mostra a seleção e confirma sem precisar rolar até o resumo */}
      <AnimatePresence>
        {inView && !summaryVisible && (
          <motion.div
            className="bk-mobilebar"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            exit={{ y: '110%' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="bk-mobilebar__info">
              <strong>{svc ? svc.name : 'Escolha um serviço'}</strong>
              <span>
                {weekdayShort(day)} {dayMonth(day)} · {time ?? 'escolha o horário'}
                {svc && ` · ${brl(svc.price)}`}
              </span>
            </div>
            <a
              href={ready ? waLink(message) : '#agenda'}
              target={ready ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`bk-mobilebar__btn ${ready ? '' : 'is-disabled'}`}
              aria-label={ready ? 'Confirmar no WhatsApp' : 'Complete o agendamento'}
            >
              <WhatsAppIcon size={18} />
              <span>{ready ? 'Confirmar' : 'Agendar'}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
