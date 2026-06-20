import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
  Layers3,
} from 'lucide-react'
import { BlogCard } from '@/components/blog-card'
import { ButtonLink } from '@/components/button-link'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { posts } from '@/data/posts'
import { projects } from '@/data/projects'
import { siteProfile } from '@/data/site'

const principles = [
  {
    title: 'İnsan odaklı gözlem',
    description:
      'Özel eğitim deneyimi, geliştirdiğim araçlarda sade akış ve anlaşılır çıktı üretme kararlarını güçlendiriyor.',
    icon: Brain,
  },
  {
    title: 'Modüler üretim',
    description:
      'Projeleri küçük veri katmanları, tekrar kullanılabilir bileşenler ve kolay eklenebilir sayfalarla tasarlıyorum.',
    icon: Layers3,
  },
  {
    title: 'Erişilebilir arayüz',
    description:
      'Okunabilirlik, kontrast ve klavye erişimini sonradan eklenen detaylar değil, temel tasarım kararları olarak görüyorum.',
    icon: GraduationCap,
  },
]

export default function HomePage() {
  const featuredPosts = posts.slice(0, 2)

  return (
    <main>
      <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-[var(--foreground)] md:text-7xl">
              {siteProfile.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl md:leading-9">
              {siteProfile.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/projeler">
                Projeleri incele
                <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              <ButtonLink href="/blog" variant="secondary">
                Yazıları oku
              </ButtonLink>
            </div>
          </div>

          <div className="surface grid-pattern relative min-h-[460px] overflow-hidden rounded-[2rem] p-6">
            <div className="absolute inset-x-8 top-8 h-28 rounded-3xl bg-white/80 shadow-sm" />
            <div className="relative mt-6 rounded-3xl bg-[var(--foreground)] p-5 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Öğrenme panosu</p>
                  <p className="mt-1 text-xs text-white/60">haftalık görünüm</p>
                </div>
                <BookOpen aria-hidden="true" size={22} />
              </div>
              <div className="mt-8 grid gap-3">
                {['Gözlem notu', 'BEP hedefi', 'Materyal fikri'].map(
                  (item, index) => (
                    <div
                      className="flex items-center justify-between rounded-2xl bg-white/10 p-4"
                      key={item}
                    >
                      <span className="text-sm font-medium">{item}</span>
                      <span
                        className="h-2 rounded-full bg-[var(--warm)]"
                        style={{ width: `${56 + index * 14}px` }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-4 rounded-3xl bg-white p-5 shadow-xl md:grid-cols-2">
              <div>
                <Code2
                  aria-hidden="true"
                  className="text-[var(--accent-strong)]"
                />
                <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
                  Dijital çözüm
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Fikirden prototipe, prototipten çalışan ürüne.
                </p>
              </div>
              <div className="rounded-2xl bg-[var(--surface-soft)] p-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Yayın akışı
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Projeler, notlar ve blog yazıları tek yapıda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="hakkimda">
        <div className="container">
          <SectionHeading
            title="Öğretmenlik perspektifiyle teknoloji üretmek"
            description="Bu site hem özel eğitim alanındaki düşüncelerimi hem de hobi olarak geliştirdiğim dijital çözümleri düzenli yayınlayabileceğim modüler bir alan olarak tasarlandı."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map(item => {
              const Icon = item.icon
              return (
                <article className="surface rounded-2xl p-6" key={item.title}>
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--surface-soft)] text-[var(--accent-strong)]">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white/52">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title="Projeler"
              description="Yeni projeler bu veri katmanına eklenerek ana sayfada ve proje arşivinde otomatik listelenebilir."
            />
            <Link
              className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
              href="/projeler"
            >
              Tüm projeler
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Yazılar"
            description="Basit blog yapısı statik veriyle başlıyor; ileride MDX, CMS veya veritabanı katmanına taşınabilecek şekilde ayrıştırıldı."
          />
          <div className="surface rounded-2xl p-6 md:p-8">
            {featuredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
