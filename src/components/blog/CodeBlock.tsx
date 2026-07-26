'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Terminal } from 'lucide-react';
import { highlightCode, TOKEN_CLASS } from '@/lib/syntaxHighlight';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  index?: number;
}

export function CodeBlock({ code, language = 'bash', filename, index = 0 }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const highlightedLines = highlightCode(code, language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="my-6 rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-white/10 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          <span>{filename || language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white active:scale-95 transition-all focus-ring min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
          aria-label="Copy code snippet to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 sm:p-5 overflow-x-auto text-xs font-mono leading-relaxed bg-[#09090b]">
        <pre className="whitespace-pre">
          <code>
            {highlightedLines.map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.map((token, tokenIdx) => (
                  <span key={tokenIdx} className={TOKEN_CLASS[token.type]}>
                    {token.value}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
