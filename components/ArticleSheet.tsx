'use client'

import Sheet from './Sheet'
import ArticleDetail from './ArticleDetail'

interface ArticleSheetProps {
  slug: string
  open: boolean
  onClose: () => void
}

export default function ArticleSheet({ slug, open, onClose }: ArticleSheetProps) {
  return (
    <Sheet open={open} onClose={onClose} resetKey={slug}>
      <ArticleDetail slug={slug} />
    </Sheet>
  )
}
