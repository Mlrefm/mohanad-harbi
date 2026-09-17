import { BlurFade } from '@/components/ui/blur-fade'
import { Marquee } from '@/components/ui/marquee'
import { certifications, skillGroups } from '@/data/profile'

export function Skills() {
  const ticker = skillGroups.flatMap((group) => group.items)
  const reverseTicker = [...ticker].reverse()

  return (
    <section id="skills" className="relative z-10 overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <BlurFade>
          <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">Capabilities</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight drop-shadow-[0_2px_18px_rgba(2,6,23,0.9)] md:text-4xl">Skills</h2>
        </BlurFade>
      </div>
      <div className="relative mt-8 space-y-3">
        <Marquee pauseOnHover className="[--duration:42s]">
          {ticker.map((item) => (
            <span
              key={`a-${item}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {item}
            </span>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:48s]">
          {reverseTicker.map((item) => (
            <span
              key={`b-${item}`}
              className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary/80"
            >
              {item}
            </span>
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l to-transparent" />
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-6">
        {skillGroups.map((group, index) => (
          <BlurFade key={group.title} delay={index * 0.05}>
            <article className="h-full rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-1 hover:border-primary/40">
              <h3 className="font-semibold">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-secondary px-2.5 py-1 text-xs text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </BlurFade>
        ))}
        <BlurFade delay={0.25}>
          <article className="h-full rounded-2xl border border-border bg-card p-5">
            <h3 className="font-semibold">Certifications</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </BlurFade>
      </div>
    </section>
  )
}
