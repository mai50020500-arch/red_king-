/**
 * Red King — Docking Workspace
 * DockPanel — a single dockable panel that renders its active tab content.
 *
 * State transitions:
 *   normal     — in-flow, sized by parent flex
 *   minimized  — collapses to tab bar height only
 *   maximized  — absolute overlay filling the Workspace area
 *   fullscreen — fixed overlay filling the entire viewport
 */

import React from 'react';
import { PanelTabBar } from './PanelTabBar';
import type { PanelLeaf } from './types';
import { useWorkspace } from './WorkspaceContext';

interface DockPanelProps {
  node:   PanelLeaf;
  /** Whether this is the only remaining panel (no close button shown) */
  isOnly: boolean;
}

/** Placeholder shown in non-main tabs */
const EmptyDockZone: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6 empty-state">
    <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
      <span className="text-zinc-700 text-lg">⊞</span>
    </div>
    <div>
      <p className="text-[11px] font-semibold text-zinc-500 tracking-wider uppercase">
        {title}
      </p>
      <p className="text-[10px] text-zinc-700 mt-1">
        Use the split buttons above to create another panel
      </p>
    </div>
  </div>
);

export const DockPanel: React.FC<DockPanelProps> = ({ node, isOnly }) => {
  const { mainContent } = useWorkspace();
  const isMinimized  = node.state === 'minimized';
  const isMaximized  = node.state === 'maximized';
  const isFullscreen = node.state === 'fullscreen';

  const tabBar = (
    <PanelTabBar
      panelId={node.id}
      tabs={node.tabs}
      activeTabId={node.activeTabId}
      state={node.state}
      isOnly={isOnly}
    />
  );

  const contentArea = !isMinimized && (
    <div className="flex-1 overflow-hidden relative">
      {node.activeTabId === 'main'
        ? mainContent
        : <EmptyDockZone title={node.tabs.find(t => t.id === node.activeTabId)?.title ?? 'Panel'} />
      }
    </div>
  );

  /* Fullscreen — fixed over everything */
  if (isFullscreen) {
    return (
      <>
        {/* In-flow placeholder so siblings don't relayout */}
        <div className="flex-1 min-w-0 min-h-0 bg-[#0a0a0a] border border-white/[0.04] rounded" />

        <div
          className="fixed inset-0 z-[9990] flex flex-col bg-[#090909] border border-red-500/20"
          style={{ animation: 'fadeIn 0.15s ease-out both' }}
        >
          {tabBar}
          {contentArea}
        </div>
      </>
    );
  }

  /* Maximized — absolute over the workspace */
  if (isMaximized) {
    return (
      <>
        {/* In-flow placeholder */}
        <div className="flex-1 min-w-0 min-h-0 bg-[#0a0a0a] border border-white/[0.04] rounded" />

        <div
          className="absolute inset-0 z-40 flex flex-col bg-[#090909] border border-red-500/20"
          style={{ animation: 'fadeIn 0.15s ease-out both' }}
        >
          {tabBar}
          {contentArea}
        </div>
      </>
    );
  }

  /* Normal / Minimized */
  return (
    <div
      className={[
        'flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a] border border-white/[0.05] rounded transition-all duration-200',
        isMinimized ? 'flex-none' : 'flex-1',
      ].join(' ')}
      style={isMinimized ? { flexBasis: '36px' } : undefined}
    >
      {tabBar}
      {contentArea}
    </div>
  );
};
