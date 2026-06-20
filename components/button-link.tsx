import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function ButtonLink({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === 'primary'
      ? 'bg-[var(--foreground)] text-white hover:bg-[var(--accent-strong)]'
      : 'border border-[var(--line)] bg-white/70 text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent-strong)]'

  return (
    <Link
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
