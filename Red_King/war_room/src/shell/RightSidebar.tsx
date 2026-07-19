/**
 * Red King — Shell
 * RightSidebar — Premium Enterprise Panel
 */

import React from 'react';

interface RightSidebarProps {
  open: boolean;
  width: number;
  children: React.ReactNode;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ open, width, children }) => {
  return (
    <aside
      style={{ width: open ? width : 0 }}
      className="relative shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
    >
      {/* Left-edge shadow cast onto workspace */}
      <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-l from-transparent to-black/30 z-10" />

      <div
        style={{ width }}
        className="h-full flex flex-col gap-3 p-3 overflow-y-auto overflow-x-hidden shell-scrollbar bg-[#0c0c0c] border-l border-white/[0.04]"
      >
        {children}
      </div>
    </aside>
  );
};
