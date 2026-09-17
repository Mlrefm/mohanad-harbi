import { useCallback, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientFrom = '#aef33f',
  gradientTo = '#38bdf8',
}: {
  children: ReactNode
  className?: string
  gradientSize?: number
  gradientFrom?: string
  gradientTo?: string
}) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  const handleLeave = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [gradientSize, mouseX, mouseY])

  return (
    <motion.div
      className={cn('group relative overflow-hidden rounded-2xl', className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 70%)`,
      }}
    >
      <div className="relative z-10 h-full rounded-[inherit] bg-card/90">{children}</div>
    </motion.div>
  )
}
