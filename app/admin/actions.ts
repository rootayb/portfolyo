'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
} from '@/lib/admin-auth'
import { addPost, deletePost, seedPosts } from '@/lib/blog-store'

export async function loginAction(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const expected = process.env.ADMIN_PASSWORD

  if (!expected || password !== expected) {
    redirect('/admin?error=1')
  }

  await createAdminSession()
  redirect('/admin')
}

export async function logoutAction() {
  await clearAdminSession()
  redirect('/admin')
}

async function requireAuth() {
  const ok = await isAdminAuthenticated()
  if (!ok) {
    redirect('/admin')
  }
}

export async function savePostAction(formData: FormData) {
  await requireAuth()

  const title = String(formData.get('title') ?? '').trim()
  const excerpt = String(formData.get('excerpt') ?? '').trim()
  const content = String(formData.get('content') ?? '').trim()

  if (!title || !content) {
    redirect('/admin?error=validation')
  }

  await addPost({ title, excerpt, content })
  revalidatePath('/admin')
  revalidatePath('/blog')
  redirect('/admin')
}

export async function deletePostAction(formData: FormData) {
  await requireAuth()

  const id = Number(formData.get('id'))
  if (Number.isFinite(id)) {
    await deletePost(id)
    revalidatePath('/admin')
    revalidatePath('/blog')
  }
  redirect('/admin')
}

export async function seedPostsAction() {
  await requireAuth()
  await seedPosts()
  revalidatePath('/admin')
  revalidatePath('/blog')
  redirect('/admin')
}
