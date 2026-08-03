import type { Metadata } from 'next'

// The projects list page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  // Re-declare the template — it doesn't cascade past a layout that sets title
  title: { default: 'Projects', template: '%s — Nick Hallam' },
  description:
    'Selected product design work by Nick Hallam — Gumroad, Tiller hardware, driverless cars, design systems and AI experiments.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
