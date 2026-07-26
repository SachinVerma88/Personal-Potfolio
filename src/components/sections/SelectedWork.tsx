'use client';

import { SITE_DATA } from '@/data/content';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderCode, Users, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function SelectedWork() {
  return (
    <section id="work" className="py-28 md:py-36 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-medium mb-4">
            <FolderCode className="w-3.5 h-3.5" />
            <span>02 // CASE STUDY CARDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Selected Professional Work
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Detailed case studies of production applications built with full-stack ownership.
          </p>
        </div>

        {/* Vertical Case Study Sections */}
        <div className="space-y-24">
          {SITE_DATA.selectedWork.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              tabIndex={0}
              className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/10 overflow-hidden focus-ring"
            >
              {/* Media Header */}
              {project.heroVideo && (
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 border border-white/10 bg-zinc-950 relative group">
                  <video
                    src={project.heroVideo}
                    controls
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title & Metadata Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-white/10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    {project.name}
                  </h3>
                  <p className="text-sky-400 text-sm sm:text-base font-medium mt-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-400 text-zinc-950 font-semibold text-xs hover:bg-sky-300 active:scale-[0.98] transition-all focus-ring"
                    >
                      <span>Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-white/10 font-medium text-xs hover:text-white hover:border-zinc-700 active:scale-[0.98] transition-all focus-ring"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repo</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-white/5 mb-8 text-xs">
                <div>
                  <span className="text-zinc-400 block font-mono text-[11px] uppercase mb-1">Role</span>
                  <span className="text-zinc-200 font-medium">{project.role}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono text-[11px] uppercase mb-1">Team Size</span>
                  <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-sky-400" /> {project.teamSize}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-400 block font-mono text-[11px] uppercase mb-1">Stack</span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-white/10 text-[11px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overview & Contributions */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-2">Overview</h4>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">Key Contributions</h4>
                  <ul className="space-y-2.5">
                    {project.contributions.map((contribution, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Challenge Solved Block */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-mono text-amber-400 font-semibold mb-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>Technical Challenge Solved</span>
                  </div>
                  <p className="text-amber-200/90 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
