interface AppBrandingResponse {
  statusCode: number;
  message: string;
  data: {
    openGraph: {
      openGraphName: string;
      openGraphImagePixel: string;
      isCompleted: boolean;
    };
  };
}

interface OpenGraphImagePixel {
  width: number;
  height: number;
  x: number;
  y: number;
  crop: {
    x: number;
    y: number;
  };
  zoom: number;
}

interface BrandingData {
  imageUrl: string;
  width: number;
  height: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://business-api.uat.itsblabber.com/v1/app-branding';
const SHAREURL_BASE = process.env.NEXT_PUBLIC_SHAREURL_BASE || 'https://shareurl.ai';
const FALLBACK_IMAGE_URL = process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL || 'https://shareurl.ai/app-branding/2025-12-16T04-21-39-711Z-App%20-%20Logo%20-%20Top%20Nav.png';
const DEFAULT_DIMENSIONS = {
  width: parseInt(process.env.NEXT_PUBLIC_DEFAULT_IMAGE_WIDTH || '1200', 10),
  height: parseInt(process.env.NEXT_PUBLIC_DEFAULT_IMAGE_HEIGHT || '630', 10),
};

/**
 * Extracts brand identifier from URL path or headers
 * Checks pathname segments and query parameters
 * Defaults to "StarA" if not found
 */
export function extractBrandId(headers: Headers): string {
  let pathname = '';
  let fullUrl = '';
  
  // Try to get pathname from x-pathname header (Vercel/Next.js)
  pathname = headers.get('x-pathname') || '';
  
  // If not available, try to construct from referer or x-url header
  if (!pathname) {
    const referer = headers.get('referer') || '';
    const xUrl = headers.get('x-url') || '';
    const host = headers.get('host') || '';
    
    if (xUrl) {
      fullUrl = xUrl;
    } else if (referer) {
      fullUrl = referer;
    } else if (host) {
      // Try to get from x-forwarded-proto and host
      const proto = headers.get('x-forwarded-proto') || 'https';
      fullUrl = `${proto}://${host}`;
    }
    
    if (fullUrl) {
      try {
        const url = new URL(fullUrl);
        pathname = url.pathname;
      } catch (error) {
        console.warn('Failed to parse URL:', error);
      }
    }
  }
  
  // Extract first path segment (e.g., /Newte -> Newte)
  if (pathname) {
    // Remove leading slash and get first segment
    const segments = pathname.split('/').filter(segment => segment.length > 0);
    if (segments.length > 0) {
      const firstSegment = segments[0];
      // Exclude common paths that aren't brand identifiers
      if (firstSegment && !['api', 'app', '_next', 'favicon.ico'].includes(firstSegment.toLowerCase())) {
        return firstSegment;
      }
    }
  }
  
  // Check query parameter as fallback
  if (fullUrl) {
    try {
      const url = new URL(fullUrl);
      const brandParam = url.searchParams.get('brand');
      if (brandParam) {
        return brandParam;
      }
    } catch (error) {
      // Ignore URL parsing errors
    }
  }
  
  // Default fallback
  return 'StarA';
}

/**
 * Parses openGraphImagePixel JSON string to extract dimensions
 */
function parseImagePixel(pixelData: string): { width: number; height: number } {
  try {
    const parsed: OpenGraphImagePixel = JSON.parse(pixelData);
    return {
      width: parsed.width || DEFAULT_DIMENSIONS.width,
      height: parsed.height || DEFAULT_DIMENSIONS.height,
    };
  } catch (error) {
    console.warn('Failed to parse openGraphImagePixel:', error);
    return DEFAULT_DIMENSIONS;
  }
}

/**
 * Constructs the full image URL with shareurl.ai base
 */
function constructImageUrl(openGraphName: string): string {
  if (!openGraphName) {
    return FALLBACK_IMAGE_URL;
  }
  
  // Remove leading slash if present
  const cleanPath = openGraphName.startsWith('/') ? openGraphName.slice(1) : openGraphName;
  
  // Split path segments and encode each segment separately to preserve slashes
  const encodedSegments = cleanPath.split('/').map(segment => encodeURIComponent(segment));
  const encodedPath = encodedSegments.join('/');
  
  return `${SHAREURL_BASE}/${encodedPath}`;
}

/**
 * Fetches app branding data from the API
 * Returns branding data with fallback handling
 */
export async function fetchAppBranding(brandId: string): Promise<BrandingData> {
  try {
    const response = await fetch(`${API_BASE_URL}/${brandId}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data: AppBrandingResponse = await response.json();

    if (data.statusCode !== 200 || !data.data?.openGraph?.openGraphName) {
      throw new Error('Invalid API response structure');
    }

    const { openGraphName, openGraphImagePixel } = data.data.openGraph;
    const dimensions = parseImagePixel(openGraphImagePixel || '{}');
    const imageUrl = constructImageUrl(openGraphName);

    return {
      imageUrl,
      width: dimensions.width,
      height: dimensions.height,
    };
  } catch (error) {
    console.error('Failed to fetch app branding:', error);
    // Return fallback data
    return {
      imageUrl: FALLBACK_IMAGE_URL,
      width: DEFAULT_DIMENSIONS.width,
      height: DEFAULT_DIMENSIONS.height,
    };
  }
}

