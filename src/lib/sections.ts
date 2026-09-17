export const sections = [
  { id: 'top', nav: 'Intro', rail: 'Intro' },
  { id: 'about', nav: 'About', rail: 'About' },
  { id: 'experience', nav: 'Experience', rail: 'Career' },
  { id: 'skills', nav: 'Skills', rail: 'Skills' },
  { id: 'projects', nav: 'Projects', rail: 'Work' },
  { id: 'contact', nav: 'Contact', rail: 'Contact' },
] as const

export const sectionIds = sections.map((section) => section.id)

export type SectionId = (typeof sections)[number]['id']
