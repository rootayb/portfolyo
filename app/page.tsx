import Link from 'next/link'
import { ArrowRight, Brain, Code2, GraduationCap } from 'lucide-react'
import { ButtonLink } from '@/components/button-link'
import { CodeHero } from '@/components/code-hero'
import { NoteCard } from '@/components/note-card'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { getNotes } from '@/lib/notes-store'
import { projects } from '@/data/projects'
import { siteProfile } from '@/data/site'

const focusAreas = [
  {
    title: 'Tasarım',
    description:
      'Sade, okunabilir ve erişilebilir arayüz kararlarıyla ürün fikrini netleştirme.',
    icon: GraduationCap,
  },
  {
    title: 'Yazılım',
    description: 'Next.js ve SwiftUI ile küçük ama çalışan kullanıcı deneyimleri.',
    icon: Code2,
  },
  {
    title: 'Eğitim',
    description:
      'Özel eğitim pratiğinden gelen gözlem, ihtiyaç okuma ve öğrenme deneyimi.',
    icon: Brain,
  },
]

export default async function HomePage() {
  const notes = await getNotes()
  return (
    <main>
      <section className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-24">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-[var(--foreground)] md:text-7xl lg:text-8xl">
              {siteProfile.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl md:leading-9">
              {siteProfile.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#isler">
                İşleri incele
                <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              <ButtonLink href="#notlar" variant="secondary">
                Notları oku
              </ButtonLink>
            </div>
          </div>

          <CodeHero />
        </div>
      </section>

      <section className="section" id="profil">
        <div className="container">
          <SectionHeading
            title="Üç alanın kesişiminde çalışıyorum."
            description="Öğrenme deneyimini anlayan, arayüz kararlarını önemseyen ve fikri çalışan ürüne dönüştüren bir üretim pratiği."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {focusAreas.map(item => {
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

      <section className="section bg-white/52" id="isler">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title="Seçili işler"
              description="Tasarım, yazılım ve eğitim odağındaki projelerim."
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

      <section className="section" id="notlar">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="Notlar"
            description="Tasarım, yazılım ve eğitim üzerine aldığım kısa mikro-öğrenim notları."
          />
          <div className="surface rounded-2xl p-6 md:p-8">
            {notes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
