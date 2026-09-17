import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { ScrollFocus, ScrollWords } from '@/components/motion/scroll'
import { BlurFade } from '@/components/ui/blur-fade'
import { BrowserFrame } from '@/components/ui/browser-frame'
import { MagicCard } from '@/components/ui/magic-card'
import { ShineBorder } from '@/components/ui/shine-border'
import {
  projects,
  type Project,
  type ProjectCategory,
} from '@/data/profile'
import { asset } from '@/lib/utils'

const filters: ProjectCategory[] = ['All', 'Software', 'Networking', '3D / Design']

function StoryBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-4">
      <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('All')
  const [active, setActive] = useState<Project | null>(null)
  const visible =
    filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [active])

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6">
      <BlurFade>
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">Work</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight drop-shadow-[0_2px_18px_rgba(2,6,23,0.9)] md:text-4xl">Projects</h2>
      </BlurFade>
      <ScrollWords
        text="Each project is here for a reason: the idea, who it helps, and the gap I could not find in other tools."
        className="mt-3 max-w-2xl text-sm drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)] md:text-base"
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all ${
              filter === item
                ? 'bg-primary text-primary-foreground shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_40%,transparent)]'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ delay: index * 0.05 }}
            >
              <ScrollFocus>
                <MagicCard>
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="group relative w-full overflow-hidden rounded-2xl text-left"
                  >
                    <ShineBorder shineColor={['#aef33f', '#22c55e', '#38bdf8']} duration={10} />
                    <img
                      src={asset(project.cover)}
                      alt=""
                      className="aspect-video w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="p-5">
                      <p className="font-mono text-[11px] text-primary">
                        {project.category} · {project.year}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </MagicCard>
              </ScrollFocus>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {active ? (
            <motion.div
              className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-4 pt-16 md:items-center md:pt-4"
              onClick={() => setActive(null)}
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background p-4 md:p-6"
              onClick={(event) => event.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-primary">
                    {active.category} · {active.year}
                  </p>
                  <h3 id="project-title" className="mt-1 text-2xl font-bold">
                    {active.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{active.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-lg p-2 hover:bg-secondary"
                  aria-label="Close project"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-5 grid gap-3">
                <StoryBlock label="The idea" text={active.idea} />
                <StoryBlock label="The benefit" text={active.benefit} />
                <StoryBlock label="Why I built it" text={active.reason} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {active.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                {active.gallery.map((image) => (
                  <BrowserFrame key={image} url={`project://${active.slug}`}>
                    <img src={asset(image)} alt={`${active.title} screenshot`} className="w-full" />
                  </BrowserFrame>
                ))}
              </div>
            </motion.div>
          </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
