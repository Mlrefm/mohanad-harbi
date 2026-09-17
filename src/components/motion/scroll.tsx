import { useRef, type ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { cn } from '@/lib/utils'

const spring = { stiffness: 110, damping: 28, restDelta: 0.001 }

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const color = useTransform(progress, range, ['#64748b', '#f8fafc'])
  const opacity = useTransform(progress, [range[0], range[1]], [0.28, 1])

  return (
    <motion.span style={{ color, opacity }} className="inline-block">
      {children}
    </motion.span>
  )
}

export function ScrollWords({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.28'],
  })
  const progress = useSpring(scrollYProgress, spring)
  const words = text.split(' ')

  if (reduce) {
    return <p className={className}>{text}</p>
  }

  return (
    <p
      ref={ref}
      className={cn('flex flex-wrap gap-x-[0.32em] gap-y-[0.18em] leading-relaxed', className)}
    >
      {words.map((word, index) => {
        const start = index / words.length
        const end = Math.min(1, start + 1 / words.length + 0.08)
        return (
          <Word key={`${word}-${index}`} progress={progress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

export function Parallax({
  children,
  className,
  offset = 72,
}: {
  children: ReactNode
  className?: string
  offset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

export function ScrollItem({
  children,
  className,
  from = 44,
  blur = true,
}: {
  children: ReactNode
  className?: string
  from?: number
  blur?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.96', 'start 0.62'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [from, 0])
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(8px)', 'blur(0px)'])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={blur ? { opacity, y, filter } : { opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollFocus({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 0.45, 1], [36, 0, -18])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.38, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.96, 1, 0.985])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      {children}
    </motion.div>
  )
}

export function ScrollChip({
  children,
  progress,
  index,
  total,
  className,
  tintBorder = true,
}: {
  children: ReactNode
  progress: MotionValue<number>
  index: number
  total: number
  className?: string
  tintBorder?: boolean
}) {
  const start = index / Math.max(total, 1)
  const end = Math.min(1, start + 1 / Math.max(total, 1))
  const opacity = useTransform(progress, [start, end], [0.22, 1])
  const y = useTransform(progress, [start, end], [14, 0])
  const border = useTransform(progress, [start, end], ['rgba(30, 41, 59, 1)', 'rgba(174, 243, 63, 0.45)'])

  return (
    <motion.span
      style={tintBorder ? { opacity, y, borderColor: border } : { opacity, y }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
