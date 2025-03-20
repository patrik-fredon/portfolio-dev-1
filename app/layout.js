import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import { LanguageProvider } from './contexts/LanguageContext';
import './globals.css';

// Optimized font loading with display swap for better performance
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  variable: '--font-inter',
});

// Dynamic theme colors for viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'rgb(255, 255, 255)' },
    { media: '(prefers-color-scheme: dark)', color: 'rgb(0, 0, 0)' }
  ],
};

export const metadata = {
  title: {
    template: '%s | Portfolio Template',
    default: 'Portfolio Template',
  },
  description: 'Professional Portfolio Website Template',
  metadataBase: new URL('https://example.com'),
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  verification: {
    google: '',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    title: 'Portfolio Template',
    description: 'Professional Portfolio Website Template',
    siteName: 'Portfolio Template',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Template',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body 
        className="text-theme-foreground antialiased bg-theme-background"
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </LanguageProvider>
        <div id="portal-root" /> {/* For modal windows and portals */}
      </body>
    </html>
  );
}
