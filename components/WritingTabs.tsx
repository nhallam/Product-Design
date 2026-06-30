'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'
import ArticleSheet from './ArticleSheet'
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
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const openSheet = (slug: string) => {
    setActiveSlug(slug)
    // Single rAF so the sheet mounts (translate-y-full) before the open class
    // applies and the enter transition plays.
    requestAnimationFrame(() => setSheetOpen(true))
  }

  const closeSheet = () => {
    setSheetOpen(false)
    // Clear the slug after the exit transition finishes (380ms).
    setTimeout(() => setActiveSlug(null), 400)
  }

  // Keep the slug in sync when closed externally (e.g. Escape).
  useEffect(() => {
    if (!sheetOpen && activeSlug) {
      const id = setTimeout(() => setActiveSlug(null), 400)
      return () => clearTimeout(id)
    }
  }, [sheetOpen, activeSlug])

  return (
    <>
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
        <div className="mt-[6vh] divide-y divide-[var(--border)] border-b border-[var(--border)]">
          {articles.map(({ slug, title, date }) => (
            <button
              key={slug}
              onClick={() => openSheet(slug)}
              className="w-full text-left flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-base font-medium text-[var(--text)]">{title}</span>
                {isNew(date) && (
                  <span className="text-xs font-medium bg-[#FF4DE7] text-white px-2 py-0.5 rounded-full">New</span>
                )}
              </span>
              <span className="text-sm text-[var(--muted)] shrink-0 ml-6">{date}</span>
            </button>
          ))}
        </div>
      )}

      {tab === 'newsletter' && (
        <div className="mt-[6vh]">
          <NewsletterSignup />
          <div className="mt-10 divide-y divide-[var(--border)] border-b border-[var(--border)]">
            {campaigns.map((c) => (
              <Link
                key={c.id}
                href={`/newsletter/${c.id}`}
                className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
              >
                <span className="text-base font-medium text-[var(--text)]">{c.subject}</span>
                <span className="text-sm text-[var(--muted)] shrink-0 ml-6">
                  {new Date(c.sent_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>

    {activeSlug && (
      <ArticleSheet slug={activeSlug} open={sheetOpen} onClose={closeSheet} />
    )}
    </>
  )
}
