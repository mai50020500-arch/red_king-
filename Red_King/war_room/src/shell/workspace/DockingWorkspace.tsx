/**
 * Red King — Docking Workspace
 * DockingWorkspace — root component that wires context, toolbar, and layout tree.
 *
 * Accepts `mainContent` which is rendered inside the primary "main" tab.
 * All other docked panels show an EmptyDockZone until content is registered.
 */

import React from 'react';
import { WorkspaceProvider } from './WorkspaceContext';
import { useWorkspaceLayout } from './useWorkspaceLayout';
import { WorkspaceToolbar } from './WorkspaceToolbar';
import { SplitContainer } from './SplitContainer';

interface DockingWorkspaceProps {
  mainContent: React.ReactNode;
}

export const DockingWorkspace: React.FC<DockingWorkspaceProps> = ({ mainContent }) => {
  const layoutState = useWorkspaceLayout();

  const isOnly =
    layoutState.layout.type === 'panel' || layoutState.layout.type !== 'group';

  return (
    <WorkspaceProvider
      value={{
        ...layoutState,
        mainContent,
      }}
    >
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden relative">
        <WorkspaceToolbar />

        {/* Layout area — position:relative so maximized panels can overlay it */}
        <div className="relative flex flex-1 min-h-0 overflow-hidden p-2 gap-0">
          <SplitContainer node={layoutState.layout} isOnly={isOnly} />
        </div>
      </div>
    </WorkspaceProvider>
  );
};
