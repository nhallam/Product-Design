import type { Campaign } from '@/app/newsletter/campaigns'

export default function NewsletterDetail({ campaign }: { campaign: Campaign }) {
  // Strip the email's own <style> blocks and font-family so it inherits the
  // site's typography and theme colors.
  const html = campaign.content.html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/font-family:[^;}"']+/gi, '')

  const date = new Date(campaign.sent_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <div className="pb-20 px-6 max-w-2xl mx-auto w-full">
      <h1
        className="text-[2.75rem] font-black leading-[1.1] text-balance text-[var(--text)]"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
      >
        {campaign.subject}
      </h1>
      <p className="text-sm text-[var(--muted)] mt-3 mb-10">{date}</p>

      <div
        className="max-w-prose w-full
          [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[var(--text)]
          [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[var(--text)] [&_a:hover]:text-[var(--hover)]
          [&_strong]:font-bold
          [&_em]:italic
          [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul_li]:mb-2 [&_ul_li]:text-base [&_ul_li]:leading-relaxed
          [&_ol]:mb-5 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol_li]:mb-2 [&_ol_li]:text-base [&_ol_li]:leading-relaxed
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-[var(--text)]
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-[10px]
          [&_table]:w-full [&_td]:align-top"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
