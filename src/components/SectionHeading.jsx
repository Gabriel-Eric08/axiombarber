import Reveal from './Reveal.jsx'
import './SectionHeading.css'

export default function SectionHeading({ kicker, title, sub, align = 'left' }) {
  return (
    <div className={`sh sh--${align}`}>
      <Reveal as="span" className="sh__kicker">{kicker}</Reveal>
      <Reveal as="h2" className="sh__title" delay={0.08}>{title}</Reveal>
      {sub && <Reveal as="p" className="sh__sub" delay={0.16}>{sub}</Reveal>}
    </div>
  )
}
