'use client'

import { useEffect, useRef } from 'react'

interface PrototypeFrameProps {
  src: string
  title: string
  initialHeight?: number
}

// Embeds a self-contained prototype page and sizes the frame to hug its
// content: the prototype's full-viewport stage is collapsed and its vertical
// padding evened out, so there is no scrolling and no dead space below the UI.
// Same-origin only — the injected style and measurement need contentDocument.
export default function PrototypeFrame({ src, title, initialHeight = 900 }: PrototypeFrameProps) {
  const ref = useRef<HTMLIFrameElement>(null)

  const fit = () => {
    const iframe = ref.current
    const doc = iframe?.contentDocument
    const win = iframe?.contentWindow as (Window & typeof globalThis) | null
    if (!iframe || !doc?.body || !win || doc.getElementById('proto-fit')) return

    const style = doc.createElement('style')
    style.id = 'proto-fit'
    style.textContent =
      'html,body{height:auto!important;min-height:0!important;overflow:hidden!important}' +
      'body{padding:32px 16px!important}'
    doc.head.appendChild(style)

    const update = () => {
      // Measure the body, not documentElement — the latter never reports
      // less than the iframe viewport, so the frame could never shrink.
      iframe.style.height = `${Math.ceil(doc.body.getBoundingClientRect().height)}px`
    }
    update()
    // Re-fit when interactions change the prototype's height (expanding
    // inputs, swapped panels, etc.)
    new win.ResizeObserver(update).observe(doc.body)
  }

  // Frames that finish loading before hydration never fire onLoad, so fit
  // any already-loaded document on mount too.
  useEffect(() => {
    const doc = ref.current?.contentDocument
    if (doc?.readyState === 'complete' && doc.location.href !== 'about:blank') fit()
  })

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      loading="lazy"
      scrolling="no"
      onLoad={fit}
      className="w-full rounded-[10px] border border-[var(--border)] bg-white shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]"
      style={{ height: initialHeight }}
    />
  )
}
