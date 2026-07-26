'use client';

import { BLOG_POSTS } from '@/data/blogData';
import { motion } from 'framer-motion';
import { Newspaper, Clock, ArrowUpRight, Tag } from 'lucide-react';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function TechnicalBlog() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-28 md:py-36 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <Newspaper className="w-3.5 h-3.5" aria-hidden="true" />
            <span>07 // WRITING & INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technical Blog & Writing
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Articles on system architecture, production migrations, enterprise platform design, and deployment automation.
          </p>
        </div>

        <div className="space-y-6">
          {featuredPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-sky-400/40 focus-ring"
              >
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                    <span>{post.date}</span>
                    <span aria-hidden="true">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-400" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3 text-zinc-500" aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors focus-ring py-2 px-3 rounded-lg min-h-[44px]"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
