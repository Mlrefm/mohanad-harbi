import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown } from 'lucide-react'

const NetworkWorld = lazy(() =>
  import('@/components/intro/NetworkWorld').then((mod) => ({ default: mod.NetworkWorld })),
)

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function isMobileClient() {
  if (typeof window === 'undefined') return true
  return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
}

function measurePageProgress() {
  const root = document.documentElement
  const total = root.scrollHeight - window.innerHeight
  if (total <= 0) return 0
  return Math.min(1, Math.max(0, window.scrollY / total))
}

class IntroErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
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

function SkipButton({ onSkip }: { onSkip: () => void }) {
  return (
    <button
      type="button"
      data-intro-skip="true"
      aria-label="Skip three-dimensional introduction"
      className="pointer-events-auto absolute top-20 right-4 z-20 rounded-full border border-border/80 bg-[#020617]/80 px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground md:top-[4.75rem] md:right-6"
      onClick={onSkip}
    >
      Skip
    </button>
  )
}

function SceneScrim({ pageProgress }: { pageProgress: MotionValue<number> }) {
  const dimOpacity = useTransform(pageProgress, [0, 0.08, 0.18, 0.55, 1], [0.08, 0.22, 0.42, 0.52, 0.58])

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,#020617_100%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#020617]"
        style={{ opacity: dimOpacity }}
      />
    </>
  )
}

function JourneyHud({
  pageProgress,
  onSkip,
}: {
  pageProgress: MotionValue<number>
  onSkip: () => void
}) {
  const openingOpacity = useTransform(pageProgress, [0, 0.05, 0.11], [1, 0.85, 0])
  const hintOpacity = useTransform(pageProgress, [0, 0.03, 0.08], [1, 0.75, 0])

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <motion.p
        className="absolute top-20 left-4 font-mono text-[10px] tracking-[0.22em] text-sky-300 uppercase md:top-[4.75rem] md:left-7"
        style={{ opacity: openingOpacity }}
      >
        Core · Online
      </motion.p>
      <motion.div
        className="absolute inset-x-0 bottom-10 px-4 text-center md:bottom-14"
        style={{ opacity: openingOpacity }}
      >
        <p className="font-mono text-[10px] tracking-[0.28em] text-sky-300 uppercase">
          Network operations
        </p>
        <motion.p
          className="mt-2 font-mono text-[10px] tracking-wide text-muted-foreground"
          style={{ opacity: hintOpacity }}
        >
          Scroll to travel the network
        </motion.p>
        <motion.span
          className="mt-2 inline-flex justify-center text-muted-foreground"
          style={{ opacity: hintOpacity }}
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
      <SkipButton onSkip={onSkip} />
    </div>
  )
}

function JourneyStage({ onSkip }: { onSkip: () => void }) {
  const scrollRef = useRef(0)
  const pageProgress = useMotionValue(0)
  const mobile = useRef(isMobileClient()).current
  const [live, setLive] = useState(typeof document === 'undefined' || document.visibilityState === 'visible')

  const syncProgress = useCallback(
    (value: number) => {
      const next = Math.min(1, Math.max(0, value))
      scrollRef.current = next
      pageProgress.set(next)
      document.documentElement.setAttribute('data-journey-progress', next.toFixed(3))
    },
    [pageProgress],
  )

  useEffect(() => {
    const onScroll = () => syncProgress(measurePageProgress())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.documentElement.removeAttribute('data-journey-progress')
    }
  }, [syncProgress])

  useEffect(() => {
    const onVis = () => setLive(document.visibilityState === 'visible')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    const prevTouch = document.body.style.touchAction
    document.documentElement.style.overflow = 'visible'
    document.body.style.overflow = 'visible'
    document.body.style.touchAction = 'pan-y'
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      document.body.style.touchAction = prevTouch
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (document.querySelector('[role="dialog"]')) return
      onSkip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSkip])

  return (
    <>
      <div
        data-network-journey="true"
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020617] [touch-action:pan-y]"
      >
        <div className="pointer-events-none absolute inset-0 [touch-action:pan-y]">
          <IntroErrorBoundary onError={onSkip}>
            <Suspense fallback={null}>
              <NetworkWorld
                mobile={mobile}
                scrollRef={scrollRef}
                paused={!live}
              />
            </Suspense>
          </IntroErrorBoundary>
        </div>
        <SceneScrim pageProgress={pageProgress} />
      </div>
      <JourneyHud pageProgress={pageProgress} onSkip={onSkip} />
    </>
  )
}

export function NetworkIntro({ onSkip }: { onSkip: () => void }) {
  const reduce = useReducedMotion() ?? false
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    setWebgl(canUseWebGL())
  }, [])

  const skip = useCallback(() => {
    onSkip()
  }, [onSkip])

  useEffect(() => {
    if (reduce || !webgl) skip()
  }, [reduce, webgl, skip])

  if (reduce || !webgl) return null

  return <JourneyStage onSkip={skip} />
}
