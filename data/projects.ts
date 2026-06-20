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
    title: 'Specia Eğitim Ekosistemi',
    slug: 'specia-ekosistemi',
    summary:
      'Özel eğitim öğretmenleri ve öğrenciler için tasarlanıp geliştirilen web portalı ile iOS/Android mobil uygulamaları.',
    tags: ['Next.js', 'SwiftUI', 'Erişilebilirlik'],
    status: 'Yayında',
    href: 'https://specia.com.tr',
  },
  {
    title: 'Öğrenme Materyali Üreticisi',
    slug: 'ogrenme-materyali-ureticisi',
    summary:
      'Öğretmenlerin özel eğitim hedeflerine uygun basılı ve dijital materyalleri saniyeler içinde tasarlaması için minimal bir web aracı.',
    tags: ['Next.js', 'Tailwind', 'UX'],
    status: 'Fikir',
  },
  {
    title: 'Açık Kaynak Tasarım Kitleri',
    slug: 'tasarim-kitleri',
    summary:
      'Erişilebilir ve sade kullanıcı arayüzleri oluşturmak için hazırlanmış şablonlar, renk paletleri ve Figma kütüphaneleri.',
    tags: ['Figma', 'Arayüz Tasarımı'],
    status: 'Geliştiriliyor',
  },
]
