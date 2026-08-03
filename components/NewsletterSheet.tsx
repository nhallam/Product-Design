'use client'

import Sheet from './Sheet'
import NewsletterDetail from './NewsletterDetail'
import type { Campaign } from '@/app/newsletter/campaigns'

interface NewsletterSheetProps {
  campaign: Campaign
  open: boolean
  onClose: () => void
}

export default function NewsletterSheet({ campaign, open, onClose }: NewsletterSheetProps) {
  return (
    <Sheet open={open} onClose={onClose} resetKey={campaign.id}>
      <NewsletterDetail campaign={campaign} />
    </Sheet>
  )
}
