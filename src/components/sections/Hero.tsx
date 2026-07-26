'use client';

import { motion } from 'framer-motion';
import { SITE_DATA } from '@/data/content';
import { ArrowUpRight, ChevronRight, Terminal, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-24 md:pt-40 md:pb-32 flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 text-xs font-mono mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{SITE_DATA.identity.statusBadge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            {SITE_DATA.identity.headline}
            <span className="block text-zinc-400 font-normal text-3xl sm:text-4xl lg:text-5xl mt-2">
              Building production software for businesses.
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed mb-10">
            {SITE_DATA.identity.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              href={SITE_DATA.identity.primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-sky-400 hover:text-zinc-950 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/5 focus-ring cursor-pointer"
            >
              <span>{SITE_DATA.identity.primaryCTA.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href={SITE_DATA.identity.secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900/90 text-zinc-200 font-medium text-sm border border-white/10 hover:border-zinc-700 hover:bg-zinc-800/60 active:scale-[0.98] transition-all duration-200 focus-ring cursor-pointer"
            >
              <span>{SITE_DATA.identity.secondaryCTA.label}</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>

          {/* Key Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
            <div>
              <p className="text-2xl font-bold text-white font-mono">100%</p>
              <p className="text-xs text-zinc-400 mt-1">Production Ready</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-mono">Full Stack</p>
              <p className="text-xs text-zinc-400 mt-1">Frontend to DevOps</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-mono">AI Native</p>
              <p className="text-xs text-zinc-400 mt-1">LLMs & Agents</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Code & Architecture Terminal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full"
        >
          <div className="relative rounded-2xl bg-zinc-950/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>consultant.config.ts</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                VERIFIED
              </div>
            </div>

            {/* Code Block Content */}
            <div className="font-mono text-xs leading-relaxed space-y-3">
              <div>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-sky-300">consultant</span> = &#123;
              </div>
              <div className="pl-4">
                <span className="text-zinc-400">engineer:</span>{' '}
                <span className="text-amber-300">"{SITE_DATA.identity.name}"</span>,
              </div>
              <div className="pl-4">
                <span className="text-zinc-400">focus:</span> [
                <span className="text-emerald-300">"SaaS MVPs"</span>,{' '}
                <span className="text-emerald-300">"AI Workflows"</span>,{' '}
                <span className="text-emerald-300">"Backends"</span>],
              </div>
              <div className="pl-4">
                <span className="text-zinc-400">stack:</span> &#123;
              </div>
              <div className="pl-8 text-zinc-300">
                core: <span className="text-sky-300">["Next.js", "React", "TypeScript"]</span>,
              </div>
              <div className="pl-8 text-zinc-300">
                backend: <span className="text-sky-300">["Node.js", "PostgreSQL", "FastAPI"]</span>,
              </div>
              <div className="pl-8 text-zinc-300">
                ai: <span className="text-sky-300">["Gemini API", "OpenAI", "RAG"]</span>,
              </div>
              <div className="pl-4">&#125;,</div>
              <div className="pl-4">
                <span className="text-zinc-400">standard:</span>{' '}
                <span className="text-emerald-300">"Type-Safe & Production-First"</span>
              </div>
              <div>&#125;;</div>
            </div>

            {/* Live System Indicator */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Vercel / Docker Verified
              </span>
              <span className="text-zinc-400">Latency: 14ms</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
