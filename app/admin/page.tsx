import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import {
  deletePostAction,
  loginAction,
  logoutAction,
  savePostAction,
  seedPostsAction,
} from '@/app/admin/actions'
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/admin-auth'
import {
  getPosts,
  isBlogDatabaseConfigured,
  type BlogPost,
} from '@/lib/blog-store'

type AdminPageProps = {
  searchParams: Promise<{ error?: string }>
}

export const metadata = {
  title: 'Yönetim',
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const hasError = params.error === '1'
  const hasValidationError = params.error === 'validation'
  const adminConfigured = isAdminConfigured()
  const databaseConfigured = isBlogDatabaseConfigured()
  const authenticated = await isAdminAuthenticated()

  let databaseError = ''
  let posts: BlogPost[] = []

  if (authenticated) {
    try {
      posts = await getPosts()
    } catch (error) {
      databaseError =
        error instanceof Error
          ? error.message
          : 'Veritabanı bağlantısı kurulamadı.'
    }
  }

  const inputClass =
    'focus-ring w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)]'

  return (
    <main className="section min-h-screen">
      <div className="container max-w-4xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/blog"
              className="focus-ring inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <ArrowLeft aria-hidden="true" size={14} />
              Yazılara dön
            </Link>
            <h1 className="mt-3 text-3xl font-semibold text-[var(--foreground)]">
              Yazı Yönetimi
            </h1>
          </div>
          {authenticated && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="focus-ring rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)]"
              >
                Çıkış Yap
              </button>
            </form>
          )}
        </div>

        {!adminConfigured ? (
          <div className="surface rounded-3xl border border-[var(--line)] p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-[var(--warm)]">
              Sistem Yapılandırılmadı
            </h2>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Ortam değişkenlerine{' '}
              <code className="rounded bg-[var(--surface-soft)] px-1 py-0.5 font-mono text-xs text-[var(--foreground)]">
                ADMIN_PASSWORD
              </code>{' '}
              ekleyin.
            </p>
          </div>
        ) : !authenticated ? (
          <div className="surface mx-auto max-w-md rounded-3xl border border-[var(--line)] p-8">
            <h2 className="mb-6 text-center text-xl font-semibold text-[var(--foreground)]">
              Yönetici Girişi
            </h2>
            <form action={loginAction} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold text-[var(--muted)]"
                >
                  Yönetici Şifresi
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              {hasError && (
                <p className="text-center text-xs font-medium text-[var(--warm)]">
                  Hatalı şifre. Lütfen tekrar deneyin.
                </p>
              )}
              <button
                type="submit"
                className="focus-ring mt-2 rounded-full bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        ) : (
          <div className="grid gap-8">
            {databaseError ? (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-soft)] p-5 text-sm font-medium leading-7 text-[var(--foreground)]">
                Veritabanı açılamadı: {databaseError}
              </div>
            ) : null}

            {!databaseConfigured ? (
              <div className="surface rounded-3xl border border-[var(--line)] p-8 text-center">
                <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                  Veritabanı Yapılandırılmadı
                </h3>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  <code className="rounded bg-[var(--surface-soft)] px-1 py-0.5 font-mono text-xs">
                    DATABASE_URL
                  </code>{' '}
                  bulunamadı. Yazılar kaydedilemez; sitede örnek yazılar gösterilir.
                </p>
              </div>
            ) : (
              <>
                {/* Yeni yazı formu */}
                <section className="surface rounded-[2rem] border border-[var(--line)] p-6 md:p-7">
                  <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
                    Yeni Yazı
                  </h3>
                  {hasValidationError && (
                    <p className="mb-4 text-xs font-medium text-[var(--warm)]">
                      Başlık ve içerik zorunludur.
                    </p>
                  )}
                  <form action={savePostAction} className="flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="mb-2 block text-xs font-semibold text-[var(--muted)]"
                      >
                        Başlık
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        placeholder="Yazının başlığı"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="excerpt"
                        className="mb-2 block text-xs font-semibold text-[var(--muted)]"
                      >
                        Özet (liste ve önizlemede görünür)
                      </label>
                      <textarea
                        name="excerpt"
                        id="excerpt"
                        rows={2}
                        placeholder="Bir-iki cümlelik özet"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="content"
                        className="mb-2 block text-xs font-semibold text-[var(--muted)]"
                      >
                        İçerik (paragrafları boş satırla ayırın)
                      </label>
                      <textarea
                        name="content"
                        id="content"
                        required
                        rows={10}
                        placeholder="Yazının tam metni..."
                        className={`${inputClass} font-sans leading-7`}
                      />
                    </div>
                    <button
                      type="submit"
                      className="focus-ring mt-1 self-start rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
                    >
                      Yazıyı Yayınla
                    </button>
                  </form>
                </section>

                {/* Mevcut yazılar */}
                <section className="surface rounded-[2rem] border border-[var(--line)] p-6 md:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      Yazılar ({posts.length})
                    </h3>
                    {posts.length === 0 && (
                      <form action={seedPostsAction}>
                        <button
                          type="submit"
                          className="focus-ring rounded-full bg-[var(--surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--accent-strong)] transition hover:bg-[var(--accent)] hover:text-white"
                        >
                          Örnek yazıları yükle
                        </button>
                      </form>
                    )}
                  </div>

                  {posts.length === 0 ? (
                    <p className="text-sm leading-7 text-[var(--muted)]">
                      Henüz yazı yok. Yukarıdaki formdan ilk yazını ekle.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {posts.map(post => (
                        <div
                          key={post.id}
                          className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-[var(--muted)]">
                              {post.publishedAt}
                            </p>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="focus-ring mt-1 block text-base font-semibold text-[var(--foreground)] hover:text-[var(--accent-strong)]"
                            >
                              {post.title}
                            </Link>
                            {post.excerpt ? (
                              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                                {post.excerpt}
                              </p>
                            ) : null}
                          </div>
                          <form action={deletePostAction}>
                            <input type="hidden" name="id" value={post.id} />
                            <button
                              type="submit"
                              className="focus-ring rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:border-[var(--warm)] hover:text-[var(--warm)]"
                            >
                              Sil
                            </button>
                          </form>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
