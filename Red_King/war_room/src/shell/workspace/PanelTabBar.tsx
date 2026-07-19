/**
 * Red King — Docking Workspace
 * PanelTabBar — tab strip with panel control actions.
 */

import React from 'react';
import {
  SplitSquareHorizontal,
  SplitSquareVertical,
  Minimize2,
  Maximize2,
  Expand,
  X,
  ChevronUp,
} from 'lucide-react';
import type { PanelTab, PanelState } from './types';
import { useWorkspace } from './WorkspaceContext';

interface PanelTabBarProps {
  panelId:     string;
  tabs:        PanelTab[];
  activeTabId: string;
  state:       PanelState;
  /** Whether this is the only panel (no close allowed) */
  isOnly:      boolean;
}

export const PanelTabBar: React.FC<PanelTabBarProps> = ({
  panelId,
  tabs,
  activeTabId,
  state,
  isOnly,
}) => {
  const { setActiveTab, splitPanel, setPanelState, removePanel } = useWorkspace();

  const isMinimized  = state === 'minimized';
  const isMaximized  = state === 'maximized';
  const isFullscreen = state === 'fullscreen';
  const isElevated   = isMaximized || isFullscreen;

  return (
    <div className="flex items-stretch h-9 shrink-0 bg-[#0e0e0e] border-b border-white/[0.06] overflow-hidden">

      {/* ── Tab list ──────────────────────────────────────────── */}
      <div className="flex items-stretch flex-1 overflow-x-auto overflow-y-hidden min-w-0 shell-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(panelId, tab.id)}
            className={[
              'relative flex items-center gap-1.5 px-3 h-full text-[10px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap transition-all duration-150 shrink-0 border-r border-white/[0.04]',
              tab.id === activeTabId
                ? 'text-red-400 bg-[#141414]'
                : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.03]',
            ].join(' ')}
          >
            {/* Active indicator bar */}
            {tab.id === activeTabId && (
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-500/60 via-red-400/80 to-red-500/60" />
            )}
            {tab.title}
          </button>
        ))}
      </div>

      {/* ── Panel actions ─────────────────────────────────────── */}
      <div className="flex items-center gap-0.5 px-1.5 shrink-0 border-l border-white/[0.05]">
        {/* Split horizontal */}
        {!isMinimized && !isElevated && (
          <BarButton
            title="Split right"
            onClick={() => splitPanel(panelId, 'row')}
          >
            <SplitSquareHorizontal size={12} strokeWidth={1.8} />
          </BarButton>
        )}

        {/* Split vertical */}
        {!isMinimized && !isElevated && (
          <BarButton
            title="Split down"
            onClick={() => splitPanel(panelId, 'col')}
          >
            <SplitSquareVertical size={12} strokeWidth={1.8} />
          </BarButton>
        )}

        {/* Separator */}
        <div className="h-3.5 w-px bg-white/[0.07] mx-0.5" />

        {/* Minimize / restore */}
        {isMinimized ? (
          <BarButton title="Restore" onClick={() => setPanelState(panelId, 'normal')}>
            <ChevronUp size={12} strokeWidth={2} />
          </BarButton>
        ) : (
          <BarButton title="Minimize" onClick={() => setPanelState(panelId, 'minimized')}>
            <Minimize2 size={12} strokeWidth={1.8} />
          </BarButton>
        )}

        {/* Maximize / restore */}
        {isMaximized ? (
          <BarButton title="Restore" onClick={() => setPanelState(panelId, 'normal')} accent>
            <Maximize2 size={12} strokeWidth={1.8} />
          </BarButton>
        ) : !isFullscreen ? (
          <BarButton title="Maximize" onClick={() => setPanelState(panelId, 'maximized')}>
            <Maximize2 size={12} strokeWidth={1.8} />
          </BarButton>
        ) : null}

        {/* Fullscreen / restore */}
        {isFullscreen ? (
          <BarButton title="Exit fullscreen" onClick={() => setPanelState(panelId, 'normal')} accent>
            <Expand size={12} strokeWidth={1.8} />
          </BarButton>
        ) : !isMaximized ? (
          <BarButton title="Fullscreen" onClick={() => setPanelState(panelId, 'fullscreen')}>
            <Expand size={12} strokeWidth={1.8} />
          </BarButton>
        ) : null}

        {/* Close panel */}
        {!isOnly && (
          <>
            <div className="h-3.5 w-px bg-white/[0.07] mx-0.5" />
            <BarButton
              title="Close panel"
              onClick={() => removePanel(panelId)}
              danger
            >
              <X size={11} strokeWidth={2} />
            </BarButton>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Sub-component ─────────────────────────────────────────────── */

interface BarButtonProps {
  onClick: () => void;
  title:   string;
  accent?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}

const BarButton: React.FC<BarButtonProps> = ({ onClick, title, accent, danger, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={[
      'flex items-center justify-center w-6 h-6 rounded transition-all duration-150',
      danger  ? 'text-zinc-600 hover:text-red-400 hover:bg-red-500/10' :
      accent  ? 'text-red-400 hover:text-red-300 hover:bg-red-500/15' :
                'text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06]',
    ].join(' ')}
  >
    {children}
  </button>
);
