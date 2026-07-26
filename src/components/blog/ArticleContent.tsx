'use client';

import { motion } from 'framer-motion';
import { CodeBlock } from '@/components/blog/CodeBlock';
import { DiagramPlaceholder } from '@/components/blog/DiagramPlaceholder';
import { parseInlineMarkdown } from '@/lib/parseInlineMarkdown';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ArticleContentProps {
  content: string;
}

const DIAGRAM_PATTERN = /^\[DIAGRAM TODO:\s*(.+)\]$/;

function AnimatedBlock({
  children,
  index,
  prefersReducedMotion,
  className,
}: {
  children: React.ReactNode;
  index: number;
  prefersReducedMotion: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ArticleContent({ content }: ArticleContentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let blockIndex = 0;
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = 'bash';
  let listBuffer: { text: string; ordered: boolean }[] = [];
  let listOrdered = false;

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;

    const ListTag = listOrdered ? 'ol' : 'ul';
    const currentIndex = blockIndex++;

    elements.push(
      <AnimatedBlock
        key={key}
        index={currentIndex}
        prefersReducedMotion={prefersReducedMotion}
      >
        <ListTag className={`my-6 space-y-2.5 ${listOrdered ? 'list-decimal pl-6' : 'list-none pl-0'}`}>
          {listBuffer.map((item, idx) => (
            <li
              key={idx}
              className={`text-zinc-300 text-sm sm:text-base leading-relaxed ${
                listOrdered ? 'pl-1' : 'flex items-start gap-3'
              }`}
            >
              {!listOrdered && (
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" aria-hidden="true" />
              )}
              <span>{parseInlineMarkdown(item.text)}</span>
            </li>
          ))}
        </ListTag>
      </AnimatedBlock>
    );

    listBuffer = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        const currentIndex = blockIndex++;
        elements.push(
          <CodeBlock
            key={`code-${idx}`}
            code={codeBuffer.join('\n')}
            language={codeLang || 'bash'}
            index={currentIndex}
          />
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList(`list-${idx}`);
        codeLang = trimmed.replace('```', '').trim() || 'bash';
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    const diagramMatch = trimmed.match(DIAGRAM_PATTERN);
    if (diagramMatch) {
      flushList(`list-${idx}`);
      const currentIndex = blockIndex++;
      elements.push(
        <DiagramPlaceholder
          key={`diagram-${idx}`}
          title={diagramMatch[1]}
          index={currentIndex}
        />
      );
      return;
    }

    const isOrderedItem = /^\d+\.\s/.test(trimmed);
    const isBulletItem = trimmed.startsWith('- ');

    if (isOrderedItem || isBulletItem) {
      const itemText = trimmed.replace(/^(-|\d+\.)\s+/, '');
      if (listBuffer.length === 0) {
        listOrdered = isOrderedItem;
      }
      listBuffer.push({ text: itemText, ordered: isOrderedItem });
      return;
    }

    flushList(`list-${idx}`);

    if (trimmed.startsWith('### ')) {
      const currentIndex = blockIndex++;
      elements.push(
        <AnimatedBlock key={`h3-${idx}`} index={currentIndex} prefersReducedMotion={prefersReducedMotion}>
          <h3 className="text-xl font-bold text-white mt-10 mb-4 tracking-tight">
            {parseInlineMarkdown(trimmed.replace('### ', ''))}
          </h3>
        </AnimatedBlock>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      const currentIndex = blockIndex++;
      elements.push(
        <AnimatedBlock key={`h2-${idx}`} index={currentIndex} prefersReducedMotion={prefersReducedMotion}>
          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight border-b border-white/10 pb-3">
            {parseInlineMarkdown(trimmed.replace('## ', ''))}
          </h2>
        </AnimatedBlock>
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      const currentIndex = blockIndex++;
      const quoteText = trimmed.replace('> ', '').replace(/^\*\*|\*\*$/g, '');
      elements.push(
        <AnimatedBlock key={`quote-${idx}`} index={currentIndex} prefersReducedMotion={prefersReducedMotion}>
          <blockquote className="my-8 p-6 rounded-2xl bg-zinc-900/80 border-l-4 border-sky-400 text-zinc-200 italic text-lg leading-relaxed shadow-lg">
            &ldquo;{parseInlineMarkdown(quoteText)}&rdquo;
          </blockquote>
        </AnimatedBlock>
      );
      return;
    }

    if (trimmed === '---') {
      const currentIndex = blockIndex++;
      elements.push(
        <AnimatedBlock key={`hr-${idx}`} index={currentIndex} prefersReducedMotion={prefersReducedMotion}>
          <hr className="my-10 border-white/10" />
        </AnimatedBlock>
      );
      return;
    }

    if (trimmed.length > 0) {
      const currentIndex = blockIndex++;
      elements.push(
        <AnimatedBlock key={`p-${idx}`} index={currentIndex} prefersReducedMotion={prefersReducedMotion}>
          <p className="text-zinc-300 text-base sm:text-lg leading-[1.75] mb-6 max-w-[75ch]">
            {parseInlineMarkdown(trimmed)}
          </p>
        </AnimatedBlock>
      );
    }
  });

  flushList('list-end');

  return (
    <article className="prose prose-invert max-w-none">
      {elements}
    </article>
  );
}
