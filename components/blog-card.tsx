import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/data/posts'
import { formatDate } from '@/lib/format'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="border-b border-[var(--line)] py-7 first:pt-0 last:border-b-0 last:pb-0">
      <Link
        className="focus-ring group block rounded-xl"
        href={`/blog/${post.slug}`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[var(--accent-strong)]">
              {post.category} · {formatDate(post.publishedAt)} ·{' '}
              {post.readingTime}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)] transition group-hover:text-[var(--accent-strong)]">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {post.excerpt}
            </p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--foreground)] transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent-strong)]">
            <ArrowUpRight aria-hidden="true" size={18} />
          </span>
        </div>
      </Link>
    </article>
  )
}
