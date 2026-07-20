import type { Metadata } from 'next'
import './globals.css'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: {
    default: 'Alperen Yiğit Bulat',
    template: '%s | Alperen Yiğit Bulat',
  },
  description:
    'Özel eğitim öğretmeni ve geliştirici Alperen Yiğit Bulat: özel eğitim için geliştirdiği açık kaynak motorlar, modüller ve ürünlerden oluşan portfolyo.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
