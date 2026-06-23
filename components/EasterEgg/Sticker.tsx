'use client'

import { motion, useMotionValue, PanInfo } from 'framer-motion'
import { ReactNode } from 'react'

interface StickerProps {
  children: ReactNode
  initialX: number
  initialY: number
  rotation?: number
  delay?: number
  isDismissing?: boolean
  deleting?: boolean
  deleteTarget?: { x: number; y: number }
  onDragStart?: () => void
  onDrag?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  onPositionChange?: (x: number, y: number) => void
  onDeleted?: () => void
}

export default function Sticker({ children, initialX, initialY, rotation = 0, delay = 0, isDismissing = false, deleting = false, deleteTarget, onDragStart, onDrag, onDragEnd, onPositionChange, onDeleted }: StickerProps) {
  // Transparent padding so the element's compositor layer (created while
  // framer-motion drags/animates it) is large enough to contain the
  // sticker's drop shadow — otherwise the shadow gets clipped to a hard box
  // during drag. Positions stay in content coordinates externally; the PAD
  // offset is applied/removed internally.
  const PAD = 36
  const x = useMotionValue(initialX - PAD)
  const y = useMotionValue(initialY - PAD)

  return (
    <motion.div
      drag={!isDismissing && !deleting}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0, rotate: rotation - 15, opacity: 0 }}
      animate={deleting && deleteTarget
        ? {
            x: deleteTarget.x - PAD,
            y: deleteTarget.y - PAD,
            scaleX: [1, 0.04, 0],   // sides pinch in fast
            scaleY: [1, 0.55, 0],   // top/bottom lag behind
            opacity: [1, 0.9, 0],
          }
        : isDismissing
        ? { scale: 0, rotate: rotation + 15, opacity: 0 }
        : { scale: 1, rotate: rotation, opacity: 1 }
      }
      transition={deleting
        ? {
            x:       { duration: 0.18, ease: [0.55, 0, 1, 0.45] },
            y:       { duration: 0.18, ease: [0.55, 0, 1, 0.45] },
            scaleX:  { duration: 0.18, times: [0, 0.45, 1], ease: 'easeIn' },
            scaleY:  { duration: 0.18, times: [0, 0.45, 1], ease: 'easeIn' },
            opacity: { duration: 0.18, times: [0, 0.6,  1] },
          }
        : isDismissing
        ? { duration: 0.16, ease: [0.4, 0, 1, 0.6], delay: delay * 0.4 }
        : { type: 'spring', stiffness: 350, damping: 18, delay }
      }
      whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
      style={{ x, y, padding: PAD, position: 'absolute', touchAction: 'none' }}
      className="cursor-grab select-none pointer-events-auto"
      data-sticker
      onDragStart={onDragStart}
      onDrag={(e, info) => { onPositionChange?.(x.get() + PAD, y.get() + PAD); onDrag?.(e, info) }}
      onDragEnd={onDragEnd}
      onAnimationComplete={() => { if (deleting) onDeleted?.() }}
    >
      {children}
    </motion.div>
  )
}
