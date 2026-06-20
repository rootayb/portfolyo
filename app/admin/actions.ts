'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
} from '@/lib/admin-auth'
import {
  addNote,
  deleteNote,
  ensureNotesSchema,
  seedNotes,
} from '@/lib/notes-store'

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

export async function initializeDatabaseAction() {
  await requireAdmin()
  await ensureNotesSchema()
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function seedDatabaseAction() {
  await requireAdmin()
  await seedNotes()
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function saveNoteAction(formData: FormData) {
  await requireAdmin()
  const content = String(formData.get('content') ?? '').trim()
  const category = String(formData.get('category') ?? 'Tasarım').trim() as 'Tasarım' | 'Yazılım' | 'Eğitim'

  if (!content) {
    throw new Error('Not içeriği boş olamaz.')
  }

  await addNote({ content, category })
  revalidatePath('/')
  revalidatePath('/admin')
}

export async function deleteNoteAction(formData: FormData) {
  await requireAdmin()
  const id = Number(formData.get('id'))

  if (Number.isFinite(id)) {
    await deleteNote(id)
  }

  revalidatePath('/')
  revalidatePath('/admin')
}
