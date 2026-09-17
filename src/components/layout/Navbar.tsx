import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCurrentSection } from '@/hooks/use-active-section'
import { sections } from '@/lib/sections'
import { asset, cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { profile } from '@/data/profile'

const links = sections.filter((section) => section.id !== 'top')

export function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useCurrentSection()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <ScrollProgress />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="#top"
          className={cn(
            'font-mono text-sm font-semibold tracking-wide transition-colors',
            active === 'top' ? 'text-primary' : 'text-primary/80 hover:text-primary',
          )}
        >
          MH
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  'relative text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.nav}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 -bottom-1 h-px bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            )
          })}
          <a href={asset(profile.cv)} download className={cn(buttonVariants({ size: 'sm' }))}>
            Download CV
          </a>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="space-y-2 px-4 py-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block py-2 text-sm',
                    active === link.id ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {link.nav}
                </a>
              ))}
              <a
                href={asset(profile.cv)}
                download
                className={cn(buttonVariants({ size: 'sm' }), 'mt-2')}
              >
                Download CV
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
