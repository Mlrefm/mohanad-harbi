import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ScrollFocus } from '@/components/motion/scroll'
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { experience } from '@/data/profile'
import { cn } from '@/lib/utils'

function JobCard({
  job,
  index,
  onActive,
}: {
  job: (typeof experience)[number]
  index: number
  onActive: (index: number) => void
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { margin: '-18% 0px -58% 0px' })
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <li ref={ref} className="relative pl-10 md:pl-12">
      <span
        className={cn(
          'absolute top-7 left-1 size-3 rounded-full border-2 border-background bg-muted-foreground/60 transition-all md:left-2',
          inView && 'animate-pulse-dot scale-125 bg-primary',
        )}
      />
      <ScrollFocus>
        <MagicCard className={cn('transition-shadow', inView && 'shadow-[0_0_32px_color-mix(in_oklab,var(--primary)_18%,transparent)]')}>
          <motion.div
            className="p-6"
            animate={
              reduce
                ? undefined
                : {
                    opacity: inView ? 1 : 0.55,
                  }
            }
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{job.role}</h3>
                <p className="text-sm text-primary">
                  {job.org} · {job.place}
                </p>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {job.points.map((point, pointIndex) => (
                <motion.li
                  key={point}
                  className="flex gap-2"
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: 1, x: 0 }
                      : {
                          opacity: inView ? 1 : 0.35,
                          x: inView ? 0 : 12,
                        }
                  }
                  transition={{ duration: 0.35, delay: inView ? pointIndex * 0.05 : 0 }}
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/80" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </MagicCard>
      </ScrollFocus>
    </li>
  )
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.55', 'end 0.55'],
  })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })
  const scaleY = useTransform(line, [0, 1], [0, 1])
  const onActive = useCallback((index: number) => setActive(index), [])
  const current = experience[active] ?? experience[0]

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6"
    >
      <div className="md:grid md:grid-cols-[0.38fr_0.62fr] md:items-start md:gap-12">
        <div className="md:sticky md:top-28 md:self-start">
          <BlurFade>
            <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">
              Career
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight drop-shadow-[0_2px_18px_rgba(2,6,23,0.9)] md:text-4xl">
              Experience
            </h2>
          </BlurFade>
          <motion.div
            key={current.role}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 hidden md:block"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Now reading
            </p>
            <p className="mt-2 text-xl font-semibold text-foreground">{current.role}</p>
            <p className="mt-1 text-sm text-primary">{current.org}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{current.period}</p>
          </motion.div>
        </div>

        <ol className="relative mt-10 space-y-8 md:mt-0">
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[11px] w-px bg-border md:left-[15px]"
          >
            <motion.div
              className="origin-top h-full w-full bg-linear-to-b from-primary to-sky-400"
              style={reduce ? { scaleY: 1 } : { scaleY }}
            />
          </div>
          {experience.map((job, index) => (
            <JobCard key={job.role} job={job} index={index} onActive={onActive} />
          ))}
        </ol>
      </div>
    </section>
  )
}
