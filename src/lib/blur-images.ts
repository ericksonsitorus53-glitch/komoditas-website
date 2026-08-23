import { products } from './data';

type ProductWithBlur = {
  slug: string;
  blurDataURL: string;
};

// Generate a simple SVG-based blur placeholder with dominant color
function generateSVGPlaceholder(width: number, height: number, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Product-specific dominant colors for better blur effect
const productColors: Record<string, string> = {
  'kopi-mandheling-grade1': '#4a3728',
  'lada-hitam-toba': '#2d2d2d',
  'jeruk-medan-premium': '#f97316',
  'madu-hutan-toba': '#d97706',
  'kopi-lanang-gayo': '#5c4033',
  'pisang-barangan': '#facc15',
  'cabe-merah-keriting': '#dc2626',
  'minyak-sawit-mentah': '#ca8a04',
  'teh-dolok-sanggul': '#166534',
  'karet-remah-sumbawa': '#a3a3a3',
  'ikan-mas-bakar-toba': '#ea580c',
  'jahe-merah-organik': '#b91c1c',
  'manggis-segar-deli': '#7e22ce',
  'sarang-burung-walet-premium': '#fef3c7',
  'kepiting-batu-hidup': '#dc2626',
};

let cachedBlurData: ProductWithBlur[] | null = null;

export async function getProductBlurData(): Promise<ProductWithBlur[]> {
  if (cachedBlurData) return cachedBlurData;

  const blurData = products.map((product) => ({
    slug: product.slug,
    blurDataURL: generateSVGPlaceholder(
      320,
      240,
      productColors[product.slug] || '#e5e7eb'
    ),
  }));

  cachedBlurData = blurData;
  return blurData;
}

export function getBlurBySlug(
  blurData: ProductWithBlur[],
  slug: string
): string | undefined {
  return blurData.find((b) => b.slug === slug)?.blurDataURL;
}
