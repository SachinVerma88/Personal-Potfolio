import { BLOG_POSTS } from '@/data/blogData';
import { BlogCard } from '@/components/blog/BlogCard';
import { ArrowLeft, Newspaper } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical Blog & Writing — Sachin Verma',
  description: 'Articles on system architecture, Django production migrations, enterprise task management, and AI server deployment automation.',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-sky-400 transition-colors focus-ring py-1 px-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            <span>ENGINEERING WRITING & INSIGHTS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Technical Blog
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
            Detailed engineering breakdowns of production migrations, enterprise platform architecture, Django REST Framework, and AI deployment tools.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 gap-8 max-w-4xl">
          {BLOG_POSTS.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
