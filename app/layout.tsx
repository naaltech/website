import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
    template: '%s | Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü '
  },
  description: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü - Geleceğin teknolojilerini bugünden keşfeden, üreten ve paylaşan bir topluluk. Yazılım, robotik ve siber güvenlik alanlarında eğitim ve projeler.',
  keywords: ['teknoloji kulübü', 'Nevzat Ayaz', 'NAAL', 'yazılım', 'robotik', 'siber güvenlik', 'programlama', 'hack club', 'öğrenci kulübü', 'Ümraniye'],
  authors: [{ name: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü' }],
  creator: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
  publisher: 'Nevzat Ayaz Anadolu Lisesi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tech.naal.org.tr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://tech.naal.org.tr',
    title: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
    description: 'Geleceğin teknolojilerini bugünden keşfeden, üreten ve paylaşan öğrenci topluluğu.',
    siteName: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
    description: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
    creator: '@naalteknoloji',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <script 
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></script>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
