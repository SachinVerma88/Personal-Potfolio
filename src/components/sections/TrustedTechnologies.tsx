'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';

export function TrustedTechnologies() {
  return (
    <section className="py-12 border-y border-white/10 bg-zinc-950/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-mono tracking-widest text-zinc-400 uppercase mb-8">
          Technologies & Core Stack
        </p>

        {/* Minimalist Tech Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {SITE_DATA.trustedTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              tabIndex={0}
              className="flex items-center gap-2 group cursor-default rounded px-2 py-1 focus-ring transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-sky-400 group-focus-visible:bg-sky-400 transition-colors" />
              <span className="text-sm font-mono font-medium text-zinc-300 group-hover:text-white group-focus-visible:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
