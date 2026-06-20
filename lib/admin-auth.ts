import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const cookieName = 'ayb_admin'

function sessionValue() {
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET ?? password

  if (!password || !secret) {
    return null
  }

  return createHash('sha256').update(`${password}:${secret}`).digest('hex')
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  )
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export async function isAdminAuthenticated() {
  const expected = sessionValue()

  if (!expected) {
    return false
  }

  const cookieStore = await cookies()
  const actual = cookieStore.get(cookieName)?.value

  return Boolean(actual && safeEqual(actual, expected))
}

export async function createAdminSession() {
  const value = sessionValue()

  if (!value) {
    throw new Error('ADMIN_PASSWORD tanımlı değil.')
  }

  const cookieStore = await cookies()
  cookieStore.set(cookieName, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(cookieName)
}
