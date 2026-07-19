/**
 * Red King — Docking Workspace
 * Core type definitions for the layout tree.
 */

export type Direction  = 'row' | 'col';
export type PanelState = 'normal' | 'minimized' | 'maximized' | 'fullscreen';

export interface PanelTab {
  id:    string;
  title: string;
  /** lucide-react icon name — used for display only */
  icon:  string;
}

/** Leaf node — a single dockable panel that owns one or more tabs */
export interface PanelLeaf {
  id:          string;
  type:        'panel';
  tabs:        PanelTab[];
  activeTabId: string;
  state:       PanelState;
}

/**
 * Group node — a horizontal or vertical split container.
 * `sizes` is an array of relative flex weights (e.g. [1, 1] = 50/50).
 * Must have the same length as `children`.
 */
export interface PanelGroup {
  id:        string;
  type:      'group';
  direction: Direction;
  sizes:     number[];
  children:  LayoutNode[];
}

export type LayoutNode = PanelGroup | PanelLeaf;

export interface WorkspaceProfile {
  id:     string;
  name:   string;
  icon:   string;
  layout: LayoutNode;
}

export interface WorkspaceState {
  layout:          LayoutNode;
  activeProfileId: string;
}
