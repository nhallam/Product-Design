import Link from 'next/link'
import { articleList } from './articles'
import NewsletterSignup from '@/components/NewsletterSignup'

export default function Writing() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[28vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          Blog Posts
        </h1>
      </div>

      <div className="mt-[10vh] divide-y divide-[#E0E0E0] border-b border-[#E0E0E0]">
        {articleList.map(({ slug, title, date }) => (
          <Link
            key={slug}
            href={`/writing/${slug}`}
            className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[#FF59F3] transition-colors"
          >
            <span className="text-base font-medium text-[#1C1C1C]">{title}</span>
            <span className="text-sm text-[#888] shrink-0 ml-6">{date}</span>
          </Link>
        ))}
      </div>

      <div id="newsletter" className="mt-[100px]">
        <NewsletterSignup />
      </div>
    </main>
  )
}
