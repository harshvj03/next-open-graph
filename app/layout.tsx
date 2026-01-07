import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { extractBrandId, fetchAppBranding } from '@/lib/app-branding';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  // Extract brand identifier from headers/URL
  const headersList = headers();
  const brandId = extractBrandId(headersList);
  
  // Fetch app branding data
  const brandingData = await fetchAppBranding(brandId);

  return {
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
      siteName: 'Blabber',
      images: [
        {
          url: brandingData.imageUrl,
          width: brandingData.width,
          height: brandingData.height,
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
          url: brandingData.imageUrl,
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
}

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
