import { articleList } from './articles'
import { getCampaigns } from '../newsletter/campaigns'
import WritingTabs from '@/components/WritingTabs'

export default async function Writing() {
  const campaigns = await getCampaigns()
  return <WritingTabs articles={articleList} campaigns={campaigns} />
}
