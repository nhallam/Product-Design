import Link from 'next/link'
import { getCampaigns, formatCampaignDate } from './campaigns'
import NewsletterSignup from '@/components/NewsletterSignup'

export default async function NewsletterPage() {
  const campaigns = await getCampaigns()

  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[16.8vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          Newsletter
        </h1>
      </div>

      <div className="mt-[10vh] divide-y divide-[var(--border)] border-b border-[var(--border)]">
        {campaigns.map((c) => (
          <Link
            key={c.id}
            href={`/newsletter/${c.id}`}
            className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
          >
            <span className="text-base font-medium text-[var(--text)]">{c.subject}</span>
            <span className="text-sm text-[var(--muted)] shrink-0 ml-6">{formatCampaignDate(c.sent_at)}</span>
          </Link>
        ))}
      </div>

      <div id="newsletter" className="mt-[100px]">
        <NewsletterSignup />
      </div>
    </main>
  )
}
