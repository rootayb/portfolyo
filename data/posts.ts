export type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
}

// DATABASE_URL tanımlı değilken gösterilen örnek yazılar.
// Üretimde yazılar admin panelinden Neon veritabanına eklenir.
export const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Özel eğitimde tutarlı ve şeffaf motorlar neden önemli?',
    slug: 'ozel-egitimde-tutarli-seffaf-motorlar',
    excerpt:
      'Aynı girdi için her zaman aynı, gerekçesi gösterilen sonucu üreten sistemlerin özel eğitim değerlendirmelerindeki değeri.',
    content:
      'Özel eğitimde bir değerlendirme aracının güvenilir olması, aynı öğrenci verisi için her zaman aynı sonucu üretmesiyle başlar.\n\nSonucunu gösteremeyen modeller etkileyici görünse de, bir hedefin neden önerildiğini açıklayamadıklarında öğretmenin kararına ortak olamazlar. Kural tabanlı motorlar ise her sonucu gerekçesiyle sunar; böylece öğretmen sistemi bir danışman gibi kullanır, körü körüne değil.\n\nBu yüzden geliştirdiğim motorların tamamı tutarlı ve izlenebilir: beceri analizi de, hedef önerisi de aynı girdi için hep aynı, açık sonucu verir.',
    publishedAt: '2026-07-18',
  },
  {
    id: 2,
    title: 'Modülleri neden bağımsız ve kolay entegre tasarlıyorum?',
    slug: 'bagimsiz-entegre-moduller',
    excerpt:
      'Beceri Analizi ve Davranış Değerlendirme gibi modüllerin herhangi bir projeye kolayca entegre edilebilecek şekilde kurgulanması.',
    content:
      'Bir özel eğitim aracını sıfırdan yazmak yerine, her ihtiyacı bağımsız bir modül olarak tasarlıyorum.\n\nBeceri Analizi, Davranış Değerlendirme veya Hedef Öneri; her biri kendi REST API\'siyle, kendi veri katmanıyla çalışır ve mevcut bir projeye tek başına entegre edilebilir. Temiz kod ve net sınırlar hem test etmeyi kolaylaştırır hem de bir kurumun yalnızca ihtiyaç duyduğu parçayı almasına imkân tanır.\n\nAçık kaynak olmaları ise geliştirilebilir olmalarını sağlar: ihtiyaçlar değiştikçe modüller de birlikte gelişir.',
    publishedAt: '2026-07-12',
  },
]
