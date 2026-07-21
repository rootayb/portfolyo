export type ProjectCategory = 'Ürün' | 'Altyapı & Motorlar' | 'Modül'

export type Project = {
  title: string
  slug: string
  // Projenin ne hakkında olduğunu anlatan kısa özet (kürate, GitHub'dan birebir çekilmez)
  summary: string
  tags: string[]
  category: ProjectCategory
  href?: string
  // Ana vitrinde büyük kart olarak öne çıkarılan projeler
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Specia Eğitim Ekosistemi',
    slug: 'specia',
    summary:
      'Özel eğitim öğretmenleri ve öğrenciler için tasarlanıp geliştirilen web portalı ve iOS/Android uygulamalarından oluşan bütünleşik ürün ailesi.',
    tags: ['Next.js', 'SwiftUI', 'Erişilebilirlik'],
    category: 'Ürün',
    href: 'https://specia.com.tr',
    featured: true,
  },
  {
    title: 'Specia Open',
    slug: 'specia-open',
    summary:
      'BEP (Bireyselleştirilmiş Eğitim Programı) ve değerlendirmeler için tamamen yerel çalışan, açık kaynak özel eğitim aracı. Veriler cihazda kalır.',
    tags: ['Next.js', 'SQLite', 'Açık Kaynak'],
    category: 'Ürün',
    href: 'https://github.com/rootayb/specia-open',
    featured: true,
  },
  {
    title: 'Special Education Kernel (SEK)',
    slug: 'special-education-kernel',
    summary:
      'Özel eğitim motorlarını modüller hâlinde birbirine bağlayan altyapı. Her modül tek tek eklenip çıkarılabilir; temiz ve geliştirilebilir bir yapı. TypeScript ve Swift sürümleri.',
    tags: ['TypeScript', 'Swift', 'Plugin Mimarisi'],
    category: 'Altyapı & Motorlar',
    href: 'https://github.com/rootayb/special-education-kernel-ts',
    featured: true,
  },
  {
    title: 'Beceri Analizi Motoru',
    slug: 'task-analysis-assessment-engine',
    summary:
      'Basamak bazlı beceri analizini yürüten değerlendirme motoru; sonuçları her zaman tutarlı ve izlenebilir. Herhangi bir projeye entegre edilebilen bağımsız kütüphane.',
    tags: ['TypeScript', 'Swift', 'Değerlendirme'],
    category: 'Altyapı & Motorlar',
    href: 'https://github.com/rootayb/task-analysis-assessment-engine-ts',
  },
  {
    title: 'Hedef Öneri Motoru',
    slug: 'goal-recommendation-engine',
    summary:
      'Öğrencinin değerlendirme verisinden eğitim hedefleri öneren motor. Her öneriyi gerekçesiyle sunar; sonuç şeffaf ve izlenebilir.',
    tags: ['TypeScript', 'Swift', 'Kural Tabanlı'],
    category: 'Altyapı & Motorlar',
    href: 'https://github.com/rootayb/goal-recommendation-engine-ts',
  },
  {
    title: 'SEK Modülleri',
    slug: 'sek-modules',
    summary:
      'Special Education Kernel için hazır modül entegreleri: Beceri Analizi ve Hedef Öneri parçalarını sisteme bağlayan entegrasyon katmanı.',
    tags: ['TypeScript', 'Swift', 'Eklenti'],
    category: 'Altyapı & Motorlar',
    href: 'https://github.com/rootayb/sek-modules-ts',
  },
  {
    title: 'Beceri Analizi Modülü',
    slug: 'beceri-analizi',
    summary:
      'Basamak bazlı beceri analizini uçtan uca yöneten bağımsız modül: REST API, SQLite depolama ve PDF/Word çıktısıyla herhangi bir projeye entegre edilir.',
    tags: ['Next.js', 'SQLite', 'REST API'],
    category: 'Modül',
    href: 'https://github.com/rootayb/beceri-analizi',
  },
  {
    title: 'Davranış Değerlendirme',
    slug: 'davranis-degerlendirme',
    summary:
      'ABC (Öncül–Davranış–Sonuç) modeline dayalı Uygulamalı Davranış Analizi modülü. Bağımsız çalışır, mevcut bir projeye REST API üzerinden bağlanır.',
    tags: ['Next.js', 'SQLite', 'ABA'],
    category: 'Modül',
    href: 'https://github.com/rootayb/davranis-degerlendirme',
  },
]

export const featuredProjects = projects.filter(project => project.featured)
export const otherProjects = projects.filter(project => !project.featured)
