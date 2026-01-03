import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-dealership-domain.com'),
  title: 'Earn $1,000s in Extra Monthly Income - Without Sacrificing Your Free Time',
  description: 'Start earning fast. It\'s as easy as texting. Get paid quickly—and often.',
  keywords: ['car dealership', 'new cars', 'used cars', 'auto sales', 'car financing', 'vehicle deals'],
  openGraph: {
    title: 'Earn $1,000s in Extra Monthly Income - Without Sacrificing Your Free Time',
    description: 'Start earning fast. It\'s as easy as texting. Get paid quickly—and often.',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-dealership-domain.com',
    siteName: 'Premium Auto Dealership',
    images: [
      {
        url: 'https://shareurl.ai/app-branding/2025-12-16T04-21-39-711Z-App%20-%20Logo%20-%20Top%20Nav.png',
        width: 1200,
        height: 630,
        alt: 'Luxury vehicles at Premium Auto Dealership showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earn $1,000s in Extra Monthly Income - Without Sacrificing Your Free Time',
    description: 'Start earning fast. It\'s as easy as texting. Get paid quickly—and often.',
    images: [
      {
        url: 'https://shareurl.ai/app-branding/2025-12-16T04-21-39-711Z-App%20-%20Logo%20-%20Top%20Nav.png',
        alt: 'Luxury vehicles at Premium Auto Dealership showroom',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
