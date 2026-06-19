export type Campaign = {
  id: string
  subject: string
  sent_at: string
  content: { html: string }
}

export async function getCampaigns(): Promise<Campaign[]> {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY
  const res = await fetch(
    `https://emailoctopus.com/api/1.6/campaigns?api_key=${apiKey}&limit=100`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data.data as Campaign[])
    .filter((c: Campaign & { status: string }) => (c as unknown as { status: string }).status === 'SENT')
    .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime())
}

export function formatCampaignDate(isoDate: string): string {
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
