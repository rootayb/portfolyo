# Alperen Yiğit Bulat Portfolyo

Özel eğitim öğretmeni ve hobi olarak dijital çözümler geliştiren Alperen Yiğit Bulat için hazırlanmış tek sayfa Next.js portfolyo sitesi.

## Özellikler

- Next.js App Router, TypeScript ve Tailwind CSS
- Tek sayfa portfolyo akışı
- Three.js tabanlı sade hero animasyonu
- Modüler proje veri yapısı
- Neon Postgres'e bağlanabilen blog altyapısı
- Public sayfadan gizlenen `/admin` blog yönetimi
- Blog detay sayfaları
- Instagram, GitHub ve X sosyal bağlantıları
- Erişilebilir odak stilleri ve responsive düzen

## Geliştirme

```bash
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Neon ve Admin

Vercel ortam değişkenlerine aşağıdaki değerleri ekleyin:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require
ADMIN_PASSWORD=guclu-bir-sifre
ADMIN_SESSION_SECRET=uzun-rastgele-bir-secret
```

Sonra `/admin` sayfasına gidip giriş yapın. Panelden veritabanı tablosunu hazırlayabilir, örnek yazıları Neon'a aktarabilir ve yeni blog yazıları ekleyebilirsiniz.

`DATABASE_URL` tanımlı değilken site örnek yazılarla çalışmaya devam eder.

## İçerik Güncelleme

- Projeler: `data/projects.ts`
- Başlangıç blog yazıları: `data/posts.ts`
- Profil ve sosyal bağlantılar: `data/site.ts`

Yeni proje eklemek için `data/projects.ts` dosyasına kayıt eklemek yeterlidir. Blog yazıları üretimde admin paneli üzerinden yönetilir.
