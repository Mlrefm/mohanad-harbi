import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Meteors } from '@/components/ui/meteors'
import { Particles } from '@/components/ui/particles'
import { profile } from '@/data/profile'

const chapters = [
  {
    from: 0,
    to: 0.2,
    kicker: '00 · Boot',
    title: 'Core · Online',
    text: 'Scroll to travel the network',
  },
  {
    from: 0.16,
    to: 0.38,
    kicker: '01 · Fabric',
    title: 'Switching core',
    text: 'Cisco · Huawei · MikroTik · UniFi',
  },
  {
    from: 0.34,
    to: 0.56,
    kicker: '02 · Policy',
    title: 'VLANs & ACLs',
    text: 'Guest, staff, and management stay isolated.',
  },
  {
    from: 0.52,
    to: 0.74,
    kicker: '03 · Sites',
    title: 'Hotel + campus',
    text: 'Zero-downtime hospitality. Dual-core campus.',
  },
  {
    from: 0.7,
    to: 0.92,
    kicker: '04 · Identity',
    title: profile.shortName,
    text: 'IT Manager · Network Infrastructure',
  },
  {
    from: 0.88,
    to: 1.05,
    kicker: '05 · Enter',
    title: 'Opening portfolio',
    text: 'Keep scrolling to enter the site',
  },
] as const

const callouts = [
  { from: 0.12, to: 0.34, side: 'left' as const, label: 'CORE', sub: 'UDM · gateway' },
  { from: 0.3, to: 0.52, side: 'right' as const, label: 'VLAN', sub: 'Guest / staff / mgmt' },
  { from: 0.48, to: 0.7, side: 'left' as const, label: 'HOTEL', sub: 'Darin Plaza' },
  { from: 0.66, to: 0.88, side: 'right' as const, label: 'CAMPUS', sub: 'Dual OSPF cores' },
]

const logs = [
  '> link CORE up',
  '> UDM gateway ready',
  '> trunk SW-1 / SW-2',
  '> VLAN 10 staff isolated',
  '> VLAN 20 guest isolated',
  '> ACL deny inter-vlan',
  '> HOTEL PMS on mgmt',
  '> CAMPUS OSPF dual-core',
  '> backup replica online',
  '> identity: M. HARBI',
]

function isMobileClient() {
  if (typeof window === 'undefined') return true
  return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
}

function Chapter({
  progress,
  from,
  to,
  kicker,
  title,
  text,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  kicker: string
  title: string
  text: string
}) {
  const fade = Math.min(0.05, (to - from) * 0.28)
  const startOpacity = from <= 0 ? 1 : 0
  const opacity = useTransform(
    progress,
    [from, from + fade, Math.max(from + fade, to - fade), to],
    [startOpacity, 1, 1, 0],
  )
  const y = useTransform(progress, [from, to], [36, -28])
  const scale = useTransform(progress, [from, from + fade, to], [0.92, 1, 1.06])
  const tracking = useTransform(progress, [from, to], [0.02, 0.08])
  const blur = useTransform(progress, [from, from + fade, to - fade, to], [14, 0, 0, 12])
  const filter = useMotionTemplate`blur(${blur}px)`
  const letterSpacing = useMotionTemplate`${tracking}em`

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-14 px-4 text-center md:bottom-20"
      style={{ opacity, y, scale, filter }}
    >
      <p className="font-mono text-[10px] tracking-[0.32em] text-sky-300 uppercase drop-shadow-[0_0_12px_rgba(56,189,248,0.55)]">
        {kicker}
      </p>
      <motion.p
        className="mt-2 text-3xl font-semibold tracking-tight text-foreground drop-shadow-[0_0_24px_rgba(174,243,63,0.28)] md:text-5xl"
        style={{ letterSpacing }}
      >
        {title}
      </motion.p>
      <p className="mt-3 font-mono text-xs tracking-wide text-muted-foreground md:text-sm">{text}</p>
    </motion.div>
  )
}

function Callout({
  progress,
  from,
  to,
  side,
  label,
  sub,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  side: 'left' | 'right'
  label: string
  sub: string
}) {
  const opacity = useTransform(progress, [from, from + 0.05, to - 0.05, to], [0, 1, 1, 0])
  const x = useTransform(progress, [from, to], side === 'left' ? [-40, 8] : [40, -8])

  return (
    <motion.div
      className={`pointer-events-none absolute top-[40%] hidden max-w-[12rem] md:block ${
        side === 'left' ? 'left-8 text-left' : 'right-8 text-right'
      }`}
      style={{ opacity, x }}
    >
      <div className={`h-px w-16 bg-primary/70 ${side === 'right' ? 'ml-auto' : ''}`} />
      <p className="mt-2 font-mono text-xs tracking-[0.28em] text-primary uppercase drop-shadow-[0_0_10px_var(--primary)]">
        {label}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
    </motion.div>
  )
}

function LogStream({ progress }: { progress: MotionValue<number> }) {
  const count = useTransform(progress, [0.05, 0.9], [1, logs.length])
  const [visible, setVisible] = useState(1)

  useMotionValueEvent(count, 'change', (value) => {
    setVisible(Math.max(1, Math.round(value)))
  })

  return (
    <div className="pointer-events-none absolute bottom-36 left-4 hidden max-w-xs space-y-1 font-mono text-[10px] tracking-wide text-primary/70 md:block md:left-7">
      {logs.slice(0, visible).map((line) => (
        <p key={line} className="drop-shadow-[0_0_8px_rgba(174,243,63,0.35)]">
          {line}
        </p>
      ))}
    </div>
  )
}

function IntroHud({
  progress,
  onSkip,
}: {
  progress: MotionValue<number>
  onSkip: () => void
}) {
  const hintOpacity = useTransform(progress, [0, 0.04, 0.16], [1, 0.85, 0])
  const ring = useSpring(progress, { stiffness: 90, damping: 24 })
  const percent = useTransform(progress, (value) => `${Math.round(value * 100)}`)
  const scan = useTransform(progress, [0, 1], ['-10%', '110%'])
  const scan2 = useTransform(progress, [0, 1], ['110%', '-10%'])
  const glow = useTransform(progress, [0, 0.45, 1], [0.06, 0.16, 0.34])
  const nodes = useTransform(progress, [0, 0.7], [0, 17])
  const vlans = useTransform(progress, [0.2, 0.6], [0, 8])
  const nodesText = useTransform(nodes, (value) => String(Math.round(value)).padStart(2, '0'))
  const vlanText = useTransform(vlans, (value) => String(Math.round(value)).padStart(2, '0'))
  const ringScale = useTransform(progress, [0, 1], [0.55, 1.45])
  const ringRotate = useTransform(progress, [0, 1], [0, 140])
  const ring2Scale = useTransform(progress, [0, 1], [1.2, 0.7])
  const ring2Rotate = useTransform(progress, [0, 1], [40, -80])
  const flash = useTransform(
    progress,
    [0.17, 0.185, 0.2, 0.35, 0.365, 0.38, 0.53, 0.545, 0.56, 0.71, 0.725, 0.74, 0.89, 0.905, 0.92],
    [0, 0.22, 0, 0, 0.22, 0, 0, 0.2, 0, 0, 0.2, 0, 0, 0.28, 0],
  )
  const hue = useTransform(progress, [0, 0.5, 1], [0.12, 0.28, 0.08])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <AnimatedGridPattern
        className="absolute inset-0 text-sky-300/40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_72%)]"
        numSquares={28}
        maxOpacity={0.16}
      />
      <Particles className="absolute inset-0" quantity={70} ease={60} color="#aef33f" size={0.65} />
      <Meteors number={12} />
      <div className="animate-blob absolute -top-24 left-8 h-72 w-72 rounded-full bg-primary/18 blur-3xl" />
      <div
        className="animate-blob absolute right-0 bottom-10 h-80 w-80 rounded-full bg-sky-500/16 blur-3xl"
        style={{ animationDelay: '2s' }}
      />

      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 shadow-[0_0_80px_rgba(174,243,63,0.12)]"
        style={{ scale: ringScale, rotate: ringRotate }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/20"
        style={{ scale: ring2Scale, rotate: ring2Rotate }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left bg-primary shadow-[0_0_22px_var(--primary)]"
        style={{ scaleX: ring }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,#020617_100%)]"
        style={{ opacity: glow }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-primary/20 mix-blend-screen"
        style={{ opacity: hue }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 3px)',
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-28 bg-linear-to-b from-transparent via-primary/25 to-transparent"
        style={{ top: scan }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-16 bg-linear-to-b from-transparent via-sky-400/20 to-transparent"
        style={{ top: scan2 }}
      />
      <motion.div aria-hidden className="absolute inset-0 bg-white" style={{ opacity: flash }} />

      <div className="absolute top-5 left-5 h-8 w-8 border-t border-l border-primary/60 md:top-6 md:left-7" />
      <div className="absolute top-5 right-5 h-8 w-8 border-t border-r border-primary/60 md:top-6 md:right-7" />
      <div className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-sky-400/50 md:bottom-6 md:left-7" />
      <div className="absolute right-5 bottom-5 h-8 w-8 border-r border-b border-sky-400/50 md:right-7 md:bottom-6" />

      <p className="absolute top-6 left-8 font-mono text-[10px] tracking-[0.22em] text-sky-300 uppercase md:top-8 md:left-12">
        Network operations
      </p>

      <div className="absolute top-5 right-4 flex items-center gap-3 md:top-6 md:right-6">
        <div className="hidden items-center gap-3 font-mono text-[10px] tracking-wide text-muted-foreground sm:flex">
          <span>
            NODES <motion.span className="text-primary">{nodesText}</motion.span>
          </span>
          <span>
            VLAN <motion.span className="text-primary">{vlanText}</motion.span>
          </span>
        </div>
        <div className="relative size-11">
          <svg viewBox="0 0 48 48" className="size-11 -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="18" fill="none" stroke="#1e293b" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="#aef33f"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: ring }}
              strokeDasharray="1 1"
            />
          </svg>
          <motion.span className="absolute inset-0 grid place-items-center font-mono text-[9px] text-primary">
            {percent}
          </motion.span>
        </div>
        <button
          type="button"
          data-intro-skip="true"
          aria-label="Skip introduction"
          className="pointer-events-auto rounded-full border border-border/80 bg-[#020617]/80 px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-foreground"
          onClick={onSkip}
        >
          Skip
        </button>
      </div>

      <LogStream progress={progress} />
      {callouts.map((item) => (
        <Callout key={item.label} progress={progress} {...item} />
      ))}
      {chapters.map((item) => (
        <Chapter key={item.kicker} progress={progress} {...item} />
      ))}

      <motion.div
        className="absolute inset-x-0 bottom-5 flex flex-col items-center md:bottom-6"
        style={{ opacity: hintOpacity }}
      >
        <motion.span
          className="text-muted-foreground"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </div>
  )
}

export function NetworkIntro({
  scrollRef,
  onComplete,
}: {
  scrollRef: MutableRefObject<number>
  onComplete: () => void
}) {
  const reduce = useReducedMotion() ?? false
  const scrollerRef = useRef<HTMLDivElement>(null)
  const finishing = useRef(false)
  const mobile = useRef(isMobileClient()).current
  const [exiting, setExiting] = useState(false)
  const { scrollYProgress } = useScroll({ container: scrollerRef })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, restDelta: 0.001 })

  const finish = useCallback(() => {
    if (finishing.current) return
    finishing.current = true
    scrollRef.current = 1
    setExiting(true)
    window.setTimeout(onComplete, 620)
  }, [onComplete, scrollRef])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    scrollRef.current = value
    if (value >= 0.992) finish()
  })

  useEffect(() => {
    if (reduce) onComplete()
  }, [reduce, onComplete])

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  if (reduce) return null

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        ref={scrollerRef}
        className="intro-scroller h-dvh overflow-y-auto overscroll-contain [scrollbar-width:thin]"
      >
        <div className={mobile ? 'h-[360vh]' : 'h-[480vh]'}>
          <div className="sticky top-0 h-dvh overflow-hidden">
            <IntroHud progress={progress} onSkip={finish} />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 bg-[#020617]"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0.28 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
