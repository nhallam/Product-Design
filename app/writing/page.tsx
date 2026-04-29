const articles = [
  { slug: 'article-one',   title: 'Article title goes here', date: 'Jan 2025' },
  { slug: 'article-two',   title: 'Article title goes here', date: 'Nov 2024' },
  { slug: 'article-three', title: 'Article title goes here', date: 'Sep 2024' },
  { slug: 'article-four',  title: 'Article title goes here', date: 'Jun 2024' },
  { slug: 'article-five',  title: 'Article title goes here', date: 'Mar 2024' },
]

export default function Writing() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[28vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          I&apos;m a product designer and founder living in Brooklyn, NY.
        </h1>
      </div>

      <div className="mt-[10vh] divide-y divide-[#E0E0E0]">
        {articles.map(({ slug, title, date }) => (
          <a
            key={slug}
            href={`/writing/${slug}`}
            className="flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg hover:bg-[#E8E8E8] transition-colors cursor-pointer"
          >
            <span className="text-base font-medium text-[#1C1C1C]">{title}</span>
            <span className="text-sm text-[#888] shrink-0 ml-6">{date}</span>
          </a>
        ))}
      </div>
    </main>
  )
}
