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
          A selection of blog posts from over the years.
        </h1>
      </div>

      <div className="mt-[10vh] divide-y divide-[#E0E0E0]">
        {articleList.map(({ slug, title, date }) => (
          <Link
            key={slug}
            href={`/writing/${slug}`}
            className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[#E8E8E8] transition-colors"
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
