import { notFound } from 'next/navigation'
import { getCampaigns, formatCampaignDate } from '../campaigns'

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const campaigns = await getCampaigns()
  const campaign = campaigns.find((c) => c.id === id)

  if (!campaign) notFound()

  const html = campaign.content.html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/font-family:[^;}"']+/gi, '')

  return (
    <main className="flex-1 flex flex-col px-6 pb-16">
      <div className="pt-[16.8vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] w-full text-center text-balance"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          {campaign.subject}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 text-center">{formatCampaignDate(campaign.sent_at)}</p>
      </div>

      <div
        className="mt-16 max-w-prose mx-auto w-full
          [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-[var(--text)]
          [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-[var(--text)] [&_a:hover]:text-[var(--hover)]
          [&_strong]:font-bold
          [&_em]:italic
          [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul_li]:mb-2 [&_ul_li]:text-base [&_ul_li]:leading-relaxed
          [&_ol]:mb-5 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol_li]:mb-2 [&_ol_li]:text-base [&_ol_li]:leading-relaxed
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-[10px]
          [&_table]:w-full [&_td]:align-top"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
