# Alperen Yiğit Bulat Portfolyo

Özel eğitim öğretmeni ve geliştirici Alperen Yiğit Bulat için hazırlanmış Next.js portfolyo sitesi. Amaç, özel eğitim için geliştirilen açık kaynak ve geliştirilebilir motorları, modülleri ve ürünleri öne çıkarmak.

## Özellikler

- Next.js App Router, TypeScript ve Tailwind CSS
- Tek sayfa portfolyo akışı (Profil → Projeler) + `/blog` yazı bölümü
- 3B kod paneli hero'su (perspektif, tilt, derinlik katmanları, yazım animasyonu)
- İmleçle eğilen (3B tilt) derinlikli proje ve yazı kartları
- Kürate edilmiş proje verisi (GitHub projelerinin isim ve kısa açıklamaları)
- Neon Postgres'e bağlanan blog altyapısı + şifre korumalı `/admin` yazı yönetimi
- Hero'da sosyal medya bağlantıları (GitHub, Instagram, X, e-posta)
- Erişilebilir odak stilleri, `prefers-reduced-motion` desteği ve responsive düzen

## Geliştirme

```bash
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Blog ve Yönetim

Ortam değişkenlerine aşağıdaki değerleri ekleyin:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require
ADMIN_PASSWORD=guclu-bir-sifre
ADMIN_SESSION_SECRET=uzun-rastgele-bir-secret
```

Ardından `/admin` sayfasına gidip giriş yapın. Panelden yeni yazı ekleyebilir, mevcut yazıları silebilir ve dilerseniz örnek yazıları veritabanına aktarabilirsiniz. Yazılar `/blog` sayfasında ve `/blog/<slug>` detay sayfalarında yayınlanır.

`DATABASE_URL` tanımlı değilken site `data/posts.ts` içindeki örnek yazılarla çalışmaya devam eder.

## İçerik Güncelleme

- Projeler: `data/projects.ts` (isim, kısa açıklama, kategori, etiketler, GitHub bağlantısı)
- Profil ve sosyal bağlantılar: `data/site.ts`
- Örnek/başlangıç yazıları: `data/posts.ts` (üretimde yazılar `/admin` üzerinden yönetilir)
