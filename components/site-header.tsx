import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { navigation, siteProfile } from '@/data/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(247,250,249,0.82)] backdrop-blur-xl">
      <nav className="container flex min-h-16 items-center justify-between gap-6">
        <Link className="focus-ring flex items-center gap-3" href="/">
          <span className="grid size-9 place-items-center rounded-xl bg-[var(--foreground)] text-white">
            <Code2 aria-hidden="true" size={18} strokeWidth={2.2} />
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)]">
            {siteProfile.name}
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map(item => (
            <Link
              className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white hover:text-[var(--foreground)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
