import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  PenLine,
  Sparkles,
} from 'lucide-react'
import { BlogCard } from '@/components/blog-card'
import { ButtonLink } from '@/components/button-link'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/data/projects'
import { siteProfile } from '@/data/site'
import { getPublishedPosts, isBlogDatabaseConfigured } from '@/lib/blog-store'

export const revalidate = 60

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

export default async function HomePage() {
  const posts = await getPublishedPosts()
  const featuredPosts = posts.slice(0, 3)
  const databaseConfigured = isBlogDatabaseConfigured()

  return (
    <main>
      <section className="relative overflow-hidden pb-20 pt-12 md:pb-24 md:pt-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-semibold uppercase text-[var(--accent-strong)]">
              {siteProfile.name}
            </p>
            <h1 className="max-w-5xl text-6xl font-semibold leading-[0.9] tracking-normal text-[var(--foreground)] md:text-8xl lg:text-[9.5rem]">
              {siteProfile.headline}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)] md:text-2xl md:leading-10">
              {siteProfile.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#projeler">
                Projeleri incele
                <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              <ButtonLink href="#yazilar" variant="secondary">
                Yazıları oku
              </ButtonLink>
            </div>
          </div>

          <div className="surface grid-pattern relative min-h-[440px] overflow-hidden rounded-[2rem] p-6 md:min-h-[520px]">
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
                  Neon hazır
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Blog yazıları admin panelinden veritabanına yazılabilir.
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

      <section className="section bg-white/52" id="projeler">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title="Projeler"
              description="Seçili işler tek sayfa akışında listelenir. Yeni işler veri katmanına eklenerek aynı tasarım diliyle çoğalır."
            />
            <Link
              className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
              href="https://github.com/rootayb"
              target="_blank"
            >
              GitHub
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

      <section className="section" id="yazilar">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Yazılar"
            description="Blog yapısı Neon Postgres'e bağlanabilir. Ortam değişkenleri yoksa örnek yazılarla çalışır, bağlantı tanımlanınca admin panelinden yönetilir."
          />
          <div className="surface rounded-2xl p-6 md:p-8">
            {featuredPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--foreground)] text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-5xl font-semibold leading-none md:text-7xl">
              Blog yönetimi tek sayfayı besler.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-white/70">
              Admin paneli yazıları Neon Postgres üzerinde tutar. Ana sayfa son
              yazıları çeker, blog detay sayfaları da aynı kaynaktan beslenir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/admin" variant="secondary">
                Yönetim paneli
                <PenLine aria-hidden="true" size={18} />
              </ButtonLink>
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/70">
                <Database aria-hidden="true" size={18} />
                {databaseConfigured ? 'Neon bağlı' : 'Neon env bekleniyor'}
              </span>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              'DATABASE_URL ile Neon bağlantısı',
              'ADMIN_PASSWORD ile korumalı giriş',
              'Yayın/taslak durumu',
              'Slug tabanlı blog detayları',
            ].map(item => (
              <div
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                key={item}
              >
                <span className="grid size-11 place-items-center rounded-full bg-white/10 text-[var(--warm)]">
                  <Sparkles aria-hidden="true" size={18} />
                </span>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
