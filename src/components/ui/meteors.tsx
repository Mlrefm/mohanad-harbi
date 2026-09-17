import { useEffect, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export function Meteors({
  number = 18,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 8,
  angle = 215,
  className,
}: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<CSSProperties[]>([])

  useEffect(() => {
    setMeteorStyles(
      Array.from({ length: number }, () => ({
        '--angle': `${-angle}deg`,
        top: '-5%',
        left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
        animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
        animationDuration: `${Math.floor(Math.random() * (maxDuration - minDuration) + minDuration)}s`,
      })),
    )
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={cn(
            'animate-meteor pointer-events-none absolute size-0.5 rounded-full bg-primary shadow-[0_0_0_1px_#ffffff10]',
            className,
          )}
        >
          <span className="pointer-events-none absolute top-1/2 -z-10 h-px w-14 -translate-y-1/2 bg-linear-to-r from-primary to-transparent" />
        </span>
      ))}
    </>
  )
}
