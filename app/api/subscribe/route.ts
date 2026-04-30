import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.EMAILOCTOPUS_API_KEY
  const listId = process.env.EMAILOCTOPUS_LIST_ID

  if (!apiKey || !listId) {
    console.error('Missing env vars:', { apiKey: !!apiKey, listId: !!listId })
    return NextResponse.json({ error: `Missing config: apiKey=${!!apiKey} listId=${!!listId}` }, { status: 500 })
  }

  const res = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey, email_address: email, status: 'subscribed' }),
  })

  const data = await res.json()

  if (!res.ok) {
    const code = data?.error?.code
    if (code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      return NextResponse.json({ error: "You're already subscribed!" }, { status: 400 })
    }
    console.error('EmailOctopus error:', JSON.stringify(data))
    return NextResponse.json({ error: data?.error?.message ?? 'Something went wrong. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
