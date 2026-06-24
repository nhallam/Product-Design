'use client'

import { useState } from 'react'

function ReferenceImage({ src, alt }: { src?: string; alt: string }) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div className="w-[220px] h-[180px] rounded-[10px] border border-dashed border-[var(--border)] flex items-center justify-center text-center px-4">
        <span className="text-sm text-[var(--faint)]">Reference photo coming soon</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="max-w-[260px] max-h-[280px] w-auto h-auto rounded-[10px] object-cover shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]"
    />
  )
}

export default function StickerRow({
  title,
  description,
  sticker,
  reference,
}: {
  title: string
  description: string
  sticker: React.ReactNode
  reference?: string
}) {
  const [view, setView] = useState<'sticker' | 'reference'>('sticker')

  return (
    <div className="grid grid-cols-2 gap-8 items-center py-12">
      <div>
        <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>
        <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">{description}</p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="inline-flex rounded-full bg-[var(--surface-hover)] p-1 text-sm font-medium">
          {(['sticker', 'reference'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3.5 py-1 rounded-full transition-colors cursor-pointer capitalize ${
                view === v
                  ? 'bg-[var(--text)] text-[var(--bg)]'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center">
          {view === 'sticker' ? sticker : <ReferenceImage src={reference} alt={`${title} reference`} />}
        </div>
      </div>
    </div>
  )
}
