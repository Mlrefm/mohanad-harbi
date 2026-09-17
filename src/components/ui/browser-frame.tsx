import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function BrowserFrame({
  children,
  className,
  url = 'mohanadharbi.dev',
}: {
  children: ReactNode
  className?: string
  url?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card shadow-lg',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/80 px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-background px-3 py-0.5 text-center font-mono text-[11px] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="bg-background">{children}</div>
    </div>
  )
}
