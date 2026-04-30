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
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
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
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
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
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        initPlayer()
      }
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [])

  const togglePlay = () => {
    if (!ready || !playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const nextTrack = () => {
    if (!ready || !playerRef.current) return
    const next = (currentIndexRef.current + 1) % TRACKS.length
    currentIndexRef.current = next
    playerRef.current.loadVideoById(TRACKS[next].id)
    setIsPlaying(true)
  }

  return (
    <div className="relative bg-[#1C1C1C] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <div ref={playerDivRef} />
      </div>

      <div className="text-3xl mb-2">🎵</div>
      <div className="text-sm font-bold text-white leading-tight line-clamp-1">
        {trackInfo?.title ?? 'Boombox'}
      </div>
      <div className="text-xs text-white/60 mt-0.5 line-clamp-1 h-4">
        {trackInfo ? trackInfo.author : ready ? '' : 'Loading...'}
      </div>

      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay() }}
          disabled={!ready}
          className="text-white hover:text-white/70 transition-colors disabled:opacity-30 text-base leading-none"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextTrack() }}
          disabled={!ready}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-30 text-base leading-none"
          aria-label="Next track"
        >
          ⏭
        </button>
      </div>
    </div>
  )
}
