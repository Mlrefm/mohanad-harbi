import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function CursorGlow() {
  const reduce = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return
    const move = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reduce])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 hidden h-72 w-72 rounded-full bg-primary/12 blur-3xl md:block"
      animate={{ x: pos.x - 144, y: pos.y - 144 }}
      transition={{ type: 'spring', stiffness: 80, damping: 22, mass: 0.6 }}
    />
  )
}
