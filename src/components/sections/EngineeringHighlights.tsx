'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu } from 'lucide-react';

export function EngineeringHighlights() {
  return (
    <section id="highlights" className="py-28 md:py-36 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>01 // CREDIBILITY & PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering Highlights
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Key accomplishments and proven engineering capabilities across full-stack systems, AI integrations, and cloud infrastructure.
          </p>
        </div>

        {/* Highlight Bullets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_DATA.engineeringHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              tabIndex={0}
              className="glass-card rounded-2xl p-6 flex items-start gap-4 group focus-ring cursor-default"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 group-hover:bg-sky-400 group-hover:text-zinc-950 transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                  {highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
