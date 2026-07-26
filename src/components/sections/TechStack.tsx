'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { Layers, Terminal } from 'lucide-react';

export function TechStack() {
  return (
    <section id="tech-stack" className="py-28 md:py-36 border-t border-white/10 relative bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-medium mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>05 // SYSTEM ARCHITECTURE STACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technical Stack & Ecosystem
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            A structured breakdown of core frameworks, databases, AI tools, and infrastructure used in production.
          </p>
        </div>

        {/* Categorized Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_DATA.techStackCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              tabIndex={0}
              className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between focus-ring cursor-default"
            >
              <div>
                <h3 className="text-sm font-mono font-bold text-sky-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <Terminal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
