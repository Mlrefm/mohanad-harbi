import { Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import { buttonVariants } from '@/components/ui/button'
import { LiveButton } from '@/components/ui/live-button'
import { profile } from '@/data/profile'
import { asset, cn } from '@/lib/utils'

export function Contact() {
  const items = [
    {
      href: `mailto:${profile.email}`,
      label: profile.email,
      icon: <Mail className="size-5 text-primary" />,
    },
    {
      href: profile.linkedin,
      label: 'linkedin.com/in/mohanad-harbi',
      icon: (
        <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56z" />
        </svg>
      ),
      external: true,
    },
    ...profile.phones.map((phone) => ({
      href: `tel:${phone.replace(/\s/g, '')}`,
      label: phone,
      icon: <Phone className="size-5 text-primary" />,
    })),
  ]

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6">
      <BlurFade>
        <p className="font-mono text-xs tracking-[0.2em] text-primary uppercase drop-shadow-[0_2px_12px_rgba(2,6,23,0.9)]">Next step</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight drop-shadow-[0_2px_18px_rgba(2,6,23,0.9)] md:text-4xl">Contact</h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground drop-shadow-[0_2px_14px_rgba(2,6,23,0.9)] md:text-base">
          For IT, networking, or software work in Erbil or remote — email, call, or write on LinkedIn.
        </p>
      </BlurFade>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={'external' in item && item.external ? '_blank' : undefined}
            rel={'external' in item && item.external ? 'noreferrer' : undefined}
            whileHover={{ y: -5, scale: 1.01 }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-primary/40"
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.a>
        ))}
        <motion.div
          whileHover={{ y: -5 }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5"
        >
          <MapPin className="size-5 text-primary" />
          <span>{profile.location}</span>
        </motion.div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <LiveButton text="Email me" href={`mailto:${profile.email}`} />
        <a href={asset(profile.cv)} download className={cn(buttonVariants({ variant: 'outline' }))}>
          Download CV (PDF)
        </a>
      </div>
    </section>
  )
}
