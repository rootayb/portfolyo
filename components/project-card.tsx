import { ArrowUpRight } from 'lucide-react'
import { TiltCard } from '@/components/tilt-card'
import type { Project } from '@/data/projects'

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  const Wrapper = project.href ? 'a' : 'div'
  const linkProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <TiltCard>
      <Wrapper
        {...linkProps}
        className="surface group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 md:p-7"
      >
        {/* İmleç yönünde hareket eden parlama katmanı */}
        <span
          aria-hidden="true"
          className="tilt-glow pointer-events-none absolute inset-0 rounded-3xl"
        />

        <div className="preserve-3d relative flex h-full flex-col">
          <div className="layer-1 flex items-start justify-between gap-4">
            <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
              {project.category}
            </span>
            {project.href ? (
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--surface-soft)] text-[var(--accent-strong)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                <ArrowUpRight aria-hidden="true" size={18} />
              </span>
            ) : null}
          </div>

          <h3
            className={`layer-2 mt-5 font-semibold text-[var(--foreground)] ${
              featured ? 'text-2xl md:text-[1.7rem]' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>

          <p className="layer-1 mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">
            {project.summary}
          </p>

          <div className="layer-2 mt-6 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--muted)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </TiltCard>
  )
}
