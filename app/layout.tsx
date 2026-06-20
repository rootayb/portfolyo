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
    'Özel eğitim öğretmeni Alperen Yiğit Bulat için portfolyo, dijital çözüm projeleri ve blog yazıları.',
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
