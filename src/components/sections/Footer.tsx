'use client';

import { SITE_DATA } from '@/data/content';
import { Github, Linkedin, Mail, FileText, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-white/10 bg-zinc-950 text-zinc-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand Identity & Location */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-white font-bold font-sans text-sm">
            <span>{SITE_DATA.identity.name}</span>
            <span className="text-zinc-600">—</span>
            <span className="text-zinc-400 font-mono text-xs font-normal">
              {SITE_DATA.identity.role}
            </span>
          </div>
          <p className="text-zinc-400 text-[11px]">{SITE_DATA.identity.location}</p>
        </div>

        {/* Middle: Social Links */}
        <div className="flex items-center gap-6">
          <a
            href={SITE_DATA.identity.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors focus-ring rounded py-0.5 px-1"
          >
            <Github className="w-4 h-4 text-sky-400" />
            <span>GitHub</span>
          </a>
          <a
            href={SITE_DATA.identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1.5 transition-colors focus-ring rounded py-0.5 px-1"
          >
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${SITE_DATA.identity.email}`}
            className="hover:text-white flex items-center gap-1.5 transition-colors focus-ring rounded py-0.5 px-1"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Email</span>
          </a>
          <a
            href={SITE_DATA.identity.resumeUrl}
            className="hover:text-white flex items-center gap-1.5 transition-colors focus-ring rounded py-0.5 px-1"
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Resume</span>
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">© {new Date().getFullYear()} Sachin Verma</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-sky-400 text-zinc-300 hover:text-white active:scale-95 transition-all focus-ring"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
