'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { GitBranch, Github, Code } from 'lucide-react';
import Link from 'next/link';

export function OpenSource() {
  return (
    <section id="open-source" className="py-28 md:py-36 border-t border-white/10 relative bg-zinc-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-medium mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>06 // PUBLIC TOOLING & REPOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Open Source & Boilerplates
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Reusable architectures, starter templates, and security patterns published for the developer community.
          </p>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_DATA.openSourceRepos.map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              tabIndex={0}
              className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between group focus-ring cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-indigo-400 group-hover:bg-indigo-400 group-hover:text-zinc-950 transition-colors">
                    <Code className="w-5 h-5" />
                  </div>
                  <Link
                    href={repo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all focus-ring"
                    aria-label={`View ${repo.name} repository on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                </div>

                <h3 className="text-base font-bold text-white font-mono mb-2 group-hover:text-indigo-300 transition-colors">
                  {repo.name}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {repo.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {repo.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
