import Link from 'next/link'
import { Github, Instagram, Mail } from 'lucide-react'
import { siteProfile } from '@/data/site'

const iconMap = {
  Instagram,
  GitHub: Github,
  X: null,
}

export function SiteFooter() {
  return (
    <footer
      id="iletisim"
      className="border-t border-[var(--line)] bg-white/60 py-10"
    >
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {siteProfile.name}
          </p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--muted)]">
            Özel eğitim, erişilebilirlik ve küçük dijital çözümler üzerine
            üretmeye devam ediyorum.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="focus-ring grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
            href={`mailto:${siteProfile.email}`}
            aria-label="E-posta gönder"
          >
            <Mail aria-hidden="true" size={18} />
          </a>
          {siteProfile.socials.map(social => {
            const Icon = iconMap[social.label as keyof typeof iconMap]
            return (
              <Link
                className="focus-ring grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
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
        </div>
      </div>
    </footer>
  )
}
