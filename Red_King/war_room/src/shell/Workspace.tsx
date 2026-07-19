/**
 * Red King — Shell
 * Workspace
 *
 * The primary content area. Fills all remaining horizontal space between
 * the sidebars. Children are responsible for their own overflow behaviour.
 */

import React from 'react';

interface WorkspaceProps {
  children: React.ReactNode;
}

export const Workspace: React.FC<WorkspaceProps> = ({ children }) => {
  return (
    <main className="flex-1 min-w-0 overflow-hidden flex flex-col">
      {children}
    </main>
  );
};
