'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  blurDataURL,
  priority = false,
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-[4/3]">
      {/* Skeleton Loading */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 rounded-2xl overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">
              <svg
                className="w-12 h-12 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        placeholder="blur"
        blurDataURL={blurDataURL}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
