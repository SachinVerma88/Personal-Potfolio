'use client';

import { motion } from 'framer-motion';
import {
  Activity, Bell, Bot, CheckCircle2, Database, GitBranch, LayoutDashboard,
  RefreshCcw, Server, ShieldCheck, Terminal, Users, Workflow,
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface DiagramPlaceholderProps {
  title: string;
  index: number;
}

type DiagramStep = { label: string; Icon: typeof Server };

function stepsFor(title: string): DiagramStep[] {
  const text = title.toLowerCase();

  if (text.includes('current vs new')) return [
    { label: 'Current server', Icon: Server }, { label: 'Verified transfer', Icon: ShieldCheck }, { label: 'New server', Icon: Server },
  ];
  if (text.includes('nginx')) return [
    { label: 'Nginx', Icon: Server }, { label: 'Gunicorn', Icon: Workflow }, { label: 'Django', Icon: Terminal }, { label: 'PostgreSQL', Icon: Database },
  ];
  if (text.includes('backup')) return [
    { label: 'Production DB', Icon: Database }, { label: 'Encrypted dump', Icon: ShieldCheck }, { label: 'Restore & verify', Icon: CheckCircle2 },
  ];
  if (text.includes('health')) return [
    { label: 'Endpoint probe', Icon: Activity }, { label: 'Logs inspected', Icon: Terminal }, { label: 'Healthy status', Icon: CheckCircle2 },
  ];
  if (text.includes('rollback')) return [
    { label: 'Failure detected', Icon: Activity }, { label: 'Restore version', Icon: RefreshCcw }, { label: 'Re-verify', Icon: CheckCircle2 },
  ];
  if (text.includes('terminal')) return [
    { label: 'Backup', Icon: Database }, { label: 'Sync media', Icon: Workflow }, { label: 'Start services', Icon: Terminal }, { label: 'Verify', Icon: CheckCircle2 },
  ];
  if (text.includes('entity')) return [
    { label: 'Users & roles', Icon: Users }, { label: 'Projects', Icon: Workflow }, { label: 'Tasks', Icon: LayoutDashboard }, { label: 'Activity', Icon: Bell },
  ];
  if (text.includes('api')) return [
    { label: 'React client', Icon: LayoutDashboard }, { label: 'Versioned API', Icon: Workflow }, { label: 'Django services', Icon: Terminal }, { label: 'PostgreSQL', Icon: Database },
  ];
  if (text.includes('authentication')) return [
    { label: 'Login', Icon: Users }, { label: 'JWT issued', Icon: ShieldCheck }, { label: 'Role evaluation', Icon: GitBranch }, { label: 'API access', Icon: CheckCircle2 },
  ];
  if (text.includes('kanban')) return [
    { label: 'To do', Icon: LayoutDashboard }, { label: 'In progress', Icon: Activity }, { label: 'Optimistic update', Icon: RefreshCcw }, { label: 'Done', Icon: CheckCircle2 },
  ];
  if (text.includes('notification')) return [
    { label: 'Mention', Icon: Bell }, { label: 'Permission check', Icon: ShieldCheck }, { label: 'Dispatch', Icon: Workflow }, { label: 'In-app + email', Icon: CheckCircle2 },
  ];
  if (text.includes('dashboard')) return [
    { label: 'Task metrics', Icon: Activity }, { label: 'Team activity', Icon: Users }, { label: 'Project overview', Icon: LayoutDashboard },
  ];
  if (text.includes('deployment architecture')) return [
    { label: 'Developer', Icon: Users }, { label: 'AI agent', Icon: Bot }, { label: 'Deploy engine', Icon: Workflow }, { label: 'Application', Icon: Server },
  ];
  if (text.includes('service lifecycle')) return [
    { label: 'Pre-flight', Icon: ShieldCheck }, { label: 'Deploy', Icon: Workflow }, { label: 'Configure', Icon: Terminal }, { label: 'Verify', Icon: CheckCircle2 },
  ];
  if (text.includes('execution')) return [
    { label: 'Plan', Icon: Bot }, { label: 'Run commands', Icon: Terminal }, { label: 'Configure services', Icon: Server }, { label: 'Report result', Icon: CheckCircle2 },
  ];

  return [
    { label: 'Deploy', Icon: Workflow }, { label: 'Configure', Icon: Terminal }, { label: 'Validate', Icon: CheckCircle2 },
  ];
}

export function DiagramPlaceholder({ title, index }: DiagramPlaceholderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const steps = stepsFor(title);

  return (
    <motion.figure
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="my-9 overflow-hidden rounded-2xl border border-sky-400/15 bg-gradient-to-br from-sky-500/[0.09] via-zinc-900 to-zinc-950 shadow-xl shadow-sky-950/10"
    >
      <figcaption className="px-5 py-4 border-b border-white/10 text-xs font-mono uppercase tracking-[0.14em] text-sky-200/80">
        {title}
      </figcaption>
      <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-3 p-5 sm:p-6">
        {steps.map(({ label, Icon }, stepIndex) => (
          <div key={label} className="relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-zinc-950/65 px-3 py-5 text-center min-h-[132px]">
            <span className="absolute left-3 top-3 text-[10px] font-mono text-sky-400/70">0{stepIndex + 1}</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium leading-snug text-zinc-200">{label}</span>
          </div>
        ))}
      </div>
    </motion.figure>
  );
}
