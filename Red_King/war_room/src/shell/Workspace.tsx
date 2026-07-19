/**
 * Red King — Shell
 * Workspace — Primary Content Area
 */

import React from 'react';

interface WorkspaceProps {
  children: React.ReactNode;
}

export const Workspace: React.FC<WorkspaceProps> = ({ children }) => {
  return (
    <main className="relative flex-1 min-w-0 overflow-hidden flex flex-col bg-[#080808]">
      {/* Subtle vignette — darkens edges for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.35)_100%)]" />
      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        {children}
      </div>
    </main>
  );
};
