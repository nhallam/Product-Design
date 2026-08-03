'use client'

import Sheet from './Sheet'
import ProjectDetail from './ProjectDetail'

interface ProjectSheetProps {
  slug: string
  open: boolean
  onClose: () => void
}

export default function ProjectSheet({ slug, open, onClose }: ProjectSheetProps) {
  return (
    <Sheet open={open} onClose={onClose} resetKey={slug}>
      <ProjectDetail slug={slug} />
    </Sheet>
  )
}
