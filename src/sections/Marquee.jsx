import { Scissors } from 'lucide-react'
import './Marquee.css'

const words = ['Corte', 'Barba', 'Navalha', 'Fade', 'Toalha quente', 'Pigmentação', 'Café & Cerveja', 'Visagismo']

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((w, i) => (
          <span key={i} className="marquee__item">
            {w} <Scissors size={18} strokeWidth={1.4} />
          </span>
        ))}
      </div>
    </div>
  )
}
