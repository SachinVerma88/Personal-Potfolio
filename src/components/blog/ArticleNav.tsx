'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { BlogPostDetail } from '@/data/blogData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ArticleNavProps {
  prevPost: BlogPostDetail | null;
  nextPost: BlogPostDetail | null;
}

export function ArticleNav({ prevPost, nextPost }: ArticleNavProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10 text-xs font-mono"
    >
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="glass-card rounded-xl p-4 border border-white/10 flex flex-col items-start gap-1 text-zinc-300 hover:text-sky-400 focus-ring min-h-[44px]"
        >
          <span className="text-[11px] text-zinc-500 uppercase flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" /> Previous Article
          </span>
          <span className="font-bold text-white text-sm line-clamp-1">{prevPost.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="glass-card rounded-xl p-4 border border-white/10 flex flex-col items-end gap-1 text-zinc-300 hover:text-sky-400 focus-ring text-right min-h-[44px]"
        >
          <span className="text-[11px] text-zinc-500 uppercase flex items-center gap-1">
            Next Article <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
          <span className="font-bold text-white text-sm line-clamp-1">{nextPost.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </motion.div>
  );
}
