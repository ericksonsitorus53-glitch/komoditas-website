import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog & Artikel | KomoditasSumut',
  description: 'Artikel tentang komoditas Sumatera Utara: analisis pasar ekspor biomassa, tips pertanian kopi, edukasi produk, dan panduan jual beli untuk petani.',
  keywords: ['blog komoditas sumut', 'artikel pertanian', 'analisis pasar komoditas', 'ekspor biomassa'],
  alternates: { canonical: 'https://komoditas-sumut.vercel.app/blog' },
};

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Blog &amp; Artikel</h1>
          <p className="text-lg text-primary-100 mt-4 max-w-2xl mx-auto">
            Insight pasar, tips pertanian, dan edukasi produk dari komunitas KomoditasSumut
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="badge bg-primary-50 text-primary-600 border border-primary-100">
                    <Tag className="w-3 h-3 mr-1" />{post.category}
                  </span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h2 className="font-display font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
