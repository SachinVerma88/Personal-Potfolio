'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { Rocket, Bot, Zap, Database, Layout, Server, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function Services() {
  const iconMap: Record<string, any> = {
    Rocket,
    Bot,
    Zap,
    Database,
    Layout,
    Server,
  };

  return (
    <section id="services" className="py-28 md:py-36 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>04 // OUTCOME-DRIVEN SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Engineering & Consultancy Services
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Specialized engineering capabilities focused on clear business outcomes and fast time-to-market.
          </p>
        </div>

        {/* 6-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_DATA.services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Rocket;
            return (
              <motion.a
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                tabIndex={0}
                href="/#contact"
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group border border-white/10 hover:border-sky-400/40 focus-ring cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-400 group-hover:text-zinc-950 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {service.outcome}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-sky-400 transition-colors">
                  <span>Inquire Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-16 p-8 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Have a custom technical challenge?</h3>
            <p className="text-zinc-400 text-sm mt-1">Let's map out your project requirements and technical architecture.</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 text-zinc-950 font-semibold text-xs hover:bg-sky-300 active:scale-[0.98] transition-all shrink-0 focus-ring"
          >
            <span>Book a Technical Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
