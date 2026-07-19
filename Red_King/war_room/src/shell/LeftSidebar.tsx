/**
 * Red King — Shell
 * LeftSidebar — Premium Enterprise Panel
 */

import React from 'react';

interface LeftSidebarProps {
  open: boolean;
  width: number;
  children: React.ReactNode;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ open, width, children }) => {
  return (
    <aside
      style={{ width: open ? width : 0 }}
      className="relative shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
    >
      {/* Right-edge shadow cast onto workspace */}
      <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-r from-transparent to-black/30 z-10" />

      <div
        style={{ width }}
        className="h-full flex flex-col gap-3 p-3 overflow-y-auto overflow-x-hidden shell-scrollbar bg-[#0c0c0c] border-r border-white/[0.04]"
      >
        {children}
      </div>
    </aside>
  );
};
