/**
 * Red King — Shell
 * TopBar — Premium Enterprise Header
 */

import React from 'react';
import {
  Activity,
  Skull,
  PanelLeft,
  PanelRight,
  TerminalSquare,
  Hexagon,
  ChevronRight,
} from 'lucide-react';

interface TopBarProps {
  leftOpen: boolean;
  rightOpen: boolean;
  bottomOpen: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onToggleBottom: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  leftOpen,
  rightOpen,
  bottomOpen,
  onToggleLeft,
  onToggleRight,
  onToggleBottom,
}) => {
  return (
    <header className="relative h-[48px] shrink-0 flex items-center justify-between px-3 z-30 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.06]">
      {/* Accent line — top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

      {/* ── Left: panel toggle + wordmark ───────────────────────── */}
      <div className="flex items-center gap-1">
        <IconButton
          onClick={onToggleLeft}
          active={leftOpen}
          title={leftOpen ? 'Collapse left panel' : 'Expand left panel'}
        >
          <PanelLeft size={14} />
        </IconButton>

        <div className="flex items-center gap-2.5 pl-2">
          {/* Logo mark */}
          <div className="relative">
            <Hexagon
              size={20}
              className="text-red-500/80 fill-red-500/10"
              strokeWidth={1.5}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-red-400 leading-none">
              RK
            </span>
          </div>

          {/* Wordmark */}
          <div className="flex items-center gap-1.5">
            <h1 className="text-[13px] font-black tracking-[0.08em] leading-none bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent uppercase">
              Red King
            </h1>
            <ChevronRight size={10} className="text-zinc-700" strokeWidth={2.5} />
            <span className="text-[11px] font-semibold tracking-[0.06em] text-zinc-500 uppercase">
              War Room
            </span>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-white/[0.06]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            <span className="text-[9px] font-bold tracking-[0.14em] text-red-500/50 uppercase">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: actions + panel toggle ───────────────────────── */}
      <div className="flex items-center gap-1.5">
        {/* Console toggle */}
        <button
          onClick={onToggleBottom}
          title={bottomOpen ? 'Close console' : 'Open console'}
          className={[
            'flex items-center gap-1.5 px-2.5 h-7 rounded text-[9px] font-bold tracking-[0.10em] uppercase transition-all duration-150',
            bottomOpen
              ? 'bg-red-500/15 border border-red-500/40 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
              : 'bg-white/[0.03] border border-white/[0.07] text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300 hover:border-white/[0.12]',
          ].join(' ')}
        >
          <TerminalSquare size={11} strokeWidth={1.8} />
          Console
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-white/[0.08] mx-0.5" />

        {/* Status button */}
        <ActionButton icon={<Activity size={11} strokeWidth={1.8} />} label="Status: Active" />

        {/* Forensics button */}
        <ActionButton icon={<Skull size={11} strokeWidth={1.8} />} label="Forensics" />

        {/* Divider */}
        <div className="h-4 w-px bg-white/[0.08] mx-0.5" />

        <IconButton
          onClick={onToggleRight}
          active={rightOpen}
          title={rightOpen ? 'Collapse right panel' : 'Expand right panel'}
        >
          <PanelRight size={14} />
        </IconButton>
      </div>
    </header>
  );
};

/* ── Sub-components ───────────────────────────────────────────── */

interface IconButtonProps {
  onClick: () => void;
  active: boolean;
  title: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, active, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={[
      'flex items-center justify-center w-7 h-7 rounded transition-all duration-150',
      active
        ? 'text-red-400/80 bg-red-500/10 hover:text-red-400 hover:bg-red-500/15'
        : 'text-zinc-600 bg-transparent hover:text-zinc-300 hover:bg-white/[0.05]',
    ].join(' ')}
  >
    {children}
  </button>
);

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label }) => (
  <button className="flex items-center gap-1.5 px-2.5 h-7 rounded text-[9px] font-bold tracking-[0.10em] uppercase transition-all duration-150 bg-white/[0.03] border border-white/[0.07] text-zinc-500 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400">
    {icon}
    {label}
  </button>
);
