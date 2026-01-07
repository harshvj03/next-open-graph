import type { Metadata } from 'next';
import { fetchAppBranding } from '@/lib/app-branding';

interface BrandLayoutProps {
  children: React.ReactNode;
  params: {
    brand: string;
  };
}

export async function generateMetadata({ params }: BrandLayoutProps): Promise<Metadata> {
  const { brand } = params;
  
  // Fetch app branding data
  const brandingData = await fetchAppBranding(brand);

  // Get the base URL from environment or use a default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://next-open-graph.vercel.app';
  const pageUrl = `${baseUrl}/${brand}`;

  return {
    metadataBase: new URL(baseUrl),
    title: 'Earn $1,000s in Extra Monthly Income - Without Sacrificing Your Free Time',
    description: 'Start earning fast. It\'s as easy as texting. Get paid quickly—and often.',
    keywords: ['car dealership', 'new cars', 'used cars', 'auto sales', 'car financing', 'vehicle deals'],
    openGraph: {
      title: 'Earn $1,000s in Extra Monthly Income - Without Sacrificing Your Free Time',
      description: 'Start earning fast. It\'s as easy as texting. Get paid quickly—and often.',
      type: 'website',
      locale: 'en_US',
      url: pageUrl,
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
  };
}

export default function BrandLayout({ children }: BrandLayoutProps) {
  return <>{children}</>;
}

