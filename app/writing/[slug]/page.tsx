import { notFound } from 'next/navigation'
import { articles } from '../articles'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return {}
  return { title: article.title }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) notFound()

  return (
    <main className="flex-1 flex flex-col px-6 pb-16">
      <div className="pt-[16.8vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] w-full text-center text-balance"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          {article.title}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 text-center">{article.date}</p>
      </div>

      <div
        className="mt-16 max-w-prose mx-auto w-full
          [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[var(--text)]
          [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[var(--text)] [&_a:hover]:text-[var(--hover)]
          [&_strong]:font-bold
          [&_em]:italic
          [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul_li]:mb-2 [&_ul_li]:text-base [&_ul_li]:leading-relaxed [&_ul_li]:text-[var(--text)]
          [&_ol]:mb-5 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol_li]:mb-2 [&_ol_li]:text-base [&_ol_li]:leading-relaxed [&_ol_li]:text-[var(--text)]
          [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--text)]/20 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-5 [&_blockquote]:text-[var(--hover)]
          [&_figure]:my-8
          [&_figure_img]:w-full [&_figure_img]:rounded-sm
          [&_figcaption]:text-sm [&_figcaption]:text-[var(--muted)] [&_figcaption]:mt-2
          [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:my-4 [&_iframe]:rounded-sm
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[var(--text)]
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[var(--text)]"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </main>
  )
}
