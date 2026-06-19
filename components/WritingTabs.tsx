'use client'

import { useState } from 'react'
import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'
import type { Campaign } from '@/app/newsletter/campaigns'

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

function isNew(dateStr: string): boolean {
  const [mon, year] = dateStr.split(' ')
  const articleDate = new Date(parseInt(year), MONTHS[mon], 1)
  const threshold = new Date()
  threshold.setMonth(threshold.getMonth() - 3)
  return articleDate >= threshold
}

type Article = { slug: string; title: string; date: string }

interface WritingTabsProps {
  articles: Article[]
  campaigns: Campaign[]
}

export default function WritingTabs({ articles, campaigns }: WritingTabsProps) {
  const [tab, setTab] = useState<'blog' | 'newsletter'>('blog')

  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[28vh] flex justify-center gap-8">
        <button
          onClick={() => setTab('blog')}
          className={`text-[2.75rem] font-black leading-[1.1] transition-opacity cursor-pointer ${tab === 'blog' ? 'opacity-100' : 'opacity-25'}`}
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          Blog
        </button>
        <button
          onClick={() => setTab('newsletter')}
          className={`text-[2.75rem] font-black leading-[1.1] transition-opacity cursor-pointer ${tab === 'newsletter' ? 'opacity-100' : 'opacity-25'}`}
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          Newsletter
        </button>
      </div>

      {tab === 'blog' && (
        <div className="mt-[10vh] divide-y divide-[#E0E0E0] border-b border-[#E0E0E0]">
          {articles.map(({ slug, title, date }) => (
            <Link
              key={slug}
              href={`/writing/${slug}`}
              className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[#E8E8E8] transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-base font-medium text-[#1C1C1C]">{title}</span>
                {isNew(date) && (
                  <span className="text-xs font-medium bg-[#FF4DE7] text-white px-2 py-0.5 rounded-full">New</span>
                )}
              </span>
              <span className="text-sm text-[#888] shrink-0 ml-6">{date}</span>
            </Link>
          ))}
        </div>
      )}

      {tab === 'newsletter' && (
        <div className="mt-[10vh]">
          <NewsletterSignup />
          <div className="mt-10 divide-y divide-[#E0E0E0] border-b border-[#E0E0E0]">
            {campaigns.map((c) => (
              <Link
                key={c.id}
                href={`/newsletter/${c.id}`}
                className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[#E8E8E8] transition-colors"
              >
                <span className="text-base font-medium text-[#1C1C1C]">{c.subject}</span>
                <span className="text-sm text-[#888] shrink-0 ml-6">
                  {new Date(c.sent_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
