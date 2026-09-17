import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface BlurInTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'p'
}

export function BlurInText({ text, className = '', as = 'h1' }: BlurInTextProps) {
  const reduce = useReducedMotion()
  const classes = cn('font-bold tracking-tight', className)

  if (reduce) {
    if (as === 'p') return <p className={classes}>{text}</p>
    if (as === 'h2') return <h2 className={classes}>{text}</h2>
    return <h1 className={classes}>{text}</h1>
  }

  const animation = {
    initial: { filter: 'blur(10px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
    transition: { duration: 1 },
    className: classes,
    children: text,
  }

  if (as === 'p') return <motion.p {...animation} />
  if (as === 'h2') return <motion.h2 {...animation} />
  return <motion.h1 {...animation} />
}
