import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { sectionIds, type SectionId } from '@/lib/sections'

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('top')

  useEffect(() => {
    const pick = () => {
      const probe = window.innerHeight * 0.22
      let next: SectionId = 'top'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= probe && rect.bottom > probe) {
          next = id
          break
        }
      }
      setActive(next)
    }

    pick()
    const frame = window.requestAnimationFrame(pick)
    const later = window.setTimeout(pick, 500)
    const observer = new ResizeObserver(pick)
    observer.observe(document.body)
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('hashchange', pick)
    window.addEventListener('resize', pick)
    window.addEventListener('load', pick)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(later)
      observer.disconnect()
      window.removeEventListener('scroll', pick)
      window.removeEventListener('hashchange', pick)
      window.removeEventListener('resize', pick)
      window.removeEventListener('load', pick)
    }
  }, [])

  return active
}

const ActiveSectionContext = createContext<SectionId>('top')

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const active = useActiveSection()
  return <ActiveSectionContext.Provider value={active}>{children}</ActiveSectionContext.Provider>
}

export function useCurrentSection() {
  return useContext(ActiveSectionContext)
}
