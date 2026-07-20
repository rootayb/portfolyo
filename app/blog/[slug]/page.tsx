import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/format'
import { getPostBySlug } from '@/lib/blog-store'

type BlogDetailProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogDetailProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: 'Yazı bulunamadı' }
  }
  return {
    title: post.title,
    description: post.excerpt || undefined,
  }
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean)

  return (
    <main className="section min-h-screen">
      <article className="container max-w-2xl">
        <Link
          href="/blog"
          className="focus-ring inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <ArrowLeft aria-hidden="true" size={14} />
          Yazılar
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
          {formatDate(post.publishedAt)}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-[var(--foreground)] md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-8 flex flex-col gap-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-8 text-[var(--muted)] md:text-lg md:leading-9"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </main>
  )
}
