'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
} from '@/lib/admin-auth'
import {
  deletePost,
  ensureBlogSchema,
  seedFallbackPosts,
  slugify,
  upsertPost,
} from '@/lib/blog-store'

function readPostForm(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const rawSlug = String(formData.get('slug') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const category = String(formData.get('category') ?? 'Yazı').trim()
  const readingTime = String(formData.get('readingTime') ?? '3 dk').trim()
  const publishedAt = String(
    formData.get('publishedAt') ?? new Date().toISOString().slice(0, 10)
  )
  const content = String(formData.get('content') ?? '')
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
  const published = formData.get('published') === 'on'
  const slug = rawSlug ? slugify(rawSlug) : slugify(title)

  if (!title || !slug || !excerpt || content.length === 0) {
    throw new Error('Başlık, özet ve içerik zorunlu.')
  }

  return {
    title,
    slug,
    excerpt,
    category,
    readingTime,
    publishedAt,
    content,
    published,
  }
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin')
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') ?? '')

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin?error=1')
  }

  await createAdminSession()
  redirect('/admin')
}

export async function logoutAction() {
  await clearAdminSession()
  redirect('/admin')
}

export async function initializeBlogDatabaseAction() {
  await requireAdmin()
  await ensureBlogSchema()
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function seedBlogAction() {
  await requireAdmin()
  await seedFallbackPosts()
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function savePostAction(formData: FormData) {
  await requireAdmin()
  const idValue = String(formData.get('id') ?? '')
  const id = idValue ? Number(idValue) : undefined

  await upsertPost(readPostForm(formData), id)
  revalidatePath('/')
  revalidatePath('/blog/[slug]', 'page')
  revalidatePath('/admin')
  redirect('/admin')
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin()
  const id = Number(formData.get('id'))

  if (Number.isFinite(id)) {
    await deletePost(id)
  }

  revalidatePath('/')
  revalidatePath('/admin')
}
