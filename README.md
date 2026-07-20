# Alperen Yiğit Bulat Portfolyo

Özel eğitim öğretmeni ve geliştirici Alperen Yiğit Bulat için hazırlanmış tek sayfa Next.js portfolyo sitesi. Amaç, özel eğitim için geliştirilen açık kaynak motorları, modülleri ve ürünleri öne çıkarmak.

## Özellikler

- Next.js App Router, TypeScript ve Tailwind CSS
- Tek sayfa portfolyo akışı (Profil → Projeler → İletişim)
- Three.js / React Three Fiber ile 3B hero sahnesi
- İmleçle eğilen (3B tilt) derinlikli proje kartları
- Kürate edilmiş proje verisi (GitHub projelerinin isim ve kısa açıklamaları)
- GitHub, Instagram ve X sosyal bağlantıları
- Erişilebilir odak stilleri, `prefers-reduced-motion` desteği ve responsive düzen

## Geliştirme

```bash
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## İçerik Güncelleme

- Projeler: `data/projects.ts` (isim, kısa açıklama, kategori, etiketler, GitHub bağlantısı)
- Profil ve sosyal bağlantılar: `data/site.ts`

Yeni proje eklemek için `data/projects.ts` dosyasına bir kayıt eklemek yeterlidir. `featured: true` verilen projeler vitrinin üst sırasında büyük kart olarak gösterilir.
