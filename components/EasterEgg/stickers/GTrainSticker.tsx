'use client'

import { useEffect, useState } from 'react'

type Status = 'running' | 'planned' | 'reduced' | 'delays' | 'suspended' | 'loading' | 'unknown'

const STATUS_CONFIG: Record<Status, { color: string; label: string }> = {
  running:   { color: '#6DBA4A', label: 'Normal Service' },
  planned:   { color: '#4784FF', label: 'Planned Outage' },
  reduced:   { color: '#E8820E', label: 'Reduced Service' },
  delays:    { color: '#D8A500', label: 'Significant Delays' },
  suspended: { color: '#D12525', label: 'Suspended' },
  loading:   { color: '#6DBA4A', label: 'Checking...' },
  unknown:   { color: '#6DBA4A', label: 'Status unknown' },
}

export default function GTrainSticker() {
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    fetch('/api/gtrain')
      .then((r) => r.json())
      .then((d) => setStatus(d.status))
      .catch(() => setStatus('unknown'))
  }, [])

  const { color, label } = STATUS_CONFIG[status]

  return (
    <svg
      width="230"
      height="68"
      viewBox="0 0 230 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.2))]"
    >
      <rect width="230" height="68" rx="10" fill="#1D1D1D" />
      <line x1="0" y1="16.5" x2="230" y2="16.5" stroke="white" strokeWidth="3" />

      <style>{`
        @keyframes gtrain-pulse {
          0%, 100% { r: 4; opacity: 0.7; }
          50% { r: 9; opacity: 0; }
        }
        .gtrain-pulse { animation: gtrain-pulse 2s ease-out infinite; }
      `}</style>
      <circle cx="218" cy="8" r="4" fill={color} />
      <circle cx="218" cy="8" r="4" fill={color} className="gtrain-pulse" />

      {/* G circle at 44% of original size, centered at (38, 42) */}
      <circle cx="38" cy="42" r="22" fill={color} />
      <g transform="translate(38,42) scale(0.44) translate(-73,-94)">
        <path
          d="M89.902 115.469C87.7059 118.264 85.2745 120.231 82.6078 121.369C79.9412 122.456 77.2484 123 74.5294 123C70.2418 123 66.3725 122.275 62.9216 120.826C59.5229 119.325 56.6471 117.28 54.2941 114.692C51.9412 112.104 50.1373 109.076 48.8824 105.608C47.6275 102.088 47 98.3092 47 94.2718C47 90.1307 47.6275 86.3003 48.8824 82.7805C50.1373 79.2088 51.9412 76.1031 54.2941 73.4632C56.6471 70.8233 59.5229 68.7528 62.9216 67.2517C66.3725 65.7506 70.2418 65 74.5294 65C77.4052 65 80.1765 65.44 82.8431 66.3199C85.5621 67.1481 87.9935 68.3904 90.1373 70.0469C92.3333 71.7033 94.1373 73.7479 95.549 76.1807C96.9608 78.6136 97.8235 81.4087 98.1373 84.5663H86.3726C85.6405 81.4605 84.2288 79.1312 82.1373 77.5783C80.0457 76.0254 77.5098 75.249 74.5294 75.249C71.7582 75.249 69.4052 75.7925 67.4706 76.8795C65.5359 77.9148 63.9673 79.3382 62.7647 81.1499C61.5621 82.9099 60.6732 84.9286 60.098 87.2062C59.5752 89.4837 59.3137 91.8389 59.3137 94.2718C59.3137 96.6011 59.5752 98.8786 60.098 101.104C60.6732 103.278 61.5621 105.245 62.7647 107.005C63.9673 108.765 65.5359 110.189 67.4706 111.276C69.4052 112.311 71.7582 112.829 74.5294 112.829C78.6078 112.829 81.7451 111.819 83.9412 109.801C86.1895 107.73 87.4967 104.754 87.8627 100.871H75.4706V91.7871H99V121.758H91.1569L89.902 115.469Z"
          fill="white"
        />
      </g>

      {/* Divider */}
      <line x1="72" y1="22" x2="72" y2="58" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

      {/* Status label */}
      <text
        x="84"
        y="46"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {label}
      </text>
    </svg>
  )
}
