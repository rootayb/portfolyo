import type { Metadata } from 'next'
import {
  deletePostAction,
  initializeBlogDatabaseAction,
  loginAction,
  logoutAction,
  savePostAction,
  seedBlogAction,
} from '@/app/admin/actions'
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/admin-auth'
import {
  getAllPostsForAdmin,
  isBlogDatabaseConfigured,
  slugify,
} from '@/lib/blog-store'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog Yönetimi',
}

type AdminPageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

function TextInput({
  name,
  label,
  defaultValue = '',
  type = 'text',
}: {
  name: string
  label: string
  defaultValue?: string
  type?: string
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
      {label}
      <input
        className="min-h-12 rounded-xl border border-[var(--line)] bg-white px-4 text-sm font-medium outline-none transition focus:border-[var(--accent)]"
        name={name}
        type={type}
        defaultValue={defaultValue}
      />
    </label>
  )
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const adminConfigured = isAdminConfigured()
  const databaseConfigured = isBlogDatabaseConfigured()
  const authenticated = await isAdminAuthenticated()
  const posts = authenticated ? await getAllPostsForAdmin() : []

  return (
    <main className="section">
      <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <aside>
          <h1 className="text-5xl font-semibold leading-none text-[var(--foreground)] md:text-7xl">
            Blog yönetimi
          </h1>
          <p className="mt-6 text-base leading-8 text-[var(--muted)]">
            Yazıları Neon Postgres üzerinde tutan hafif bir admin alanı. Ortam
            değişkenleri tanımlı değilken site statik örnek yazılarla çalışmaya
            devam eder.
          </p>

          <div className="mt-8 grid gap-3 text-sm">
            <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
              <span className="font-semibold">DATABASE_URL</span>
              <p className="mt-1 text-[var(--muted)]">
                {databaseConfigured ? 'Tanımlı' : 'Eksik'}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
              <span className="font-semibold">ADMIN_PASSWORD</span>
              <p className="mt-1 text-[var(--muted)]">
                {adminConfigured ? 'Tanımlı' : 'Eksik'}
              </p>
            </div>
          </div>
        </aside>

        {!adminConfigured ? (
          <section className="surface rounded-[2rem] p-8">
            <h2 className="text-2xl font-semibold">Admin henüz kapalı</h2>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              Vercel ortam değişkenlerine `ADMIN_PASSWORD` ve Neon bağlantısı
              için `DATABASE_URL` ekleyince bu alan aktif olur.
            </p>
          </section>
        ) : !authenticated ? (
          <section className="surface rounded-[2rem] p-8">
            <h2 className="text-2xl font-semibold">Giriş</h2>
            {params?.error ? (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                Şifre hatalı.
              </p>
            ) : null}
            <form action={loginAction} className="mt-6 grid gap-4">
              <TextInput
                name="password"
                label="Admin şifresi"
                type="password"
              />
              <button className="min-h-12 rounded-full bg-[var(--foreground)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]">
                Giriş yap
              </button>
            </form>
          </section>
        ) : (
          <section className="grid gap-8">
            <div className="surface rounded-[2rem] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Yayın akışı</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {posts.length} kayıt görünüyor.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <form action={initializeBlogDatabaseAction}>
                    <button className="min-h-10 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold">
                      Veritabanını hazırla
                    </button>
                  </form>
                  <form action={seedBlogAction}>
                    <button className="min-h-10 rounded-full border border-[var(--line)] bg-white px-4 text-sm font-semibold">
                      Örnek yazıları aktar
                    </button>
                  </form>
                  <form action={logoutAction}>
                    <button className="min-h-10 rounded-full bg-[var(--foreground)] px-4 text-sm font-semibold text-white">
                      Çıkış
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {posts.map(post => (
                  <article
                    className="rounded-2xl border border-[var(--line)] bg-white p-5"
                    key={post.slug}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase text-[var(--accent-strong)]">
                          {post.published ? 'Yayında' : 'Taslak'} ·{' '}
                          {formatDate(post.publishedAt)}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                          /blog/{post.slug}
                        </p>
                      </div>
                      {post.id ? (
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <button className="min-h-10 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-700">
                            Sil
                          </button>
                        </form>
                      ) : null}
                    </div>
                    {post.id ? (
                      <details className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-4">
                        <summary className="cursor-pointer text-sm font-semibold">
                          Düzenle
                        </summary>
                        <form action={savePostAction} className="mt-5">
                          <input type="hidden" name="id" value={post.id} />
                          <div className="grid gap-4 md:grid-cols-2">
                            <TextInput
                              name="title"
                              label="Başlık"
                              defaultValue={post.title}
                            />
                            <TextInput
                              name="slug"
                              label="Slug"
                              defaultValue={post.slug}
                            />
                            <TextInput
                              name="category"
                              label="Kategori"
                              defaultValue={post.category}
                            />
                            <TextInput
                              name="readingTime"
                              label="Okuma süresi"
                              defaultValue={post.readingTime}
                            />
                            <TextInput
                              name="publishedAt"
                              label="Yayın tarihi"
                              type="date"
                              defaultValue={post.publishedAt.slice(0, 10)}
                            />
                            <label className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-4 text-sm font-semibold">
                              <input
                                name="published"
                                type="checkbox"
                                defaultChecked={post.published}
                                className="size-4"
                              />
                              Yayında
                            </label>
                          </div>
                          <label className="mt-4 grid gap-2 text-sm font-semibold">
                            Özet
                            <textarea
                              name="excerpt"
                              defaultValue={post.excerpt}
                              className="min-h-24 rounded-xl border border-[var(--line)] bg-white p-4 text-sm leading-7 outline-none transition focus:border-[var(--accent)]"
                            />
                          </label>
                          <label className="mt-4 grid gap-2 text-sm font-semibold">
                            İçerik
                            <textarea
                              name="content"
                              defaultValue={post.content.join('\n\n')}
                              className="min-h-48 rounded-xl border border-[var(--line)] bg-white p-4 text-sm leading-7 outline-none transition focus:border-[var(--accent)]"
                            />
                          </label>
                          <button className="mt-5 min-h-11 rounded-full bg-[var(--foreground)] px-5 text-sm font-semibold text-white">
                            Güncelle
                          </button>
                        </form>
                      </details>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>

            <form
              action={savePostAction}
              className="surface rounded-[2rem] p-6"
            >
              <h2 className="text-2xl font-semibold">Yeni yazı</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <TextInput name="title" label="Başlık" />
                <TextInput name="slug" label="Slug" />
                <TextInput
                  name="category"
                  label="Kategori"
                  defaultValue="Yazı"
                />
                <TextInput
                  name="readingTime"
                  label="Okuma süresi"
                  defaultValue="3 dk"
                />
                <TextInput
                  name="publishedAt"
                  label="Yayın tarihi"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
                <label className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-white px-4 text-sm font-semibold">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked
                    className="size-4"
                  />
                  Yayında
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-sm font-semibold">
                Özet
                <textarea
                  name="excerpt"
                  className="min-h-24 rounded-xl border border-[var(--line)] bg-white p-4 text-sm leading-7 outline-none transition focus:border-[var(--accent)]"
                />
              </label>
              <label className="mt-4 grid gap-2 text-sm font-semibold">
                İçerik
                <textarea
                  name="content"
                  className="min-h-56 rounded-xl border border-[var(--line)] bg-white p-4 text-sm leading-7 outline-none transition focus:border-[var(--accent)]"
                  placeholder="Paragrafları boş satırla ayır."
                />
              </label>
              <p className="mt-3 text-xs text-[var(--muted)]">
                Slug boş bırakılırsa başlıktan otomatik üretilir. Örnek:{' '}
                {slugify('Yeni Blog Yazısı')}
              </p>
              <button className="mt-6 min-h-12 rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]">
                Yazıyı kaydet
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  )
}
