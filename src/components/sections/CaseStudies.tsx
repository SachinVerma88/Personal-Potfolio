'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Wrench } from 'lucide-react';

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-28 md:py-36 border-t border-white/10 relative bg-zinc-950/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>03 // TECHNICAL WRITE-UPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technical Case Studies
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            In-depth breakdowns of complex technical problems, architectural trade-offs, and lessons learned in production.
          </p>
        </div>

        {/* Case Studies Index Grid */}
        <div className="grid grid-cols-1 gap-8">
          {SITE_DATA.caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              tabIndex={0}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 focus-ring"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    {cs.client || 'Internal Architecture'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {cs.title}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{cs.metrics}</span>
                </div>
              </div>

              {/* 4-Block Technical Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase mb-1">Problem Statement</h4>
                  <p className="text-zinc-300 leading-relaxed">{cs.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                  <h4 className="text-xs font-mono text-zinc-400 uppercase mb-1">Core Challenge</h4>
                  <p className="text-zinc-300 leading-relaxed">{cs.challenges}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                  <h4 className="text-xs font-mono text-indigo-400 uppercase mb-1">Architectural Solution</h4>
                  <p className="text-zinc-300 leading-relaxed">{cs.solution}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
                  <h4 className="text-xs font-mono text-emerald-400 uppercase mb-1">Lessons Learned</h4>
                  <p className="text-zinc-300 leading-relaxed">{cs.lessonsLearned}</p>
                </div>
              </div>

              {/* Tools Used */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Wrench className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Tools & Stack:</span>
                  <div className="flex flex-wrap gap-1.5 ml-2">
                    {cs.tools.map((tool) => (
                      <span key={tool} className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-white/10">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
