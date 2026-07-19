/**
 * Red King — Shell
 * BottomConsole — Premium Console Drawer
 */

import React from 'react';
import { TerminalSquare, X, Minus } from 'lucide-react';
import { ResizableHandle } from './ResizableHandle';

interface BottomConsoleProps {
  open: boolean;
  height: number;
  onResize: (h: number) => void;
  onClose?: () => void;
  children: React.ReactNode;
}

export const BottomConsole: React.FC<BottomConsoleProps> = ({
  open,
  height,
  onResize,
  onClose,
  children,
}) => {
  return (
    <section
      style={{ height: open ? height : 0 }}
      className="shrink-0 overflow-hidden transition-[height] duration-200 ease-out border-t border-white/[0.06] bg-[#0a0a0a] flex flex-col"
    >
      {/* Top accent line */}
      <div className="h-px shrink-0 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      {/* Resize handle */}
      <ResizableHandle direction="top" currentValue={height} onChange={onResize} />

      {/* Console chrome bar */}
      <div className="h-8 shrink-0 flex items-center justify-between px-3 border-b border-white/[0.05] bg-[#0c0c0c]">
        <div className="flex items-center gap-2">
          <TerminalSquare size={12} className="text-red-400/70" strokeWidth={1.8} />
          <span className="text-[9px] font-bold tracking-[0.14em] text-zinc-500 uppercase">
            Console
          </span>
          <span className="text-[9px] text-zinc-700 font-mono">— Red King OS v2.0</span>
        </div>

        <div className="flex items-center gap-1">
          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-5 h-5 rounded text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all duration-150"
              title="Close console"
            >
              <X size={10} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {open && children}
      </div>
    </section>
  );
};
