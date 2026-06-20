import { neon } from '@neondatabase/serverless'
import { notes as fallbackNotes, type MicroNote } from '@/data/notes'

export type { MicroNote }

type MicroNoteRow = {
  id: number
  content: string
  published_at: string | Date
  category: 'Tasarım' | 'Yazılım' | 'Eğitim'
}

export type MicroNoteInput = {
  content: string
  category: 'Tasarım' | 'Yazılım' | 'Eğitim'
}

export function isBlogDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL)
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    return null
  }
  return neon(process.env.DATABASE_URL)
}

export async function ensureNotesSchema() {
  const sql = getSql()
  if (!sql) return false

  await sql`
    create table if not exists micro_notes (
      id serial primary key,
      content text not null,
      published_at date not null default current_date,
      category text not null,
      created_at timestamptz not null default now()
    )
  `
  return true
}

export async function getNotes(): Promise<MicroNote[]> {
  const sql = getSql()
  if (!sql) {
    return fallbackNotes
  }

  try {
    await ensureNotesSchema()
    const rows = await sql`
      select id, content, published_at, category
      from micro_notes
      order by published_at desc, id desc
    `

    return (rows as MicroNoteRow[]).map(row => {
      const dateVal = row.published_at instanceof Date
        ? row.published_at.toISOString().slice(0, 10)
        : String(row.published_at).slice(0, 10)

      return {
        id: row.id,
        content: row.content,
        publishedAt: dateVal,
        category: row.category,
      }
    })
  } catch (error) {
    console.error('Veritabanından notlar çekilemedi, fallbacks kullanılıyor:', error)
    return fallbackNotes
  }
}

export async function addNote(input: MicroNoteInput) {
  const sql = getSql()
  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureNotesSchema()
  await sql`
    insert into micro_notes (content, category)
    values (${input.content}, ${input.category})
  `
}

export async function deleteNote(id: number) {
  const sql = getSql()
  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureNotesSchema()
  await sql`
    delete from micro_notes
    where id = ${id}
  `
}

export async function seedNotes() {
  const sql = getSql()
  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureNotesSchema()
  for (const note of fallbackNotes) {
    await sql`
      insert into micro_notes (content, category, published_at)
      values (${note.content}, ${note.category}, ${note.publishedAt})
    `
  }
}
