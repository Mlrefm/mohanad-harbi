import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
  ...props
}: AnimatedShinyTextProps) {
  return (
    <span
      style={{ '--shiny-width': `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        'animate-shiny-text max-w-md bg-size-[var(--shiny-width)_100%] bg-clip-text bg-no-repeat text-muted-foreground [background-position:0_0]',
        'bg-linear-to-r from-transparent via-white/80 via-50% to-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
