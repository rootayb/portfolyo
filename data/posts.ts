export type BlogPost = {
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  readingTime: string
  category: string
  content: string[]
}

export const posts: BlogPost[] = [
  {
    title: 'Özel eğitimde dijital araç seçerken nelere bakıyorum?',
    slug: 'ozel-egitimde-dijital-arac-secimi',
    excerpt:
      'Bir aracın gerçekten işe yarayıp yaramadığını anlamak için sade arayüz, ölçülebilir çıktı ve öğretmen akışına uyumu birlikte düşünmek gerekiyor.',
    publishedAt: '2026-06-21',
    readingTime: '4 dk',
    category: 'Özel eğitim',
    content: [
      'Özel eğitimde teknoloji seçimi yalnızca özellik listesine bakarak yapılmamalı. Aracın sınıf içindeki gerçek akışa uyup uymadığı, öğrenciyi ve öğretmeni yormadan kullanılabilmesi en az teknik yeterlilik kadar önemli.',
      'Benim için iyi bir dijital araç önce öğretmenin yükünü azaltmalı. Kayıt, takip, çıktı alma ve gözlem notu gibi tekrar eden işler sadeleştiğinde öğretmenin asıl enerjisi öğrencinin ihtiyacına dönebiliyor.',
      'Bu yüzden geliştirdiğim küçük çözümlerde veri girişi kadar geri dönüş ekranlarına da önem veriyorum. Bir sistem yalnızca veri toplamamalı; öğretmene karar aldıracak kadar anlaşılır bir özet de sunmalı.',
    ],
  },
  {
    title: 'Hobi projelerini sürdürülebilir kılmak',
    slug: 'hobi-projelerini-surdurulebilir-kilmak',
    excerpt:
      'Küçük kapsam, net veri modeli ve tekrar kullanılabilir bileşenler hobi projelerini yarım kalmaktan kurtarıyor.',
    publishedAt: '2026-06-18',
    readingTime: '3 dk',
    category: 'Geliştirme',
    content: [
      'Hobi olarak geliştirdiğim projelerde en sık karşılaştığım risk, fikrin kapsamının hızla büyümesi. Bunu önlemek için önce tek bir kullanıcı akışını tamamlamaya çalışıyorum.',
      'Modüler dosya yapısı bu noktada önemli. İçerikleri veri dosyalarında, arayüz parçalarını bileşenlerde ve sayfa düzenini rotalarda tutmak sonradan yeni proje veya yazı eklemeyi kolaylaştırıyor.',
      'Bir projeyi sürdürülebilir yapan şey yalnızca kullandığı teknoloji değil; sonraki hafta geri döndüğünüzde nereden devam edeceğinizi hızlıca anlayabilmeniz.',
    ],
  },
  {
    title: 'Erişilebilirlik bir son kontrol değil, tasarım kararıdır',
    slug: 'erisilebilirlik-bir-tasarim-kararidir',
    excerpt:
      'Kontrast, okunabilirlik, klavye erişimi ve sade dil daha en başta tasarım sistemine yerleştiğinde ürün daha güçlü olur.',
    publishedAt: '2026-06-15',
    readingTime: '5 dk',
    category: 'Tasarım',
    content: [
      'Erişilebilirliği geliştirme sürecinin sonunda yapılacak bir kontrol listesi gibi görmek çoğu zaman yetersiz kalıyor. İyi sonuç için kararlar en başta alınmalı.',
      'Metin boyutu, kontrast, boşluk kullanımı ve odak durumları hem özel eğitim bakış açısıyla hem de web ürünü kalitesiyle doğrudan ilişkili.',
      'Bu portfolyo altyapısında da okunabilirlik, açık gezinme ve klavyeyle erişilebilen bağlantılar temel kararlar arasında yer alıyor.',
    ],
  },
]

export function getPostBySlug(slug: string) {
  return posts.find(post => post.slug === slug)
}
