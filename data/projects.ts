export type Project = {
  title: string
  slug: string
  summary: string
  tags: string[]
  status: 'Yayında' | 'Geliştiriliyor' | 'Fikir'
  href?: string
}

export const projects: Project[] = [
  {
    title: 'Özel Eğitim Takip Paneli',
    slug: 'ozel-egitim-takip-paneli',
    summary:
      'BEP hedeflerini, gözlem notlarını ve haftalık ilerlemeyi tek yerde tutmayı amaçlayan öğretmen odaklı bir çalışma alanı.',
    tags: ['Next.js', 'Supabase', 'Eğitim'],
    status: 'Geliştiriliyor',
  },
  {
    title: 'Ders Materyali Üretici',
    slug: 'ders-materyali-uretici',
    summary:
      'Öğrencinin kazanımına göre kısa etkinlik, eşleştirme ve görsel destekli çalışma sayfaları tasarlayan modüler araç.',
    tags: ['Üretken AI', 'PDF', 'Erişilebilirlik'],
    status: 'Fikir',
  },
  {
    title: 'Portfolyo ve Blog Altyapısı',
    slug: 'portfolyo-blog-altyapisi',
    summary:
      'Projeleri ve yazıları bağımsız veri modülleriyle yöneten, kolay genişletilebilir kişisel yayın sistemi.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'Yayında',
  },
]
