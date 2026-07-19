/**
 * Red King — Shell
 * RightSidebar
 *
 * Collapsible right panel. Width is controlled by AppShell via props.
 * When collapsed the panel slides off-screen via CSS width transition.
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
      className="shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out"
    >
      <div
        style={{ width }}
        className="h-full flex flex-col gap-4 p-4 overflow-y-auto overflow-x-hidden custom-scrollbar"
      >
        {children}
      </div>
    </aside>
  );
};
