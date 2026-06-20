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
    title: 'Specia Web',
    slug: 'specia-web',
    summary:
      'specia.com.tr üzerinde çalışan web deneyimi; ürün anlatımı, erişilebilirlik ve hızlı yayın akışı için tasarlandı.',
    tags: ['Next.js', 'Product Design', 'Web'],
    status: 'Yayında',
    href: 'https://specia.com.tr',
  },
  {
    title: 'Specia iOS',
    slug: 'specia-ios',
    summary:
      'Specia ekosisteminin iOS uygulaması; mobil kullanım, sade akışlar ve gerçek kullanıcı ihtiyaçları üzerine kurulu.',
    tags: ['iOS', 'SwiftUI', 'Mobile'],
    status: 'Yayında',
  },
  {
    title: 'Specia Android',
    slug: 'specia-android',
    summary:
      'Specia için Android sürümü geliştirme aşamasında; iOS deneyimiyle tutarlı, sade ve hızlı bir mobil yapı hedefleniyor.',
    tags: ['Android', 'Mobile', 'Geliştirme'],
    status: 'Geliştiriliyor',
  },
]
