'use client'

import { useRef, type ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  // Maksimum eğim açısı (derece)
  max?: number
}

// İmleç konumuna göre kartı 3B eksende eğen sarmalayıcı.
// preserve-3d ile birlikte kullanıldığında içteki layer-* katmanları
// gerçek derinlik hissi verir.
export function TiltCard({ children, className = '', max = 9 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const ry = (px - 0.5) * 2 * max
    const rx = -(py - 0.5) * 2 * max
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
  }

  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }

  return (
    <div className="scene h-full">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`tilt-card preserve-3d relative h-full ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
