'use client'

const VIDEO_ID = 'sOQKRjP3ZJk'

export default function VideoSticker({ ghost = false }: { ghost?: boolean }) {
  return (
    <div
      className="bg-[#1C1C1C] shadow-lg w-[220px] overflow-hidden"
      style={{ borderRadius: '5px' }}
    >
      <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
        {ghost ? (
          <div className="absolute inset-0 bg-black" />
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3`}
            title="Video"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}
      </div>
    </div>
  )
}
