'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'react-feather'

// `cover` is optional — drop a square image in /public and reference it here
// to override the album art. Falls back to the YouTube thumbnail otherwise.
const TRACKS: { id: string; cover?: string }[] = [
  { id: 'd2FQCRvigBU' },
  { id: 'e4oB6wYMcrI' },
  { id: 'aygY5OqMuKE' },
]

const coverFor = (i: number) =>
  TRACKS[i].cover ?? `https://img.youtube.com/vi/${TRACKS[i].id}/hqdefault.jpg`

interface YTPlayer {
  destroy(): void
  pauseVideo(): void
  playVideo(): void
  loadVideoById(id: string): void
  getVideoData(): { title: string; author: string }
  mute(): void
  unMute(): void
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

export default function BoomboxSticker({ ghost = false }: { ghost?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [trackInfo, setTrackInfo] = useState<{ title: string; author: string } | null>(null)
  const [ready, setReady] = useState(false)
  const playerRef = useRef<YTPlayer | null>(null)
  const playerDivRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)
  // Mirrors currentIndexRef in state so the album cover re-renders on change.
  const [currentIndex, setCurrentIndex] = useState(0)

  const [scroll, setScroll] = useState(false)
  const [duration, setDuration] = useState(8)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  const title = trackInfo?.title ?? 'Boombox'

  useEffect(() => {
    const c = titleContainerRef.current
    const m = measureRef.current
    if (!c || !m) return
    const w = m.scrollWidth
    const overflow = w > c.clientWidth + 1
    setScroll(overflow)
    if (overflow) setDuration(Math.max(7.5, (w + 32) / 28))
  }, [title])

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
            } else if (event.data === window.YT.PlayerState.ENDED) {
              // Auto-advance to the next track when the current one finishes
              const next = (currentIndexRef.current + 1) % TRACKS.length
              currentIndexRef.current = next
              setCurrentIndex(next)
              event.target.loadVideoById(TRACKS[next].id)
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false)
            }
          },
        },
      })
    }

    if (ghost) return

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
  }, [ghost])

  const togglePlay = () => {
    if (!ready || !playerRef.current) return
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const toggleMute = () => {
    if (!ready || !playerRef.current) return
    if (isMuted) {
      playerRef.current.unMute()
      setIsMuted(false)
    } else {
      playerRef.current.mute()
      setIsMuted(true)
    }
  }

  const nextTrack = () => {
    if (!ready || !playerRef.current) return
    const next = (currentIndexRef.current + 1) % TRACKS.length
    currentIndexRef.current = next
    setCurrentIndex(next)
    playerRef.current.loadVideoById(TRACKS[next].id)
    setIsPlaying(true)
  }

  return (
    <div className="relative bg-[#1C1C1C] shadow-lg px-4 py-4 w-[175px] text-center" style={{ borderRadius: '5px' }}>
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <div ref={playerDivRef} />
      </div>

      <div
        className="text-2xl font-black text-white mb-2 leading-none"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
      >
        BOOMBOX
      </div>

      {/* Album cover */}
      <div className="w-full aspect-square mb-2 overflow-hidden rounded-[3px] bg-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverFor(currentIndex)}
          alt=""
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      <div
        ref={titleContainerRef}
        className={`relative overflow-hidden ${scroll ? '' : 'flex justify-center'}`}
      >
        {/* hidden measurement copy (no padding, never wraps) */}
        <span
          ref={measureRef}
          aria-hidden
          className="invisible absolute left-0 top-0 text-sm font-bold whitespace-nowrap"
        >
          {title}
        </span>

        {scroll ? (
          <div className="marquee-track inline-flex whitespace-nowrap" style={{ animationDuration: `${duration}s` }}>
            <span className="text-sm font-bold text-white leading-tight pr-8">{title}</span>
            <span className="text-sm font-bold text-white leading-tight pr-8" aria-hidden>{title}</span>
          </div>
        ) : (
          <span className="text-sm font-bold text-white leading-tight whitespace-nowrap">{title}</span>
        )}
      </div>
      <div className="text-xs text-white/60 mt-0.5 line-clamp-1 h-4">
        {trackInfo ? trackInfo.author : ready ? '' : 'Loading...'}
      </div>

      <div className="flex items-center justify-center gap-4 mt-3">
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute() }}
          disabled={!ready}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-30"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} strokeWidth={2} /> : <Volume2 size={16} strokeWidth={2} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay() }}
          disabled={!ready}
          className="text-white hover:text-white/70 transition-colors disabled:opacity-30"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" stroke="none" /> : <Play size={16} fill="currentColor" stroke="none" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); nextTrack() }}
          disabled={!ready}
          className="text-white/50 hover:text-white transition-colors disabled:opacity-30"
          aria-label="Next track"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="4 4 15 12 4 20" />
            <rect x="16" y="4" width="3" height="16" rx="1" />
          </svg>
        </button>
      </div>
    </div>
  )
}
