import { GraduationCap, Languages } from 'lucide-react'
import { motion } from 'motion/react'
import { Parallax, ScrollItem, ScrollWords } from '@/components/motion/scroll'
import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { extraProjects, profile } from '@/data/profile'
import { asset } from '@/lib/utils'

export function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6">
      <BlurFade>
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">
          About
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight drop-shadow-[0_2px_18px_rgba(2,6,23,0.9)] md:text-4xl">
          Who I am
        </h2>
      </BlurFade>
      <div className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="grid grid-cols-2 gap-3 overflow-hidden">
          <Parallax offset={48}>
            <motion.img
              whileHover={{ scale: 1.04, rotate: -1.5 }}
              transition={{ type: 'spring', stiffness: 220 }}
              src={asset(profile.photos.graduate)}
              alt="Graduation portrait"
              className="h-64 w-full rounded-2xl object-cover object-[center_20%] md:h-80"
            />
          </Parallax>
          <Parallax offset={88}>
            <motion.img
              whileHover={{ scale: 1.04, rotate: 1.5 }}
              transition={{ type: 'spring', stiffness: 220 }}
              src={asset(profile.photos.portrait)}
              alt="At Radisson Blu Resort & Spa Korek Mountain"
              className="mt-8 h-64 w-full rounded-2xl object-cover object-center md:h-80"
            />
          </Parallax>
        </div>
        <div className="space-y-6 rounded-2xl border border-border/60 bg-background/55 p-5 backdrop-blur-[2px] md:p-6">
          {profile.about.map((paragraph) => (
            <ScrollWords
              key={paragraph}
              text={paragraph}
              className="text-sm md:text-base"
            />
          ))}
          <div className="grid gap-4 pt-2 sm:grid-cols-2">
            <ScrollItem from={28} blur={false}>
              <MagicCard>
                <div className="p-4">
                  <GraduationCap className="mb-2 size-5 text-primary" />
                  <p className="font-medium text-foreground">{profile.education.degree}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profile.education.school} · {profile.education.years}
                  </p>
                </div>
              </MagicCard>
            </ScrollItem>
            <ScrollItem from={40} blur={false}>
              <MagicCard>
                <div className="p-4">
                  <Languages className="mb-2 size-5 text-primary" />
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {profile.languages.map((lang) => (
                      <li key={lang.name}>
                        <span className="text-foreground">{lang.name}</span> — {lang.level}
                      </li>
                    ))}
                  </ul>
                </div>
              </MagicCard>
            </ScrollItem>
          </div>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {profile.stats.map((stat, index) => (
          <ScrollItem key={stat.label} from={24 + index * 8} blur={false}>
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-3xl font-bold text-primary">
                <NumberTicker value={stat.value} />
                {stat.suffix}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          </ScrollItem>
        ))}
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-foreground">Also built</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {extraProjects.map((item, index) => (
            <li key={item.title}>
              <ScrollItem from={28 + index * 10} blur={false}>
                <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </motion.div>
              </ScrollItem>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
