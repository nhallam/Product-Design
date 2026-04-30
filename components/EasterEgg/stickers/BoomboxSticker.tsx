'use client'

import { useEffect, useRef, useState } from 'react'

const TRACKS = [
  { id: 'd2FQCRvigBU' },
  { id: 'e4oB6wYMcrI' },
  { id: 'aygY5OqMuKE' },
]

interface YTPlayer {
  destroy(): void
  pauseVideo(): void
  playVideo(): void
  loadVideoById(id: string): void
  getVideoData(): { title: string; author: string }
}

interface YTEvent {
  target: YTPlayer
  data: number
}

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement, config: object) => YTPlayer
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

const EQ_HEIGHTS = [40, 90, 55, 100, 70, 85, 45, 75]

export default function BoomboxSticker() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackInfo, setTrackInfo] = useState<{ title: string; author: string } | null>(null)
  const [ready, setReady] = useState(false)
  const playerRef = useRef<YTPlayer | null>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    const initPlayer = () => {
      if (!playerDivRef.current) return
      playerRef.current = new window.YT.Player(playerDivRef.current, {
        height: '1',
        width: '1',
        videoId: TRACKS[0].id,
        playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: (event: YTEvent) => {
            setReady(true)
            const data = event.target.getVideoData()
            if (data.title) setTrackInfo({ title: data.title, author: data.author })
          },
          onStateChange: (event: YTEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true)
              const data = event.target.getVideoData()
              if (data.title) setTrackInfo({ title: data.title, author: data.author })
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false)
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer() }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }

    return () => { playerRef.current?.destroy(); playerRef.current = null }
  }, [])

  const togglePlay = () => {
    if (!ready || !playerRef.current) return
    if (isPlaying) { playerRef.current.pauseVideo() } else { playerRef.current.playVideo() }
  }

  const nextTrack = () => {
    if (!ready || !playerRef.current) return
    const next = (currentIndexRef.current + 1) % TRACKS.length
    currentIndexRef.current = next
    playerRef.current.loadVideoById(TRACKS[next].id)
    setIsPlaying(true)
  }

  const speaker = (
    <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#111', border: '2px solid #383838', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #2d2d2d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2d2d2d' }} />
        </div>
      </div>
    </div>
  )

  const reel = (
    <div
      className={isPlaying ? 'animate-spin' : ''}
      style={{ width: 17, height: 17, borderRadius: '50%', border: '2px solid #4a4a4a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animationDuration: '3s' }}
    >
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4a4a4a' }} />
    </div>
  )

  return (
    <div style={{ position: 'relative', width: 200 }}>
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <div ref={playerDivRef} />
      </div>

      {/* Antenna */}
      <div style={{ position: 'absolute', width: 2, height: 26, background: '#555', borderRadius: 1, top: -22, right: 38, transform: 'rotate(12deg)', transformOrigin: 'bottom center' }} />
      <div style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: '#555', top: -24, right: 36.5 }} />

      {/* Body */}
      <div style={{ background: '#1e1e1e', borderRadius: 14, padding: '7px 6px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', border: '1px solid #333' }}>

        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
          <div style={{ height: 4, width: 38, background: '#2e2e2e', borderRadius: 2, border: '1px solid #3a3a3a' }} />
        </div>

        {/* Speakers + center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {speaker}

          {/* Center panel */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Cassette window */}
            <div style={{ background: '#0c0c0c', borderRadius: 5, border: '1px solid #3a3a3a', padding: '4px 5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {reel}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ height: 1, background: '#3a3a3a' }} />
                  <div style={{ height: 1, background: '#3a3a3a' }} />
                </div>
                {reel}
              </div>
            </div>

            {/* Track name */}
            <div style={{ fontSize: 7, color: '#4ade80', fontFamily: 'monospace', lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {trackInfo?.title ?? (ready ? 'READY' : 'LOADING...')}
            </div>

            {/* EQ bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 8 }}>
              {EQ_HEIGHTS.map((h, i) => (
                <div key={i} style={{ flex: 1, height: isPlaying ? `${h}%` : '15%', background: isPlaying ? '#4ade80' : '#252525', borderRadius: 1, transition: 'height 0.4s ease, background 0.3s ease' }} />
              ))}
            </div>
          </div>

          {speaker}
        </div>

        {/* Control buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: 5 }}>
          <div style={{ width: 14, height: 7, background: '#2a2a2a', borderRadius: 2, border: '1px solid #3a3a3a' }} />
          <div style={{ width: 14, height: 7, background: '#2a2a2a', borderRadius: 2, border: '1px solid #3a3a3a' }} />
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay() }}
            disabled={!ready}
            style={{ width: 22, height: 9, background: ready ? '#c0392b' : '#2a2a2a', borderRadius: 2, border: 'none', cursor: ready ? 'pointer' : 'default', color: 'white', fontSize: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextTrack() }}
            disabled={!ready}
            style={{ width: 14, height: 7, background: '#2a2a2a', borderRadius: 2, border: '1px solid #3a3a3a', cursor: ready ? 'pointer' : 'default', color: 'rgba(255,255,255,0.35)', fontSize: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Next track"
          >
            ⏭
          </button>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#c0392b' }} />
        </div>
      </div>
    </div>
  )
}
