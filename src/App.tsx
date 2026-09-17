import { useCallback, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { NetworkIntro } from '@/components/intro/NetworkIntro'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { CursorGlow } from '@/components/ui/cursor-glow'

export default function App() {
  const reduce = useReducedMotion() ?? false
  const [skipped, setSkipped] = useState(false)
  const showJourney = !skipped && !reduce

  const skipJourney = useCallback(() => {
    setSkipped(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div
      className={
        showJourney
          ? 'relative min-h-svh bg-transparent text-foreground'
          : 'relative min-h-svh bg-background text-foreground'
      }
    >
      {showJourney ? <NetworkIntro onSkip={skipJourney} /> : null}
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero cinematic={showJourney} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
