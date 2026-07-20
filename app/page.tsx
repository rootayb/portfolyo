import { ArrowRight, Brain, Code2, Github, GraduationCap } from 'lucide-react'
import { ButtonLink } from '@/components/button-link'
import { CodeHero } from '@/components/code-hero'
import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { TiltCard } from '@/components/tilt-card'
import { featuredProjects, otherProjects } from '@/data/projects'
import { siteProfile } from '@/data/site'

const focusAreas = [
  {
    title: 'Eğitim',
    description:
      'Özel eğitim pratiğinden gelen gözlem, ihtiyaç okuma ve öğrenme deneyimi tasarımı.',
    icon: GraduationCap,
  },
  {
    title: 'Yazılım',
    description:
      'Next.js, TypeScript ve Swift ile deterministik, açıklanabilir ve gömülebilir motorlar.',
    icon: Code2,
  },
  {
    title: 'Açıklanabilirlik',
    description:
      'Kara kutu değil; her değerlendirme ve öneri, gerekçesiyle birlikte üretilir.',
    icon: Brain,
  },
]

export default function HomePage() {
  return (
    <main>
      {/* ---- Hero: metin + 3B kod paneli ---- */}
      <section className="relative overflow-hidden pb-24 pt-12 md:pb-32 md:pt-20">
        <div className="container grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-4 py-1.5 text-xs font-semibold text-[var(--muted)] backdrop-blur">
              <span className="size-2 rounded-full bg-[var(--accent)]" />
              {siteProfile.role}
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
              {siteProfile.headline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] md:text-xl md:leading-9">
              {siteProfile.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#projeler">
                Projeleri incele
                <ArrowRight aria-hidden="true" size={18} />
              </ButtonLink>
              <ButtonLink
                href="https://github.com/rootayb"
                target="_blank"
                variant="secondary"
              >
                <Github aria-hidden="true" size={18} />
                GitHub
              </ButtonLink>
            </div>
          </div>

          <div className="rise" style={{ animationDelay: '0.15s' }}>
            <CodeHero />
          </div>
        </div>
      </section>

      {/* ---- Profil / Odak alanları ---- */}
      <section className="section" id="profil">
        <div className="container">
          <SectionHeading
            title="Üç alanın kesişiminde üretiyorum."
            description="Özel eğitim alan bilgisini, yazılım disiplinini ve açıklanabilir sistem tasarımını aynı işte buluşturuyorum."
          />
          <div className="scene grid gap-5 md:grid-cols-3">
            {focusAreas.map(item => {
              const Icon = item.icon
              return (
                <TiltCard key={item.title} max={7}>
                  <article className="surface preserve-3d relative h-full rounded-3xl p-7">
                    <span className="layer-2 grid size-12 place-items-center rounded-2xl bg-[var(--surface-soft)] text-[var(--accent-strong)]">
                      <Icon aria-hidden="true" size={22} />
                    </span>
                    <h3 className="layer-1 mt-6 text-lg font-semibold text-[var(--foreground)]">
                      {item.title}
                    </h3>
                    <p className="layer-1 mt-3 text-sm leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
                  </article>
                </TiltCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- Projeler ---- */}
      <section className="section" id="projeler">
        <div className="container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title="Projeler"
              description="Özel eğitim için geliştirdiğim açık kaynak motorlar, modüller ve ürünler."
            />
            <a
              className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
              href="https://github.com/rootayb"
              target="_blank"
              rel="noreferrer"
            >
              Tümü GitHub&apos;da
              <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>

          {/* Öne çıkanlar */}
          <div className="grid gap-5 md:grid-cols-3">
            {featuredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>

          {/* Diğer projeler */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
