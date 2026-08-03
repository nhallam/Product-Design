import { articleList } from './articles'
import { getCampaigns } from '../newsletter/campaigns'
import WritingTabs from '@/components/WritingTabs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles and newsletters on product design, AI and creative tools by Nick Hallam.',
}

export default async function Writing() {
  const campaigns = await getCampaigns()
  return <WritingTabs articles={articleList} campaigns={campaigns} />
}
