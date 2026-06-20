export type MicroNote = {
  id: number
  content: string
  publishedAt: string
  category: 'Tasarım' | 'Yazılım' | 'Eğitim'
}

export const notes: MicroNote[] = [
  {
    id: 1,
    content:
      'Özel eğitim alanındaki arayüzlerde motor/bilişsel yükü azaltmak için butonların tıklama alanlarını en az 80px tutmak ve tek ekranda tek karara odaklanmak gerekiyor.',
    publishedAt: '2026-06-21',
    category: 'Eğitim',
  },
  {
    id: 2,
    content:
      'Web Audio API sayesinde sıfır paket bağımlılığıyla tarayıcı üzerinde offline çalışan temiz ses sentezleme ve geri bildirim motorları geliştirmek oldukça verimli.',
    publishedAt: '2026-06-18',
    category: 'Yazılım',
  },
  {
    id: 3,
    content:
      'Bir üründe erişilebilirliği sonradan eklenecek bir kontrol listesi değil, daha en başta renk kontrastı ve tipografiyle başlayan temel bir tasarım kararı olarak görüyorum.',
    publishedAt: '2026-06-15',
    category: 'Tasarım',
  },
]
