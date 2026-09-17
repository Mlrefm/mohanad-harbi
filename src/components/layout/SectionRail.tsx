import { motion } from 'motion/react'
import { useCurrentSection } from '@/hooks/use-active-section'
import { sections } from '@/lib/sections'

const links = sections.filter((section) => section.id !== 'top')

export function SectionRail() {
  const active = useCurrentSection()

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="pointer-events-auto space-y-3">
        {links.map((section, index) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <a href={`#${section.id}`} className="group flex items-center justify-end gap-3">
                <span
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground/0 group-hover:text-muted-foreground'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} {section.rail}
                </span>
                <span className="relative flex size-2.5 items-center justify-center">
                  {isActive ? (
                    <motion.span
                      layoutId="section-rail-dot"
                      className="absolute size-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]"
                    />
                  ) : (
                    <span className="size-1.5 rounded-full bg-muted-foreground/50 group-hover:bg-foreground" />
                  )}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
