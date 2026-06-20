import {
  deleteNoteAction,
  initializeDatabaseAction,
  loginAction,
  logoutAction,
  saveNoteAction,
  seedDatabaseAction,
} from '@/app/admin/actions'
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/admin-auth'
import {
  getNotes,
  isBlogDatabaseConfigured,
  type MicroNote,
} from '@/lib/notes-store'

type AdminPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const hasError = params.error === '1'
  const adminConfigured = isAdminConfigured()
  const databaseConfigured = isBlogDatabaseConfigured()
  const authenticated = await isAdminAuthenticated()
  let databaseError = ''
  let notes: MicroNote[] = []

  if (authenticated) {
    try {
      notes = await getNotes()
    } catch (error) {
      databaseError =
        error instanceof Error
          ? error.message
          : 'Veritabanı bağlantısı kurulamadı.'
    }
  }

  return (
    <main className="section min-h-screen bg-[var(--background)] py-20">
      <div className="container max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[var(--foreground)]">
            Admin Paneli
          </h1>
          {authenticated && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="focus-ring rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-neutral-50 transition"
              >
                Çıkış Yap
              </button>
            </form>
          )}
        </div>

        {!adminConfigured ? (
          <div className="surface rounded-3xl p-8 text-center border border-[var(--line)]">
            <h2 className="text-xl font-semibold text-red-500 mb-2">
              Sistem Yapılandırılmadı
            </h2>
            <p className="text-sm leading-7 text-[var(--muted)]">
              Lütfen `.env` veya çevre değişkenleri dosyasına{' '}
              <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-800 font-mono text-xs">ADMIN_PASSWORD</code>{' '}
              tanımlayın.
            </p>
          </div>
        ) : !authenticated ? (
          <div className="mx-auto max-w-md surface rounded-3xl p-8 border border-[var(--line)] shadow-sm">
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6 text-center">
              Yönetici Girişi
            </h2>
            <form action={loginAction} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[var(--muted)] mb-2"
                >
                  Yönetici Şifresi
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)]"
                />
              </div>

              {hasError && (
                <p className="text-xs font-medium text-red-500 text-center">
                  Hatalı şifre. Lütfen tekrar deneyin.
                </p>
              )}

              <button
                type="submit"
                className="focus-ring rounded-xl bg-[var(--accent-strong)] px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition mt-2"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        ) : (
          <div className="grid gap-8">
            {databaseError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium leading-7 text-red-800">
                Mikro-not veritabanı açılamadı: {databaseError}
              </div>
            ) : null}

            {!databaseConfigured ? (
              <div className="surface rounded-3xl p-8 text-center border border-[var(--line)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  Veritabanı Yapılandırılmadı
                </h3>
                <p className="text-sm leading-7 text-[var(--muted)] mb-6">
                  DATABASE_URL çevre değişkeni bulunamadı. Değişiklikleriniz veritabanına kaydedilemez ve statik notlar gösterilir.
                </p>
              </div>
            ) : (
              notes.length === 0 &&
              !databaseError && (
                <div className="surface rounded-3xl p-8 text-center border border-[var(--line)]">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    Veritabanı Boş
                  </h3>
                  <p className="text-sm leading-7 text-[var(--muted)] mb-6">
                    Henüz veritabanında hiç mikro-not yok. Başlangıç verilerini aktarmak ister misiniz?
                  </p>
                  <div className="flex justify-center gap-3">
                    <form action={initializeDatabaseAction}>
                      <button
                        type="submit"
                        className="focus-ring rounded-xl bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-neutral-200 transition"
                      >
                        Tabloyu Oluştur
                      </button>
                    </form>
                    <form action={seedDatabaseAction}>
                      <button
                        type="submit"
                        className="focus-ring rounded-xl bg-[var(--accent-strong)] px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90 transition"
                      >
                        Örnek Notları Yükle (Seed)
                      </button>
                    </form>
                  </div>
                </div>
              )
            )}

            {/* Yeni Not Ekleme Formu */}
            {databaseConfigured && !databaseError && (
              <section className="surface rounded-[2rem] p-6 border border-[var(--line)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                  Yeni Mikro-Not Ekle
                </h3>
                <form action={saveNoteAction} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-xs font-semibold text-[var(--muted)] mb-2"
                    >
                      Not İçeriği (1-2 Cümle)
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      required
                      rows={2}
                      placeholder="Öğrenme deneyimi ve arayüz kararları üzerine bir cümle..."
                      className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm text-[var(--foreground)] focus:border-[var(--accent)] font-sans"
                    />
                  </div>

                  <div className="w-48">
                    <label
                      htmlFor="category"
                      className="block text-xs font-semibold text-[var(--muted)] mb-2"
                    >
                      Kategori
                    </label>
                    <select
                      name="category"
                      id="category"
                      required
                      className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm bg-white text-[var(--foreground)] focus:border-[var(--accent)]"
                    >
                      <option value="Tasarım">Tasarım</option>
                      <option value="Yazılım">Yazılım</option>
                      <option value="Eğitim">Eğitim</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="focus-ring self-start rounded-xl bg-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition mt-2"
                  >
                    Notu Kaydet
                  </button>
                </form>
              </section>
            )}

            {/* Mevcut Notlar Listesi */}
            {databaseConfigured && !databaseError && notes.length > 0 && (
              <section className="surface rounded-[2rem] p-6 border border-[var(--line)]">
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">
                  Mevcut Mikro-Notlar ({notes.length})
                </h3>
                <div className="flex flex-col gap-4">
                  {notes.map(note => (
                    <div
                      key={note.id}
                      className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
                          <span className="text-[var(--accent-strong)]">
                            {note.category}
                          </span>
                          <span>·</span>
                          <span>{note.publishedAt}</span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-[var(--foreground)]">
                          {note.content}
                        </p>
                      </div>
                      <form action={deleteNoteAction}>
                        <input type="hidden" name="id" value={note.id} />
                        <button
                          type="submit"
                          className="focus-ring rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
