import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export default function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setN })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref}>
      {n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
