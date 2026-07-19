/**
 * Red King — Docking Workspace
 * React context — exposes layout state and actions to all child components.
 */

import React, { createContext, useContext } from 'react';
import type { LayoutNode, Direction, PanelState, WorkspaceProfile } from './types';

export interface WorkspaceContextValue {
  layout:           LayoutNode;
  profiles:         WorkspaceProfile[];
  activeProfileId:  string;
  /** The content rendered in the "main" tab slot */
  mainContent:      React.ReactNode;

  splitPanel:       (panelId: string, direction: Direction) => void;
  removePanel:      (panelId: string) => void;
  setPanelState:    (panelId: string, state: PanelState) => void;
  updateGroupSizes: (groupId: string, sizes: number[]) => void;
  setActiveTab:     (panelId: string, tabId: string) => void;
  resetLayout:      () => void;
  setProfile:       (profileId: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return ctx;
}

interface WorkspaceProviderProps {
  value:    WorkspaceContextValue;
  children: React.ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ value, children }) => (
  <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
);
