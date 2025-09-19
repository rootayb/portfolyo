# Özel Eğitim Öğrenci Yönetim Sistemi

Özel eğitim öğretmenleri için tasarlanmış, öğrenci bilgilerini, BEP (Bireyselleştirilmiş Eğitim Programı) planlarını ve dosyalarını güvenli bir şekilde yönetebileceğiniz modern web uygulaması.

## 🚀 Özellikler

- **Güvenli Kimlik Doğrulama**: Supabase Auth ile e-posta/şifre tabanlı giriş
- **Rol Tabanlı Erişim**: Öğretmen ve veli rolleri ile farklı yetki seviyeleri
- **Öğrenci Yönetimi**: Öğrenci bilgilerini ekleme, düzenleme ve görüntüleme
- **BEP Plan Yönetimi**: Bireyselleştirilmiş eğitim programları oluşturma ve takip etme
- **Güvenli Dosya Yönetimi**: Supabase Storage ile private dosya yükleme ve paylaşım
- **Gelişim Takibi**: Öğrencilerin hedeflerindeki ilerlemeyi izleme
- **Responsive Tasarım**: Mobil ve masaüstü cihazlarda optimal kullanım
- **KVKK Uyumlu**: Kişisel veri koruma ilkeleri gözetilerek tasarlanmış

## 🛠 Teknoloji Yığını

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, Supabase
- **Veritabanı**: PostgreSQL (Supabase)
- **Kimlik Doğrulama**: Supabase Auth
- **Dosya Depolama**: Supabase Storage
- **Test**: Jest, React Testing Library, Cypress
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 📋 Gereksinimler

- Node.js 18.18.0 veya üzeri
- npm veya yarn
- Supabase hesabı

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/your-username/ozel-egitim-sistemi.git
cd ozel-egitim-sistemi
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Supabase Veritabanını Kurun

1. Supabase Dashboard'da yeni bir proje oluşturun
2. SQL Editor'da `supabase/migrations.sql` dosyasını çalıştırın
3. Seed data için `supabase/seed.sql` dosyasını çalıştırın

### 5. Uygulamayı Çalıştırın

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 📊 Demo Hesapları

Uygulamayı test etmek için aşağıdaki demo hesapları kullanabilirsiniz:

### Öğretmen Hesabı
- **E-posta**: ogretmen@demo.com
- **Şifre**: Demo123!
- **Yetki**: Tüm öğrencileri ve BEP planlarını yönetebilir

### Veli Hesapları
- **E-posta**: veli1@demo.com / **Şifre**: Demo123!
- **E-posta**: veli2@demo.com / **Şifre**: Demo123!
- **Yetki**: Sadece kendi çocuklarının bilgilerini görüntüleyebilir

## 🧪 Test Çalıştırma

### Unit Testler
```bash
npm test
```

### Coverage Raporu
```bash
npm run test:coverage
```

### E2E Testler
```bash
npm run cypress:open  # Interaktif mod
npm run cypress:run   # Headless mod
```

## 🏗 Build ve Deploy

### Local Build
```bash
npm run build
npm start
```

### Vercel Deploy

1. Vercel hesabınıza bağlayın:
```bash
npx vercel login
```

2. Projeyi deploy edin:
```bash
npx vercel --prod
```

3. Environment variables'ları Vercel dashboard'dan ayarlayın

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router sayfaları
│   ├── auth/              # Kimlik doğrulama sayfaları
│   ├── dashboard/         # Ana dashboard
│   ├── students/          # Öğrenci yönetimi
│   ├── bep/              # BEP plan yönetimi
│   ├── upload/           # Dosya yükleme
│   └── progress/         # Gelişim takibi
├── components/            # React bileşenleri
│   ├── ui/               # Temel UI bileşenleri
│   └── layout/           # Layout bileşenleri
├── lib/                  # Utility fonksiyonları
│   ├── supabase.ts       # Supabase client
│   ├── auth.ts           # Auth utilities
│   ├── storage.ts        # File storage utilities
│   └── utils.ts          # Genel utilities
├── supabase/             # Veritabanı migration'ları
├── __tests__/            # Unit testler
├── cypress/              # E2E testler
└── .github/workflows/    # CI/CD pipeline
```

## 🔒 Güvenlik

Bu uygulama aşağıdaki güvenlik önlemlerini içerir:

- **Row Level Security (RLS)**: Veritabanı seviyesinde veri erişim kontrolü
- **Private Storage**: Dosyalar private bucket'ta saklanır
- **Signed URLs**: Dosya erişimi kısa ömürlü imzalı URL'ler ile
- **Role-based Access**: Kullanıcı rollerine göre erişim kontrolü
- **Input Validation**: Zod ile form validasyonu
- **HTTPS Only**: Tüm iletişim şifreli

## 📋 KVKV Uyumluluk Kontrol Listesi

- [ ] Veri minimizasyonu: Sadece gerekli veriler toplanıyor
- [ ] Amaç sınırlaması: Veriler sadece eğitim amaçlı kullanılıyor
- [ ] Veri güvenliği: Şifreleme ve erişim kontrolleri mevcut
- [ ] Saklama süresi: Veriler gerektiği kadar saklanıyor
- [ ] Erişim hakları: Kullanıcılar kendi verilerine erişebiliyor
- [ ] Veri taşınabilirliği: Veriler export edilebilir
- [ ] Silme hakkı: Veriler silinebilir
- [ ] Aydınlatma metni: Kullanıcılar bilgilendirilmiş

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.

## 📞 İletişim

Proje hakkında sorularınız için:
- GitHub Issues: [Issues sayfası](https://github.com/your-username/ozel-egitim-sistemi/issues)
- E-posta: your-email@example.com

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projeleri kullanmaktadır:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

**Not**: Bu sistem özel eğitim alanında çalışan profesyoneller için tasarlanmıştır. Gerçek kullanımda KVKK ve diğer veri koruma yönetmeliklerine uygunluğunuzdan emin olun.
