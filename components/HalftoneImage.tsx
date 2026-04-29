'use client'

import { useEffect, useRef } from 'react'

const DOT_GRID = 7 // px between dot centres

interface Props {
  src: string
  width: number
  height: number
  alt: string
  className?: string
}

export default function HalftoneImage({ src, width, height, alt, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef({
    ctx: null as CanvasRenderingContext2D | null,
    original: null as HTMLImageElement | null,
    halftone: null as HTMLCanvasElement | null,
    progress: 0,
    target: 0,
    raf: 0,
    ready: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const s = state.current
    s.ctx = ctx

    const img = new window.Image()
    img.src = src
    img.onload = () => {
      s.original = img

      // Sample image and pre-render halftone to offscreen canvas
      const off = document.createElement('canvas')
      off.width = width
      off.height = height
      const octx = off.getContext('2d')!

      // Draw image so we can read pixel data
      octx.drawImage(img, 0, 0, width, height)
      const { data } = octx.getImageData(0, 0, width, height)

      // White background + black dots
      octx.fillStyle = '#ffffff'
      octx.fillRect(0, 0, width, height)
      octx.fillStyle = '#1C1C1C'

      const step = DOT_GRID
      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const px = Math.min(Math.floor(x), width - 1)
          const py = Math.min(Math.floor(y), height - 1)
          const i = (py * width + px) * 4
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          const radius = (step / 2) * 0.9 * (1 - lum / 255)
          if (radius > 0.4) {
            octx.beginPath()
            octx.arc(x, y, radius, 0, Math.PI * 2)
            octx.fill()
          }
        }
      }

      s.halftone = off

      // Initial draw
      ctx.drawImage(img, 0, 0, width, height)
      s.ready = true
    }

    return () => cancelAnimationFrame(s.raf)
  }, [src, width, height])

  function draw(progress: number) {
    const s = state.current
    if (!s.ctx || !s.original || !s.halftone) return
    s.ctx.globalAlpha = 1
    s.ctx.drawImage(s.original, 0, 0, width, height)
    if (progress > 0) {
      s.ctx.globalAlpha = progress
      s.ctx.drawImage(s.halftone, 0, 0, width, height)
      s.ctx.globalAlpha = 1
    }
  }

  function animate() {
    const s = state.current
    if (!s.ready) return
    const diff = s.target - s.progress
    if (Math.abs(diff) < 0.001) {
      s.progress = s.target
      draw(s.progress)
      return
    }
    s.progress += diff * 0.07
    draw(s.progress)
    s.raf = requestAnimationFrame(animate)
  }

  function onEnter() {
    const s = state.current
    s.target = 1
    cancelAnimationFrame(s.raf)
    s.raf = requestAnimationFrame(animate)
  }

  function onLeave() {
    const s = state.current
    s.target = 0
    cancelAnimationFrame(s.raf)
    s.raf = requestAnimationFrame(animate)
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-label={alt}
      className={className}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      style={{ cursor: 'crosshair', display: 'block', maxWidth: '100%' }}
    />
  )
}
