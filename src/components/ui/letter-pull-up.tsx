import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export function LetterPullUp({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const letters = text.split('')

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={cn('inline-flex flex-wrap', className)}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.035, duration: 0.45, ease: 'easeOut' }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}
