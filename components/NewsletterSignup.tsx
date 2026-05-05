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

  return (
    <div className="py-10 border-t border-[#E0E0E0]">
      <h2
        className="text-[2.75rem] font-black leading-[1] mb-6"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
      >
        Newsletter
      </h2>

      {status === 'success' ? (
        <p className="text-base text-[#1C1C1C]">You&apos;re subscribed. Thanks!</p>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <p className="text-base text-[#1C1C1C] md:w-64 shrink-0">
            Every few weeks I send an email to around 250 people about design, technology and culture.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-1 gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 text-base px-4 py-2 border border-[#E0E0E0] bg-white text-[#1C1C1C] placeholder-[#aaa] focus:outline-none focus:border-[#1C1C1C] transition-colors rounded-l-md"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="text-base px-6 py-2 bg-[#1C1C1C] text-white hover:bg-[#333] transition-colors disabled:opacity-50 cursor-pointer shrink-0 rounded-r-md"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-sm text-red-500 mt-2">{message}</p>
          )}
        </div>
      )}
    </div>
  )
}
