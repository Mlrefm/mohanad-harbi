import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'

type Props = {
  text: string
  brightColor?: string
  dimColor?: string
  maskSize?: number
  intensity?: number
  className?: string
}

export function SpotlightText({
  text,
  brightColor = '#ffffff',
  dimColor = '#64748b',
  maskSize = 160,
  intensity = 12,
  className,
}: Props) {
  const prefersReducedMotion = useReducedMotion()
  const interactive = !prefersReducedMotion
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const maskX = useMotionValue(0)
  const maskY = useMotionValue(0)
  const maskSizeMV = useMotionValue(0)
  const core = Math.max(10, Math.min(100, intensity))
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskSizeMV}px at ${maskX}px ${maskY}px, black, black ${core}%, transparent 100%)`

  useEffect(() => {
    if (!interactive) return
    const el = containerRef.current
    if (!el) return
    const onMove = (e: PointerEvent) => {
      const rect = (contentRef.current ?? el).getBoundingClientRect()
      maskX.set(e.clientX - rect.left)
      maskY.set(e.clientY - rect.top)
    }
    const onEnter = () => {
      animate(maskSizeMV, maskSize, { duration: 0.3 })
    }
    const onLeave = () => {
      animate(maskSizeMV, 0, { duration: 0.3 })
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [interactive, maskSize, maskX, maskY, maskSizeMV])

  useEffect(() => {
    if (interactive) return
    const el = contentRef.current
    maskX.set((el?.clientWidth ?? 720) / 2)
    maskY.set((el?.clientHeight ?? 80) / 2)
    maskSizeMV.set(maskSize)
  }, [interactive, maskSize, maskX, maskY, maskSizeMV])

  return (
    <div ref={containerRef} className={className}>
      <div ref={contentRef} className="relative w-full">
        <p className="m-0 w-full font-bold tracking-tight text-balance" style={{ color: dimColor }}>
          {text}
        </p>
        <motion.p
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 m-0 w-full font-bold tracking-tight text-balance"
          style={{
            color: brightColor,
            WebkitMaskImage: maskImage,
            maskImage,
          }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  )
}
