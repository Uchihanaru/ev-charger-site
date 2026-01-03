import { blogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// This tells Next.js which blog posts exist so it can build them
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  return (
    <main className="bg-slate-50 min-h-screen py-20">
      <article className="max-w-3xl mx-auto px-6 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/blog" className="text-slate-400 hover:text-emerald-600 text-sm font-bold mb-8 inline-block">
          ← Back to Guides
        </Link>
        
        <header className="mb-10">
          <span className="text-emerald-600 font-bold tracking-wide uppercase text-sm">
            {post.date}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6 leading-tight">
            {post.title}
          </h1>
        </header>

        {/* This renders the HTML content we wrote in lib/blog.ts */}
        <div 
          className="prose prose-slate prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Call to Action at bottom of article */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="font-bold text-xl mb-4">Ready to charge?</h3>
          <Link 
            href="/" 
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition"
          >
            Find a Station Near You
          </Link>
        </div>
      </article>
    </main>
  );
}