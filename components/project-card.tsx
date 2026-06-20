import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,54,50,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            {project.status}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
            {project.title}
          </h3>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--surface-soft)] text-[var(--accent-strong)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
          <ArrowUpRight aria-hidden="true" size={18} />
        </span>
      </div>
      <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)]">
        {project.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--muted)]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
