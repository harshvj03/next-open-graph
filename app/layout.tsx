import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://your-dealership-domain.com'),
  title: 'Premium Auto Dealership | Your Dream Car Awaits',
  description: 'Discover unbeatable deals on new and certified pre-owned vehicles. Special financing available. Visit us today and drive home in your dream car!',
  keywords: ['car dealership', 'new cars', 'used cars', 'auto sales', 'car financing', 'vehicle deals'],
  openGraph: {
    title: 'Premium Auto Dealership | Your Dream Car Awaits',
    description: 'Discover unbeatable deals on new and certified pre-owned vehicles. Special financing available. Visit us today and drive home in your dream car!',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-dealership-domain.com',
    siteName: 'Premium Auto Dealership',
    images: [
      {
        url: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Luxury vehicles at Premium Auto Dealership showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Auto Dealership | Your Dream Car Awaits',
    description: 'Discover unbeatable deals on new and certified pre-owned vehicles. Special financing available. Visit us today!',
    images: [
      {
        url: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630',
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
