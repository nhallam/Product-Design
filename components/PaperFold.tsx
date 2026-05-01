export default function PaperFold() {
  return (
    <svg
      className="fixed top-0 pointer-events-none"
      style={{ left: 'calc(50% - 30px)', zIndex: -1, width: 60, height: '100dvh' }}
      viewBox="0 0 60 1000"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fold-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0" />
          <stop offset="5%"   stopColor="white" stopOpacity="0.7" />
          <stop offset="14%"  stopColor="white" stopOpacity="1" />
          <stop offset="86%"  stopColor="white" stopOpacity="1" />
          <stop offset="95%"  stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="fold-mask">
          <rect width="60" height="1000" fill="url(#fold-fade)" />
        </mask>
        <filter id="fold-grain" x="-10%" y="-5%" width="120%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Soft light on the left of the crease */}
      <path
        d="M 30 0 C 29 220, 31.5 420, 28 580 C 26.5 720, 31 870, 30 1000"
        stroke="rgba(235,215,185,0.4)"
        strokeWidth="9"
        fill="none"
        mask="url(#fold-mask)"
      />

      {/* Shadow on the right of the crease */}
      <path
        d="M 30 0 C 29 220, 31.5 420, 28 580 C 26.5 720, 31 870, 30 1000"
        stroke="rgba(70,45,20,0.13)"
        strokeWidth="14"
        fill="none"
        mask="url(#fold-mask)"
      />

      {/* The crease itself — textured and imperfect */}
      <path
        d="M 30 0 C 29 220, 31.5 420, 28 580 C 26.5 720, 31 870, 30 1000"
        stroke="rgba(105,78,42,0.7)"
        strokeWidth="1.5"
        fill="none"
        mask="url(#fold-mask)"
        filter="url(#fold-grain)"
      />
    </svg>
  )
}
