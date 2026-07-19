/**
 * Red King — Shell
 * TopBar
 *
 * Fixed application header. Receives toggle callbacks from AppShell
 * so sidebar and console visibility can be controlled from the bar.
 */

import React from 'react';
import { Activity, Skull, PanelLeft, PanelRight, Terminal } from 'lucide-react';

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
    <header className="h-[52px] shrink-0 px-4 border-b border-red-500/20 flex items-center justify-between bg-black/60 z-20">

      {/* Left: logo + panel toggles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLeft}
          title={leftOpen ? 'Collapse left panel' : 'Expand left panel'}
          className={[
            'p-1 rounded transition-colors duration-150',
            leftOpen
              ? 'text-red-500/70 hover:text-red-500'
              : 'text-zinc-600 hover:text-red-500/70',
          ].join(' ')}
        >
          <PanelLeft size={15} />
        </button>

        <div className="flex items-center gap-3 pl-1">
          <h1 className="text-xl font-black tracking-tighter text-red-500 leading-none">
            RED KING <span className="text-zinc-600">|</span> WAR ROOM
          </h1>
          <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-3">
            <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] text-red-500/60 font-bold tracking-widest uppercase">
              System Online
            </span>
          </div>
        </div>
      </div>

      {/* Right: actions + right panel toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleBottom}
          title={bottomOpen ? 'Close console' : 'Open console'}
          className={[
            'flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] uppercase font-bold tracking-wider transition-all duration-150',
            bottomOpen
              ? 'border border-red-500/70 bg-red-500/20 text-red-400'
              : 'border border-zinc-700/50 bg-zinc-900/40 text-zinc-500 hover:border-red-500/40 hover:text-red-500/70',
          ].join(' ')}
        >
          <Terminal size={11} />
          Console
        </button>

        <button className="flex items-center gap-1.5 border border-red-500/50 px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-150 text-[9px] uppercase font-bold tracking-wider text-red-400">
          <Activity size={11} />
          Status: ACTIVE
        </button>

        <button className="flex items-center gap-1.5 border border-red-500/50 px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500 hover:text-white transition-all duration-150 text-[9px] uppercase font-bold tracking-wider text-red-400">
          <Skull size={11} />
          Forensics
        </button>

        <button
          onClick={onToggleRight}
          title={rightOpen ? 'Collapse right panel' : 'Expand right panel'}
          className={[
            'p-1 rounded transition-colors duration-150 ml-1',
            rightOpen
              ? 'text-red-500/70 hover:text-red-500'
              : 'text-zinc-600 hover:text-red-500/70',
          ].join(' ')}
        >
          <PanelRight size={15} />
        </button>
      </div>
    </header>
  );
};
