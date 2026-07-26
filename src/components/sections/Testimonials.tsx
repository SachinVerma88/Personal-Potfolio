'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section id="testimonials" className="py-28 md:py-36 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>06 // SOCIAL PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Client & Peer Recommendations
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Feedback and testimonials from project stakeholders and engineering collaborators.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SITE_DATA.testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              tabIndex={0}
              className="glass-card rounded-2xl p-8 border border-white/10 relative flex flex-col justify-between focus-ring cursor-default"
            >
              <Quote className="w-8 h-8 text-sky-500/20 mb-4" />

              <p className="text-zinc-300 text-base leading-relaxed italic mb-8">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{t.author}</h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">{t.title}</p>
                </div>
                <span className="text-xs font-mono text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2.5 py-1 rounded-md">
                  {t.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
