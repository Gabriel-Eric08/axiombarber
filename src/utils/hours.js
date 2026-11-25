import { openingHours, slotMinutes } from '../data/site.js'

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const toHHMM = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

export function isOpenNow(now = new Date()) {
  const today = openingHours[now.getDay()]
  const cur = now.getHours() * 60 + now.getMinutes()
  if (today.open && cur >= toMin(today.open) && cur < toMin(today.close)) {
    return { open: true, label: `Aberto agora · até ${today.close}` }
  }
  // procura a próxima abertura
  for (let i = 0; i < 7; i++) {
    const d = (now.getDay() + i) % 7
    const h = openingHours[d]
    if (!h.open) continue
    if (i === 0 && cur >= toMin(h.open)) continue
    const when = i === 0 ? 'hoje' : i === 1 ? 'amanhã' : h.day.toLowerCase()
    return { open: false, label: `Fechado · abre ${when} às ${h.open}` }
  }
  return { open: false, label: 'Fechado' }
}

/** Próximos `count` dias (incluindo hoje). */
export function nextDays(count = 7, from = new Date()) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + i)
    return d
  })
}

// Gera ocupação "fake" determinística por data — substitua por uma API real.
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/**
 * Retorna os horários do dia: [{ time: '09:00', available: boolean }]
 * Para integrar com um backend, troque esta função por um fetch.
 */
export function slotsFor(date, now = new Date()) {
  const h = openingHours[date.getDay()]
  if (!h.open) return []
  const rand = seeded(date.getFullYear() * 1000 + date.getMonth() * 40 + date.getDate())
  const isToday = date.toDateString() === now.toDateString()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const out = []
  for (let m = toMin(h.open); m + slotMinutes <= toMin(h.close); m += slotMinutes) {
    const past = isToday && m <= nowMin + 15
    out.push({ time: toHHMM(m), available: !past && rand() > 0.35 })
  }
  return out
}

export const weekdayShort = (d) => d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
export const dayMonth = (d) => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
export const fullDate = (d) => d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
