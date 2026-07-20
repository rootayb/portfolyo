'use client'

import { useRef, type CSSProperties } from 'react'

const codeLines = [
  { text: 'const focus = ["design", "code", "education"]', delay: '0s' },
  { text: 'const ui = design("simple & accessible")', delay: '1.8s' },
  { text: 'const app = buildProduct(ui)', delay: '3.6s' },
  { text: 'teach(app) // feedback loop', delay: '5.4s' },
]

export function CodeHero() {
  const deckRef = useRef<HTMLDivElement>(null)

  // İmleç konumuna göre paneli 3B eksende yasla
  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = deckRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const ry = -14 + (px - 0.5) * 18
    const rx = 8 - (py - 0.5) * 16
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
  }

  function handleLeave() {
    const el = deckRef.current
    if (!el) return
    el.style.setProperty('--ry', '-14deg')
    el.style.setProperty('--rx', '8deg')
  }

  return (
    <div
      className="code-scene relative"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div ref={deckRef} className="code-deck relative">
        <div className="code-float relative">
          {/* Arkadaki hayalet katmanlar — derinlik */}
          <div
            aria-hidden="true"
            className="code-ghost"
            style={{
              transform: 'translateZ(-130px) translate(38px, 30px)',
              opacity: 0.35,
              filter: 'blur(1px)',
            }}
          />
          <div
            aria-hidden="true"
            className="code-ghost"
            style={{
              transform: 'translateZ(-65px) translate(20px, 16px)',
              opacity: 0.55,
            }}
          />

          {/* Ana kod paneli */}
          <div className="code-panel relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101b1a] p-5 text-white md:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff6b6b]" />
                <span className="size-3 rounded-full bg-[#f7c948]" />
                <span className="size-3 rounded-full bg-[#2dd4bf]" />
              </div>
              <span className="text-xs font-semibold text-white/45">
                profile.ts
              </span>
            </div>

            <pre className="min-h-[250px] overflow-hidden font-mono text-[13px] leading-7 text-white/82 md:min-h-[300px] md:text-sm md:leading-8">
              <code>
                <span className="text-white/35">01</span>{' '}
                <span className="text-[#5eead4]">type</span>{' '}
                <span className="text-[#f7c948]">Role</span>{' '}
                <span className="text-white/55">{'= '}</span>
                <span className="text-[#93c5fd]">{'"designer"'}</span>{' '}
                <span className="text-white/55">|</span>{' '}
                <span className="text-[#93c5fd]">{'"developer"'}</span>{' '}
                <span className="text-white/55">|</span>{' '}
                <span className="text-[#93c5fd]">{'"educator"'}</span>
                {'\n'}
                <span className="text-white/35">02</span>{' '}
                <span className="text-white/45">
                  {'// Sade arayüz kararları'}
                </span>
                {'\n'}
                <span className="text-white/35">03</span>{' '}
                <span className="text-white/45">
                  {'// Çalışan dijital ürünler'}
                </span>
                {'\n\n'}
                {codeLines.map(line => (
                  <span className="block min-h-8" key={line.text}>
                    <span className="text-white/35">&gt;</span>{' '}
                    <span
                      className="typing-line text-white"
                      style={
                        { '--typing-delay': line.delay } as CSSProperties
                      }
                    >
                      {line.text}
                    </span>
                  </span>
                ))}
              </code>
            </pre>

            <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-xs font-semibold text-white/58 sm:grid-cols-3">
              <span>design: minimalist</span>
              <span>code: next.js / swiftui</span>
              <span>education: specialized</span>
            </div>
          </div>

          {/* Önde uçuşan rozet */}
          <div className="code-chip absolute -right-4 -top-4 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 md:-right-6 md:-top-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Motor
            </p>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Special Education Kernel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
