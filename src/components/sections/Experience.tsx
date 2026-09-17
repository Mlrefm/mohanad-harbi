import { BlurFade } from '@/components/ui/blur-fade'
import { MagicCard } from '@/components/ui/magic-card'
import { experience } from '@/data/profile'

export function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6">
      <BlurFade>
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">Career</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight drop-shadow-[0_2px_18px_rgba(2,6,23,0.9)] md:text-4xl">Experience</h2>
      </BlurFade>
      <ol className="relative mt-10 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-linear-to-b before:from-primary before:to-border md:before:left-[15px]">
        {experience.map((job, index) => (
          <BlurFade key={job.role} delay={index * 0.1} direction="left" offset={24}>
            <li className="relative pl-10 md:pl-12">
              <span className="animate-pulse-dot absolute top-7 left-1 size-3 rounded-full bg-primary md:left-2" />
              <MagicCard>
                <div className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-sm text-primary">
                        {job.org} · {job.place}
                      </p>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
                  </div>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </MagicCard>
            </li>
          </BlurFade>
        ))}
      </ol>
    </section>
  )
}
