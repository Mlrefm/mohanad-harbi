import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LiveButtonProps {
  text: string
  href: string
  className?: string
  download?: boolean
  children?: ReactNode
}

export function LiveButton({
  text,
  href,
  className = '',
  download,
  children,
}: LiveButtonProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      className={cn(
        'group relative inline-flex h-12 min-w-[9.3rem] items-center justify-center gap-3 overflow-hidden rounded-lg border border-border bg-card px-6 transition-all duration-500 hover:scale-[1.03] hover:border-primary/40',
        className,
      )}
    >
      <span className="relative z-10 text-sm font-medium tracking-wide text-foreground transition-colors group-hover:text-primary">
        {children ?? text}
      </span>
      <span className="relative z-10 h-3 w-3 rounded-full bg-cyan-400 transition-transform duration-500 group-hover:scale-125">
        <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-0 group-hover:opacity-60" />
      </span>
    </a>
  )
}
