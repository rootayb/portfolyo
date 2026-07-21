import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { TiltCard } from '@/components/tilt-card'
import { formatDate } from '@/lib/format'
import { getPosts } from '@/lib/blog-store'

export const metadata = {
  title: 'Yazılar',
  description:
    'Alperen Yiğit Bulat — özel eğitim, açık kaynak modüller ve yazılım üzerine yazılar.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="section min-h-screen">
      <div className="container max-w-4xl">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft aria-hidden="true" size={14} />
          Ana sayfa
        </Link>

        <div className="mt-5">
          <SectionHeading
            title="Yazılar"
            description="Özel eğitim, açık kaynak modüller ve yazılım geliştirme üzerine notlarım."
          />
        </div>

        {posts.length === 0 ? (
          <p className="text-sm leading-7 text-[var(--muted)]">
            Henüz yayınlanmış bir yazı yok.
          </p>
        ) : (
          <div className="scene grid gap-5">
            {posts.map(post => (
              <TiltCard key={post.id} max={5}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="surface preserve-3d group relative block rounded-3xl p-6 md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="tilt-glow pointer-events-none absolute inset-0 rounded-3xl"
                  />
                  <div className="preserve-3d relative">
                    <div className="layer-1 flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                        {formatDate(post.publishedAt)}
                      </p>
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--surface-soft)] text-[var(--accent-strong)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                        <ArrowUpRight aria-hidden="true" size={17} />
                      </span>
                    </div>
                    <h2 className="layer-2 mt-3 text-xl font-semibold text-[var(--foreground)] md:text-2xl">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="layer-1 mt-3 text-sm leading-7 text-[var(--muted)]">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
