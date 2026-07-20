import Link from 'next/link'
import { Github, Instagram, Mail } from 'lucide-react'
import { siteProfile } from '@/data/site'

const iconMap = {
  Instagram,
  GitHub: Github,
  X: null,
}

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {siteProfile.socials.map(social => {
        const Icon = iconMap[social.label as keyof typeof iconMap]
        return (
          <Link
            className="focus-ring grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white/70 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
            href={social.href}
            key={social.label}
            target="_blank"
            aria-label={social.label}
          >
            {Icon ? (
              <Icon aria-hidden="true" size={18} />
            ) : (
              <span aria-hidden="true" className="text-sm font-bold">
                X
              </span>
            )}
          </Link>
        )
      })}
      <a
        className="focus-ring grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white/70 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
        href={`mailto:${siteProfile.email}`}
        aria-label="E-posta gönder"
      >
        <Mail aria-hidden="true" size={18} />
      </a>
    </div>
  )
}
