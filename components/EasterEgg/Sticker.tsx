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
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)

  return (
    <motion.div
      drag={!isDismissing && !deleting}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0, rotate: rotation - 15, opacity: 0 }}
      animate={deleting && deleteTarget
        ? { x: deleteTarget.x, y: deleteTarget.y, scale: 0, opacity: 0, rotate: rotation }
        : isDismissing
        ? { scale: 0, rotate: rotation + 15, opacity: 0 }
        : { scale: 1, rotate: rotation, opacity: 1 }
      }
      transition={deleting
        ? { type: 'tween', duration: 0.32, ease: [0.4, 0, 0.6, 1] }
        : isDismissing
        ? { type: 'spring', stiffness: 400, damping: 25, delay: delay * 0.4 }
        : { type: 'spring', stiffness: 350, damping: 18, delay }
      }
      whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
      style={{ x, y, position: 'absolute', touchAction: 'none' }}
      className="cursor-grab select-none pointer-events-auto"
      data-sticker
      onDragStart={onDragStart}
      onDrag={(e, info) => { onPositionChange?.(x.get(), y.get()); onDrag?.(e, info) }}
      onDragEnd={onDragEnd}
      onAnimationComplete={() => { if (deleting) onDeleted?.() }}
    >
      {children}
    </motion.div>
  )
}
