import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { NetworkIntro } from '@/components/intro/NetworkIntro'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SectionRail } from '@/components/layout/SectionRail'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { CursorGlow } from '@/components/ui/cursor-glow'
import { ActiveSectionProvider } from '@/hooks/use-active-section'

const NetworkWorld = lazy(() =>
  import('@/components/intro/NetworkWorld').then((mod) => ({ default: mod.NetworkWorld })),
)

function shouldStartOnSite() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  const hash = window.location.hash
  return Boolean(hash && hash !== '#' && hash !== '#top')
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function isMobileClient() {
  return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
}

class WorldErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function Site({ cinematic }: { cinematic: boolean }) {
  return (
    <ActiveSectionProvider>
      <motion.div
        className={
          cinematic
            ? 'relative min-h-svh bg-transparent text-foreground'
            : 'relative min-h-svh bg-background text-foreground'
        }
        initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <CursorGlow />
        <motion.div
          initial={{ y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Navbar />
        </motion.div>
        <SectionRail />
        <main className="relative z-10">
          <Hero cinematic={cinematic} />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </ActiveSectionProvider>
  )
}

export default function App() {
  const reduce = useReducedMotion() ?? false
  const scrollRef = useRef(shouldStartOnSite() ? 1 : 0)
  const mobile = useRef(typeof window !== 'undefined' && isMobileClient()).current
  const [intro, setIntro] = useState(() => !shouldStartOnSite())
  const [webgl, setWebgl] = useState(true)
  const [live, setLive] = useState(true)
  const showWorld = webgl && !reduce

  useEffect(() => {
    setWebgl(canUseWebGL())
  }, [])

  useEffect(() => {
    const onVis = () => setLive(document.visibilityState === 'visible')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const finishIntro = useCallback(() => {
    setIntro(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const dropWorld = useCallback(() => setWebgl(false), [])

  return (
    <>
      {showWorld ? (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020617]" aria-hidden>
          <WorldErrorBoundary onError={dropWorld}>
            <Suspense fallback={<div className="h-full w-full bg-[#020617]" />}>
              <NetworkWorld
                mobile={mobile}
                scrollRef={scrollRef}
                paused={!live}
                followPage={!intro}
              />
            </Suspense>
          </WorldErrorBoundary>
        </div>
      ) : null}
      {intro && showWorld ? (
        <>
          <CursorGlow />
          <NetworkIntro scrollRef={scrollRef} onComplete={finishIntro} />
        </>
      ) : (
        <Site cinematic={showWorld} />
      )}
    </>
  )
}
