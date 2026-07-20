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
    title: 'Özel eğitimde deterministik motorlar neden önemli?',
    slug: 'ozel-egitimde-deterministik-motorlar',
    excerpt:
      'Aynı girdi için her zaman aynı, açıklanabilir çıktı üreten sistemlerin özel eğitim değerlendirmelerindeki değeri.',
    content:
      'Özel eğitimde bir değerlendirme aracının güvenilir olması, aynı öğrenci verisi için her zaman aynı sonucu üretmesiyle başlar.\n\nKara kutu modeller etkileyici görünse de, bir hedefin neden önerildiğini açıklayamadıklarında öğretmenin kararına ortak olamazlar. Deterministik ve kural tabanlı motorlar ise her çıktıyı gerekçesiyle sunar; böylece öğretmen sistemi bir danışman gibi kullanır, körü körüne değil.\n\nBu yüzden geliştirdiğim motorların tamamı deterministik: beceri analizi de, hedef önerisi de aynı girdi için hep aynı, izlenebilir sonucu verir.',
    publishedAt: '2026-07-18',
  },
  {
    id: 2,
    title: 'Modülleri neden bağımsız ve gömülebilir tasarlıyorum?',
    slug: 'bagimsiz-gomulebilir-moduller',
    excerpt:
      'Beceri Analizi ve Davranış Değerlendirme gibi modüllerin herhangi bir projeye entegre edilebilecek şekilde kurgulanması.',
    content:
      'Bir özel eğitim aracını sıfırdan yazmak yerine, her ihtiyacı bağımsız bir modül olarak tasarlıyorum.\n\nBeceri Analizi, Davranış Değerlendirme veya Hedef Öneri; her biri kendi REST API\'siyle, kendi veri katmanıyla çalışır ve mevcut bir projeye tek başına gömülebilir. Bu yaklaşım hem test etmeyi kolaylaştırır hem de bir kurumun yalnızca ihtiyaç duyduğu parçayı almasına imkân tanır.\n\nAçık kaynak olmaları ise geliştirilebilir olmalarını sağlar: ihtiyaçlar değiştikçe modüller de birlikte gelişir.',
    publishedAt: '2026-07-12',
  },
]
