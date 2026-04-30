'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Something went wrong.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-lg px-4 py-3 border border-[#E0E0E0]">
        <p className="text-sm text-[#1C1C1C]">You&apos;re subscribed. Thanks!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg px-4 py-3 border border-[#E0E0E0]">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <span className="text-sm font-medium text-[#1C1C1C] shrink-0">Newsletter sign up</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-48 text-sm px-3 py-1.5 border border-[#E0E0E0] rounded-md bg-white text-[#1C1C1C] placeholder-[#aaa] focus:outline-none focus:border-[#1C1C1C] transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="text-sm px-3 py-1.5 bg-[#1C1C1C] text-white rounded-md hover:bg-[#333] transition-colors disabled:opacity-50 cursor-pointer shrink-0"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  )
}
