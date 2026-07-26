'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderCode, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RelatedWorkCardProps {
  relatedProjectSlug?: string;
}

export function RelatedWorkCard({ relatedProjectSlug }: RelatedWorkCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!relatedProjectSlug) return null;

  const project = SITE_DATA.selectedWork.find((p) => p.id === relatedProjectSlug);
  if (!project) return null;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="my-12 p-6 sm:p-8 rounded-2xl glass-panel border border-sky-400/30 relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>RELATED PRODUCTION WORK</span>
        </div>
        <span className="text-xs font-mono text-zinc-400">{project.role}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderCode className="w-5 h-5 text-sky-400" aria-hidden="true" />
            <span>{project.name}</span>
          </h4>
          <p className="text-sm text-zinc-300 mt-1 max-w-xl leading-relaxed">
            {project.overview}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/#work"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400 text-zinc-950 font-semibold text-xs hover:bg-sky-300 active:scale-[0.98] transition-all shrink-0 focus-ring min-h-[44px]"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
