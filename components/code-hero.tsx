'use client'

import type { CSSProperties } from 'react'

const codeLines = [
  { text: 'const focus = ["design", "code", "education"]', delay: '0s' },
  { text: 'const ui = design("simple & accessible")', delay: '1.8s' },
  { text: 'const app = buildProduct(ui)', delay: '3.6s' },
  { text: 'teach(app) // feedback loop', delay: '5.4s' },
]

export function CodeHero() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[#101b1a] p-5 text-white shadow-[0_28px_90px_rgba(15,54,50,0.14)] md:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#ff6b6b]" />
          <span className="size-3 rounded-full bg-[#f7c948]" />
          <span className="size-3 rounded-full bg-[#2dd4bf]" />
        </div>
        <span className="text-xs font-semibold text-white/45">profile.ts</span>
      </div>

      <pre className="min-h-[250px] overflow-hidden font-mono text-[13px] leading-7 text-white/82 md:min-h-[390px] md:text-sm md:leading-8 lg:min-h-[490px]">
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
                className="typing-line inline-block max-w-0 overflow-hidden whitespace-nowrap align-bottom text-white"
                style={{ '--typing-delay': line.delay } as CSSProperties}
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
  )
}
