'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { Layers, Database, CheckCircle2, Server, Briefcase, Brain, Sparkles } from 'lucide-react';

export function WhatIBringToATeam() {
  const iconMap: Record<string, any> = {
    Layers,
    Database,
    CheckCircle2,
    Server,
    Briefcase,
    Brain,
  };

  return (
    <section id="what-i-bring" className="py-28 md:py-36 border-t border-white/10 relative bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VALUE PILLARS // WHY WORK WITH ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            What I Bring to a Team
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            A combination of full-stack execution, production DevOps capabilities, feature ownership, and a product-focused mindset.
          </p>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_DATA.whatIBringToATeam.map((pillar, index) => {
            const IconComponent = iconMap[pillar.iconName] || CheckCircle2;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                tabIndex={0}
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group border border-white/10 hover:border-sky-400/40 focus-ring cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-400 group-hover:text-zinc-950 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-sky-400 font-medium">Pillar 0{index + 1}</span>
                  <span className="text-zinc-400">Production Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
