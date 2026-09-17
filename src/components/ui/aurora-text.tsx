import { memo, type ReactNode } from 'react'

interface AuroraTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(function AuroraText({
  children,
  className = '',
  colors = ['#aef33f', '#38bdf8', '#f8fafc', '#22c55e'],
  speed = 1,
}: AuroraTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.join(', ')}, ${colors[0]})`,
          WebkitBackgroundClip: 'text',
          animationDuration: `${10 / speed}s`,
        }}
      >
        {children}
      </span>
    </span>
  )
})
