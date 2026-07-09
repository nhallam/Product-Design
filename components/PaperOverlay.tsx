'use client'

import { CSSProperties } from 'react'

export type PaperSettings = {
  src: string
  opacity: number // 0..1
  blend: string // mix-blend-mode
  rotate: number // deg
  scale: number // multiplier
  mode: 'cover' | 'tile'
  tile: number // px, tile mode only
  invert: boolean
  brightness: number // 0..2
  radius: number // px, to match the poster corners
}

// A texture layer that sits over a sticker and blends into it. Rendered inside
// a container with `isolation: isolate` so the blend affects only the sticker,
// not the page behind it.
export default function PaperOverlay({ s }: { s: PaperSettings }) {
  // Scale up just enough that rotation never exposes the clipped corners.
  const rad = (s.rotate * Math.PI) / 180
  const coverFactor = Math.abs(Math.sin(rad)) + Math.abs(Math.cos(rad))

  const inner: CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url(${s.src})`,
    backgroundRepeat: s.mode === 'tile' ? 'repeat' : 'no-repeat',
    backgroundSize: s.mode === 'tile' ? `${s.tile}px` : 'cover',
    backgroundPosition: 'center',
    transform: `rotate(${s.rotate}deg) scale(${s.scale * coverFactor})`,
    transformOrigin: 'center',
    filter: `${s.invert ? 'invert(1) ' : ''}brightness(${s.brightness})`,
  }

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: s.radius,
        overflow: 'hidden',
        pointerEvents: 'none',
        mixBlendMode: s.blend as CSSProperties['mixBlendMode'],
        opacity: s.opacity,
      }}
    >
      <div style={inner} />
    </div>
  )
}
