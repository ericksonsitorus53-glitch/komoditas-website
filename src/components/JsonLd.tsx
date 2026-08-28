export default function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KomoditasSumut',
    alternateName: 'Komoditas Sumut',
    url: 'https://komoditas-sumut.vercel.app',
    logo: 'https://komoditas-sumut.vercel.app/logo.png',
    description: 'Platform jual beli komoditas hasil bumi Sumatera Utara. Kopi Mandheling, rempah, buah, sayuran, dan produk perkebunan terbaik langsung dari petani.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Pelita 1 No. 26',
      addressLocality: 'Medan Perjuangan',
      addressRegion: 'Sumatera Utara',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-853-7701-8574',
      contactType: 'customer service',
      availableLanguage: ['Indonesian'],
    },
    sameAs: [
      'https://www.instagram.com/komoditassumut',
      'https://www.facebook.com/komoditassumut',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KomoditasSumut',
    alternateName: 'Komoditas Sumut',
    url: 'https://komoditas-sumut.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://komoditas-sumut.vercel.app/produk?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'id',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: { name: string; description: string; image: string; price: number; slug: string; stock: number; rating: number; reviews?: number; seller?: string; category: string; origin: string; } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'KomoditasSumut',
    },
    offers: {
      '@type': 'Offer',
      url: `https://komoditas-sumut.vercel.app/produk/${product.slug}`,
      priceCurrency: 'IDR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: product.seller || 'KomoditasSumut',
      },
    },
    category: product.category,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Asal',
        value: product.origin,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
