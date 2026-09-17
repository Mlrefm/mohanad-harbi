import { ArrowDown } from 'lucide-react'
import { motion } from 'motion/react'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { AuroraText } from '@/components/ui/aurora-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { buttonVariants } from '@/components/ui/button'
import { LiveButton } from '@/components/ui/live-button'
import { Meteors } from '@/components/ui/meteors'
import { Particles } from '@/components/ui/particles'
import { SparklesText } from '@/components/ui/sparkles-text'
import { TiltCard } from '@/components/ui/tilt-card'
import { WordRotate } from '@/components/ui/word-rotate'
import { profile } from '@/data/profile'
import { asset, cn } from '@/lib/utils'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay, duration: 0.7, ease: 'easeOut' as const },
  }),
}

export function Hero({ cinematic = false }: { cinematic?: boolean }) {
  return (
    <section
      id="top"
      className={cn(
        'relative isolate min-h-svh overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24',
        cinematic && 'bg-transparent pb-28 md:pb-32',
      )}
    >
      {cinematic ? null : (
        <>
          <div className="animate-blob absolute -top-24 left-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div
            className="animate-blob absolute top-40 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
            style={{ animationDelay: '2s' }}
          />
          <AnimatedGridPattern
            className="absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
            numSquares={36}
            maxOpacity={0.18}
          />
          <Particles className="absolute inset-0 z-0" quantity={90} ease={70} color="#aef33f" size={0.7} />
          <Meteors number={16} />
        </>
      )}

      <div
        className={cn(
          'relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6',
          cinematic ? 'md:grid-cols-1' : 'md:grid-cols-[1.15fr_0.85fr]',
        )}
      >
        <div className={cinematic ? 'max-w-3xl drop-shadow-[0_2px_18px_rgba(2,6,23,0.85)]' : undefined}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1"
          >
            <AnimatedShinyText className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
              {profile.location} · Open to IT roles
            </AnimatedShinyText>
          </motion.div>

          <h1 className="text-4xl leading-tight font-bold md:text-6xl">
            <SparklesText className="text-4xl md:text-6xl">
              <AuroraText className="text-4xl leading-tight md:text-6xl" speed={1.4}>
                {profile.name}
              </AuroraText>
            </SparklesText>
          </h1>

          <motion.p
            custom={0.12}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-xl text-lg font-medium text-muted-foreground md:text-xl"
          >
            <WordRotate
              words={[
                'IT Manager',
                'Network Infrastructure Specialist',
                'Hospitality IT Expert',
                'Systems & Security',
              ]}
            />
          </motion.p>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            custom={0.28}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_45%,transparent)]',
              )}
            >
              View projects
            </a>
            <LiveButton text="Download CV" href={asset(profile.cv)} download />
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Contact me
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <ArrowDown className="size-4" />
              </motion.span>
            </a>
          </motion.div>
        </div>

        {cinematic ? null : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <TiltCard className="animate-float">
              <div className="relative overflow-hidden rounded-3xl border border-border">
                <BorderBeam size={90} duration={6} borderWidth={2} />
                <img
                  src={asset(profile.photos.graduate)}
                  alt={`${profile.shortName} at Catholic University in Erbil graduation, 2025`}
                  className="aspect-[3/4] w-full object-cover object-[center_18%]"
                />
              </div>
            </TiltCard>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              B.Sc. Information Technology · CUE 2025
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
