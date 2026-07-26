'use client';

import { BlogPostDetail } from '@/data/blogData';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface BlogCardProps {
  post: BlogPostDetail;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden glass-card rounded-2xl border border-white/10 group hover:border-sky-400/40 focus-ring"
      >
        {post.coverImage && (
          <div className="relative aspect-[16/7] overflow-hidden border-b border-white/10 bg-zinc-900">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 mb-3">
          <span>{post.date}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-3 leading-snug">
          {post.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1"
              >
                <Tag className="w-3 h-3 text-zinc-500" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 font-semibold group-hover:translate-x-1 transition-transform">
            <span>Read Post</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
        </div>
      </Link>
    </motion.article>
  );
}
