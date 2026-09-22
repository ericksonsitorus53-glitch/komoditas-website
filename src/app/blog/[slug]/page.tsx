import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: `${post.title} | KomoditasSumut`,
    description: post.excerpt,
    keywords: [post.category, 'komoditas sumut', 'blog pertanian'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1280, height: 853, alt: post.title }],
    },
    alternates: { canonical: `https://komoditas-sumut.vercel.app/blog/${post.slug}` },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-forest-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary-100 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-100 mb-4">
            <span className="badge bg-white/10 text-white border border-white/20">
              <Tag className="w-3 h-3 mr-1" />{post.category}
            </span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">{post.title}</h1>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
          </div>
          <div className="card p-8 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {others.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Artikel Lainnya</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map((other) => (
                  <Link key={other.slug} href={`/blog/${other.slug}`} className="card p-4 hover:border-primary-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-1">{other.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{other.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
