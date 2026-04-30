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
      <div className="py-6 border-y border-[#E0E0E0]">
        <p className="text-sm text-[#1C1C1C]">You&apos;re subscribed. Thanks!</p>
      </div>
    )
  }

  return (
    <div className="py-6 border-y border-[#E0E0E0]">
      <p className="text-sm font-medium text-[#1C1C1C] mb-3">Subscribe to my very good newsletter</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 text-sm px-3 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1C1C1C] placeholder-[#aaa] focus:outline-none focus:border-[#1C1C1C] transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="text-sm px-4 py-2 bg-[#1C1C1C] text-white rounded-md hover:bg-[#333] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-sm text-red-500 mt-2">{message}</p>
      )}
    </div>
  )
}
