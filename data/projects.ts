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
    title: 'Eğitim Takip Arayüzü',
    slug: 'ozel-egitim-takip-paneli',
    summary:
      'Öğretmenlerin gözlem notlarını, kazanım takibini ve haftalık çıktıları sade bir akışta tutması için arayüz çalışması.',
    tags: ['Product Design', 'Next.js', 'Eğitim'],
    status: 'Geliştiriliyor',
  },
  {
    title: 'Materyal Üretim Sistemi',
    slug: 'ders-materyali-uretici',
    summary:
      'Öğrenme hedefinden kısa etkinlik, görsel destek ve çıktı dokümanı üreten modüler dijital ürün fikri.',
    tags: ['AI', 'UX', 'Erişilebilirlik'],
    status: 'Fikir',
  },
  {
    title: 'Kişisel Yayın Altyapısı',
    slug: 'portfolyo-blog-altyapisi',
    summary:
      'Tek sayfa portfolyo, blog detayları ve sade içerik yayın akışı için hazırlanmış kişisel web altyapısı.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'Yayında',
  },
]
