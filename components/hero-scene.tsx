'use client'

import { useEffect, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

function startCanvasFallback(mount: HTMLDivElement) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return () => {}
  }

  canvas.setAttribute('aria-label', 'Soyut dijital ağ animasyonu')
  canvas.setAttribute('role', 'img')
  mount.appendChild(canvas)

  let frame = 0
  let raf = 0

  const draw = () => {
    const { width, height } = mount.getBoundingClientRect()
    const scale = Math.min(window.devicePixelRatio, 2)
    canvas.width = Math.max(1, Math.floor(width * scale))
    canvas.height = Math.max(1, Math.floor(height * scale))
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    context.setTransform(scale, 0, 0, scale, 0, 0)
    context.fillStyle = '#f7faf9'
    context.fillRect(0, 0, width, height)
    context.strokeStyle = 'rgba(13, 148, 136, 0.42)'
    context.lineWidth = 1

    const gap = 34
    const offset = Math.sin(frame) * 8

    for (let x = -gap; x < width + gap; x += gap) {
      context.beginPath()
      context.moveTo(x + offset, height * 0.22)
      context.lineTo(x + width * 0.18, height * 0.82)
      context.stroke()
    }

    for (let y = height * 0.22; y < height * 0.86; y += gap) {
      context.beginPath()
      context.moveTo(width * 0.05, y)
      context.lineTo(width * 0.92, y + Math.cos(frame) * 10)
      context.stroke()
    }

    frame += 0.012
    raf = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    cancelAnimationFrame(raf)
    canvas.remove()
  }
}

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current

    if (!mount) {
      return
    }

    const scene = new Scene()
    scene.background = new Color('#f7faf9')

    const camera = new PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 2.4, 8)
    camera.lookAt(0, 0, 0)

    let renderer: WebGLRenderer

    try {
      renderer = new WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      })
    } catch {
      return startCanvasFallback(mount)
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.setAttribute(
      'aria-label',
      'Soyut dijital ağ animasyonu'
    )
    renderer.domElement.setAttribute('role', 'img')
    mount.appendChild(renderer.domElement)

    const points: number[] = []
    const size = 9
    const step = 0.72
    const half = ((size - 1) * step) / 2

    for (let x = 0; x < size; x += 1) {
      for (let z = 0; z < size; z += 1) {
        const px = x * step - half
        const pz = z * step - half
        const py = Math.sin(x * 0.8) * 0.08 + Math.cos(z * 0.7) * 0.08

        if (x < size - 1) {
          points.push(px, py, pz, px + step, py + 0.02, pz)
        }

        if (z < size - 1) {
          points.push(px, py, pz, px, py - 0.02, pz + step)
        }
      }
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(points), 3)
    )

    const material = new LineBasicMaterial({
      color: '#0d9488',
      transparent: true,
      opacity: 0.42,
    })

    const grid = new LineSegments(geometry, material)
    grid.rotation.x = -0.62
    grid.rotation.z = 0.1
    scene.add(grid)

    let frame = 0
    let raf = 0

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
    }

    const animate = () => {
      frame += 0.01
      grid.rotation.z = 0.1 + Math.sin(frame) * 0.045
      grid.position.y = Math.sin(frame * 0.8) * 0.08
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="h-[260px] w-full overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--background)] md:h-[420px] lg:h-[520px]"
    />
  )
}
