import { profile } from '@/data/profile'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background/70 py-8 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <p>© {new Date().getFullYear()} {profile.shortName}. All rights reserved.</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  )
}
