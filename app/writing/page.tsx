const articles = [
  {
    slug: 'article-one',
    title: 'Article title goes here',
    date: 'Jan 2024',
    description: 'A short description of what this piece is about.',
  },
  {
    slug: 'article-two',
    title: 'Article title goes here',
    date: 'Dec 2023',
    description: 'A short description of what this piece is about.',
  },
  {
    slug: 'article-three',
    title: 'Article title goes here',
    date: 'Nov 2023',
    description: 'A short description of what this piece is about.',
  },
]

export default function Writing() {
  return (
    <main className="px-6 pb-20">
      <h1 className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 mt-24 mb-16 max-w-xs">
        Writing
      </h1>

      <div className="flex flex-col divide-y divide-[#ccc] max-w-sm">
        {articles.map((article) => (
          <a key={article.slug} href={`/writing/${article.slug}`} className="group py-6">
            <p className="text-sm text-[#888] mb-1">{article.date}</p>
            <h2 className="text-base font-black underline underline-offset-2 group-hover:text-[#555] transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-[#666] mt-1">{article.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-20 max-w-sm">
        <h2 className="text-xl font-black mb-4">Newsletter</h2>
        <p className="text-sm text-[#666] mb-4">
          Occasional thoughts on design, technology, and making things. No spam.
        </p>
        <form className="flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent border border-[#bbb] text-sm px-3 py-2 rounded-sm outline-none focus:border-[#888] placeholder:text-[#aaa]"
          />
          <button
            type="submit"
            className="text-sm font-bold px-4 py-2 bg-[#1C1C1C] text-[#f0f0f0] hover:bg-[#333] transition-colors rounded-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </main>
  )
}
