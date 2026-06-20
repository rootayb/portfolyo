import { neon } from '@neondatabase/serverless'
import { posts as fallbackPosts, type BlogPost } from '@/data/posts'

export type { BlogPost }

type BlogPostRow = {
  id: number
  title: string
  slug: string
  excerpt: string
  published_at: string
  reading_time: string
  category: string
  content: string[] | string
  published: boolean
}

export type BlogPostInput = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readingTime: string
  category: string
  content: string[]
  published: boolean
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

function mapRow(row: BlogPostRow): BlogPost {
  const content =
    typeof row.content === 'string' ? JSON.parse(row.content) : row.content

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    publishedAt: row.published_at,
    readingTime: row.reading_time,
    category: row.category,
    content,
    published: row.published,
  }
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function ensureBlogSchema() {
  const sql = getSql()

  if (!sql) {
    return false
  }

  await sql`
    create table if not exists blog_posts (
      id serial primary key,
      title text not null,
      slug text not null unique,
      excerpt text not null,
      published_at date not null default current_date,
      reading_time text not null default '3 dk',
      category text not null default 'Yazı',
      content jsonb not null default '[]'::jsonb,
      published boolean not null default true,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `

  return true
}

export async function getPublishedPosts() {
  const sql = getSql()

  if (!sql) {
    return fallbackPosts
  }

  try {
    await ensureBlogSchema()
    const rows = await sql`
      select id, title, slug, excerpt, published_at, reading_time, category, content, published
      from blog_posts
      where published = true
      order by published_at desc, id desc
    `

    return (rows as BlogPostRow[]).map(mapRow)
  } catch {
    return fallbackPosts
  }
}

export async function getAllPostsForAdmin() {
  const sql = getSql()

  if (!sql) {
    return fallbackPosts.map(post => ({ ...post, published: true }))
  }

  await ensureBlogSchema()
  const rows = await sql`
    select id, title, slug, excerpt, published_at, reading_time, category, content, published
    from blog_posts
    order by published_at desc, id desc
  `

  return (rows as BlogPostRow[]).map(mapRow)
}

export async function getPostBySlug(slug: string) {
  const posts = await getPublishedPosts()
  return posts.find(post => post.slug === slug)
}

export async function upsertPost(input: BlogPostInput, id?: number) {
  const sql = getSql()

  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureBlogSchema()

  if (id) {
    await sql`
      update blog_posts
      set title = ${input.title},
          slug = ${input.slug},
          excerpt = ${input.excerpt},
          published_at = ${input.publishedAt},
          reading_time = ${input.readingTime},
          category = ${input.category},
          content = ${JSON.stringify(input.content)}::jsonb,
          published = ${input.published},
          updated_at = now()
      where id = ${id}
    `
    return
  }

  await sql`
    insert into blog_posts (
      title, slug, excerpt, published_at, reading_time, category, content, published
    )
    values (
      ${input.title},
      ${input.slug},
      ${input.excerpt},
      ${input.publishedAt},
      ${input.readingTime},
      ${input.category},
      ${JSON.stringify(input.content)}::jsonb,
      ${input.published}
    )
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

export async function seedFallbackPosts() {
  const sql = getSql()

  if (!sql) {
    throw new Error('DATABASE_URL tanımlı değil.')
  }

  await ensureBlogSchema()

  for (const post of fallbackPosts) {
    await sql`
      insert into blog_posts (
        title, slug, excerpt, published_at, reading_time, category, content, published
      )
      values (
        ${post.title},
        ${post.slug},
        ${post.excerpt},
        ${post.publishedAt},
        ${post.readingTime},
        ${post.category},
        ${JSON.stringify(post.content)}::jsonb,
        true
      )
      on conflict (slug) do nothing
    `
  }
}
