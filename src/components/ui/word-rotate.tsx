import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function WordRotate({
  words,
  className,
  duration = 2400,
}: {
  words: string[]
  className?: string
  duration?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, duration)
    return () => clearInterval(timer)
  }, [duration, words.length])

  return (
    <span className={cn('relative inline-grid min-h-[1.4em] items-center', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 18, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -18, opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.35 }}
          className="col-start-1 row-start-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
