import type { MicroNote } from '@/data/notes'
import { formatDate } from '@/lib/format'
import { Brain, Code2, GraduationCap } from 'lucide-react'

const categoryIcons = {
  Tasarım: GraduationCap,
  Yazılım: Code2,
  Eğitim: Brain,
}

export function NoteCard({ note }: { note: MicroNote }) {
  const Icon = categoryIcons[note.category]

  return (
    <article className="border-b border-[var(--line)] py-6 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--surface-soft)] text-[var(--accent-strong)]">
          <Icon aria-hidden="true" size={18} />
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
            <span>{note.category}</span>
            <span>·</span>
            <span>{formatDate(note.publishedAt)}</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
            {note.content}
          </p>
        </div>
      </div>
    </article>
  )
}
