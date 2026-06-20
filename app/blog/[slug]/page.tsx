import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '@/lib/blog-store'
import { formatDate } from '@/lib/format'

export const revalidate = 60

type BlogDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Yazı bulunamadı',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="section">
      <article className="container max-w-3xl">
        <Link
          className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
          href="/blog"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Yazılara dön
        </Link>
        <p className="mt-10 text-sm font-medium text-[var(--accent-strong)]">
          {post.category} · {formatDate(post.publishedAt)} · {post.readingTime}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[var(--foreground)] md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          {post.excerpt}
        </p>
        <div className="mt-12 space-y-7 border-t border-[var(--line)] pt-10">
          {post.content.map(paragraph => (
            <p
              className="text-lg leading-9 text-[var(--foreground)]"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  )
}
