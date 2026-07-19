/**
 * Red King — Shell
 * Workspace — mounts the DockingWorkspace engine.
 *
 * The `children` prop (IntelFeed + LiveViewport from App.tsx) becomes
 * the `mainContent` slot inside the primary docked panel.
 */

import React from 'react';
import { DockingWorkspace } from './workspace/DockingWorkspace';

interface WorkspaceProps {
  children: React.ReactNode;
}

export const Workspace: React.FC<WorkspaceProps> = ({ children }) => {
  return (
    <main className="relative flex-1 min-w-0 overflow-hidden flex flex-col bg-[#080808]">
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.35)_100%)]" />
      <div className="relative z-10 flex flex-col flex-1 min-h-0 overflow-hidden">
        <DockingWorkspace mainContent={children} />
      </div>
    </main>
  );
};
