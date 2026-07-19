/**
 * Red King — Shell
 * BottomConsole
 *
 * Collapsible console drawer anchored to the bottom of the shell body.
 * Height is user-resizable via a drag handle on the top edge.
 * Renders children (Console component) only when open.
 */

import React from 'react';
import { ResizableHandle } from './ResizableHandle';

interface BottomConsoleProps {
  open: boolean;
  height: number;
  onResize: (h: number) => void;
  children: React.ReactNode;
}

export const BottomConsole: React.FC<BottomConsoleProps> = ({
  open,
  height,
  onResize,
  children,
}) => {
  return (
    <section
      style={{ height: open ? height : 0 }}
      className="shrink-0 overflow-hidden transition-[height] duration-200 ease-in-out border-t border-red-500/20 bg-black/40"
    >
      <ResizableHandle direction="top" currentValue={height} onChange={onResize} />
      <div
        style={{ height: height - 4 }} // subtract handle height
        className="overflow-hidden"
      >
        {open && children}
      </div>
    </section>
  );
};
