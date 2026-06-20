import type { Metadata } from 'next'
import { BlogCard } from '@/components/blog-card'
import { SectionHeading } from '@/components/section-heading'
import { posts } from '@/data/posts'

export const metadata: Metadata = {
  title: 'Yazılar',
  description:
    'Özel eğitim, erişilebilir tasarım ve hobi yazılım projeleri üzerine blog yazıları.',
}

export default function BlogPage() {
  return (
    <main className="section">
      <div className="container">
        <SectionHeading
          title="Yazılar"
          description="Öğretmenlik pratiği, dijital üretim ve erişilebilirlik üzerine kısa notlar."
        />
        <div className="surface rounded-2xl p-6 md:p-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  )
}
