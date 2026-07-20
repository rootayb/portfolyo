import { neon } from '@neondatabase/serverless'
import { posts as fallbackPosts, type BlogPost } from '@/data/posts'

export type { BlogPost }

type BlogPostRow = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  published_at: string | Date
}

export type BlogPostInput = {
  title: string
  excerpt: string
  content: string
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

// Başlıktan URL dostu, Türkçe karakterleri sadeleştirilmiş slug üretir.
export function slugify(value: string) {
  const map: Record<string, string> = {
    ç: 'c',
    ğ: 'g',
    ı: 'i',
    ö: 'o',
    ş: 's',
    ü: 'u',
  }
  return value
    .toLowerCase()
    .replace(/[çğıöşü]/g, char => map[char] ?? char)
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

function toPost(row: BlogPostRow): BlogPost {
  const dateVal =
    row.published_at instanceof Date
      ? row.published_at.toISOString().slice(0, 10)
      : String(row.published_at).slice(0, 10)

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    publishedAt: dateVal,
  }
}

export async function ensureBlogSchema() {
  const sql = getSql()
  if (!sql) return false

  await sql`
    create table if not exists blog_posts (
      id serial primary key,
      title text not null,
      slug text not null unique,
      excerpt text not null default '',
      content text not null,
      published_at date not null default current_date,
      created_at timestamptz not null default now()
    )
  `
  return true
}

export async function getPosts(): Promise<BlogPost[]> {
  const sql = getSql()
  if (!sql) {
    return fallbackPosts
  }

  try {
    await ensureBlogSchema()
    const rows = await sql`
      select id, title, slug, excerpt, content, published_at
      from blog_posts
      order by published_at desc, id desc
    `
    return (rows as BlogPostRow[]).map(toPost)
  } catch (error) {
    console.error('Yazılar veritabanından çekilemedi, örnekler kullanılıyor:', error)
    return fallbackPosts
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const sql = getSql()
  if (!sql) {
    return fallbackPosts.find(post => post.slug === slug) ?? null
  }

  try {
    await ensureBlogSchema()
    const rows = await sql`
      select id, title, slug, excerpt, content, published_at
      from blog_posts
      where slug = ${slug}
      limit 1
    `
    const row = (rows as BlogPostRow[])[0]
    return row ? toPost(row) : null
  } catch (error) {
    console.error('Yazı veritabanından çekilemedi, örneklere düşülüyor:', error)
    return fallbackPosts.find(post => post.slug === slug) ?? null
  }
}

export async function addPost(input: BlogPostInput) {
  const sql = getSql()
  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureBlogSchema()

  // Slug çakışmasını sayısal sonekle çöz
  const base = slugify(input.title) || 'yazi'
  let slug = base
  let attempt = 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await sql`select 1 from blog_posts where slug = ${slug} limit 1`
    if ((existing as unknown[]).length === 0) break
    attempt += 1
    slug = `${base}-${attempt}`
  }

  await sql`
    insert into blog_posts (title, slug, excerpt, content)
    values (${input.title}, ${slug}, ${input.excerpt}, ${input.content})
  `
}

export async function deletePost(id: number) {
  const sql = getSql()
  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureBlogSchema()
  await sql`delete from blog_posts where id = ${id}`
}

export async function seedPosts() {
  const sql = getSql()
  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureBlogSchema()
  for (const post of fallbackPosts) {
    await sql`
      insert into blog_posts (title, slug, excerpt, content, published_at)
      values (${post.title}, ${post.slug}, ${post.excerpt}, ${post.content}, ${post.publishedAt})
      on conflict (slug) do nothing
    `
  }
}
