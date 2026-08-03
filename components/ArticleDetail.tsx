import { articles } from '@/app/writing/articles'

export default function ArticleDetail({ slug }: { slug: string }) {
  const article = articles[slug]

  if (!article) {
    return (
      <div className="pb-20 px-6 max-w-2xl mx-auto w-full">
        <p className="text-base text-[var(--muted)]">Article not found.</p>
      </div>
    )
  }

  return (
    <div className="pb-20 px-6 max-w-2xl mx-auto w-full">
      <h1
        className="text-[2.75rem] font-black leading-[1.1] text-balance text-[var(--text)]"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
      >
        {article.title}
      </h1>
      <p className="text-sm text-[var(--muted)] mt-3 mb-10">{article.date}</p>

      <div
        className="max-w-prose w-full
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
    </div>
  )
}
