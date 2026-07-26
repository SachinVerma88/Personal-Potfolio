'use client';

import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { BlogPostDetail } from '@/data/blogData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Image from 'next/image';

interface ArticleHeaderProps {
  post: BlogPostDetail;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-12 pb-8 border-b border-white/10"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-4">
        <span>{post.date}</span>
        <span aria-hidden="true">•</span>
        <span className="flex items-center gap-1.5 text-sky-400">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {post.readTime}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6 max-w-[75ch]">
        {post.title}
      </h1>

      {post.subtitle && (
        <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed italic border-l-2 border-sky-400 pl-4 py-1 mb-6 max-w-[75ch]">
          {post.subtitle}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-md bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1"
          >
            <Tag className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
            {tag}
          </span>
        ))}
      </div>

      {post.coverImage && (
        <div className="relative aspect-[16/8] mt-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-sky-950/20">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 3rem), 768px"
            className="object-cover"
          />
        </div>
      )}
    </motion.header>
  );
}
