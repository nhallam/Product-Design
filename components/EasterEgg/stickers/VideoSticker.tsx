'use client'

import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'react-feather'

export default function VideoSticker({ ghost = false }: { ghost?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next
    setMuted(next)
    // Ensure it's playing when unmuting (some browsers pause on interaction)
    if (!next) v.play().catch(() => {})
  }

  return (
    <div
      className="relative bg-[#1C1C1C] shadow-lg w-[220px] overflow-hidden"
      style={{ borderRadius: '5px' }}
    >
      {ghost ? (
        <div className="w-full" style={{ aspectRatio: '16 / 9', background: '#000' }} />
      ) : (
        <>
          <video
            ref={videoRef}
            src="/OG_Tip.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-auto pointer-events-none"
          />
          <button
            onClick={(e) => { e.stopPropagation(); toggleMute() }}
            className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={14} strokeWidth={2} /> : <Volume2 size={14} strokeWidth={2} />}
          </button>
        </>
      )}
    </div>
  )
}
