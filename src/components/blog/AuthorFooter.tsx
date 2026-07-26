'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { SITE_DATA } from '@/data/content';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function AuthorFooter() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="my-14 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-sky-400 font-mono text-base font-bold">
          SV
        </div>
        <div>
          <h4 className="text-base font-bold text-white">{SITE_DATA.identity.name}</h4>
          <p className="text-xs font-mono text-zinc-400">
            {SITE_DATA.identity.role} @ {SITE_DATA.identity.company}
          </p>
        </div>
      </div>
      <Link
        href="/#contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-sky-400 active:scale-[0.98] transition-all focus-ring shrink-0 min-h-[44px]"
      >
        <Mail className="w-4 h-4" aria-hidden="true" />
        <span>Get in Touch</span>
      </Link>
    </motion.div>
  );
}
