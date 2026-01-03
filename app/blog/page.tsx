import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export default function BlogIndex() {
  return (
    <main className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            EV Charging <span className="text-emerald-500">Guides</span>
          </h1>
          <p className="text-xl text-slate-600">
            Tips, tricks, and costs for electric vehicle owners.
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:border-emerald-400 transition group"
            >
              <div className="text-sm text-emerald-600 font-bold mb-2">{post.date}</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition">
                {post.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 text-emerald-600 font-medium flex items-center">
                Read Article <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}