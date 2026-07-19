/**
 * Red King — Docking Workspace
 * Layout state management with localStorage persistence.
 *
 * All layout mutations are pure transformations — no in-place mutation.
 */

import { useState, useCallback, useMemo } from 'react';
import type { LayoutNode, PanelLeaf, PanelGroup, PanelState, Direction, WorkspaceProfile } from './types';
import { buildProfiles, DEFAULT_PROFILE_ID, genId } from './defaults';

const STORAGE_KEY = 'rk-workspace-layout';

/* ── Pure tree helpers ─────────────────────────────────────────── */

/** Walk the tree; apply `transform` to the first node matching `predicate`. */
function mapNode(
  node: LayoutNode,
  predicate: (n: LayoutNode) => boolean,
  transform: (n: LayoutNode) => LayoutNode,
): LayoutNode {
  if (predicate(node)) return transform(node);
  if (node.type === 'group') {
    return {
      ...node,
      children: node.children.map((c) => mapNode(c, predicate, transform)),
    };
  }
  return node;
}

/** Replace a panel with a two-child group (split). */
function splitPanel(layout: LayoutNode, panelId: string, direction: Direction): LayoutNode {
  const newPanel: PanelLeaf = {
    id:          genId('panel'),
    type:        'panel',
    tabs:        [{ id: 'empty', title: 'New Panel', icon: 'Square' }],
    activeTabId: 'empty',
    state:       'normal',
  };

  return mapNode(
    layout,
    (n) => n.id === panelId && n.type === 'panel',
    (n) =>
      ({
        id:        genId('group'),
        type:      'group',
        direction,
        sizes:     [1, 1],
        children:  [n, newPanel],
      } as PanelGroup),
  );
}

/** Remove a panel by id; collapse single-child groups upward. */
function removePanel(layout: LayoutNode, panelId: string): LayoutNode | null {
  if (layout.type === 'panel') {
    return layout.id === panelId ? null : layout;
  }
  const newChildren = layout.children
    .map((c) => removePanel(c, panelId))
    .filter((c): c is LayoutNode => c !== null);

  if (newChildren.length === 0) return null;
  if (newChildren.length === 1) return newChildren[0];

  const oldSizes = layout.sizes;
  const newSizes = newChildren.map((_, i) => oldSizes[i] ?? 1);
  return { ...layout, children: newChildren, sizes: newSizes };
}

/** Update the state of a specific panel. */
function setPanelState(layout: LayoutNode, panelId: string, state: PanelState): LayoutNode {
  return mapNode(
    layout,
    (n) => n.id === panelId && n.type === 'panel',
    (n) => ({ ...n, state } as PanelLeaf),
  );
}

/** Update sizes of a specific group. */
function updateGroupSizes(layout: LayoutNode, groupId: string, sizes: number[]): LayoutNode {
  return mapNode(
    layout,
    (n) => n.id === groupId && n.type === 'group',
    (n) => ({ ...n, sizes } as PanelGroup),
  );
}

/** Set the active tab within a panel. */
function setActiveTab(layout: LayoutNode, panelId: string, tabId: string): LayoutNode {
  return mapNode(
    layout,
    (n) => n.id === panelId && n.type === 'panel',
    (n) => ({ ...n, activeTabId: tabId } as PanelLeaf),
  );
}

/* ── Persistence ───────────────────────────────────────────────── */

interface Stored {
  layout:          LayoutNode;
  activeProfileId: string;
}

function loadStored(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function persist(data: Stored): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

/* ── Hook ──────────────────────────────────────────────────────── */

export function useWorkspaceLayout() {
  const profiles: WorkspaceProfile[] = useMemo(() => buildProfiles(), []);

  const initial = useMemo((): Stored => {
    const stored = loadStored();
    if (stored) return stored;
    const def = profiles.find((p) => p.id === DEFAULT_PROFILE_ID)!;
    return { layout: def.layout, activeProfileId: def.id };
  }, [profiles]);

  const [layout, setLayout]                 = useState<LayoutNode>(initial.layout);
  const [activeProfileId, setActiveProfileId] = useState<string>(initial.activeProfileId);

  const save = useCallback((l: LayoutNode, pid: string) => {
    persist({ layout: l, activeProfileId: pid });
  }, []);

  /* Actions */
  const applyLayout = useCallback(
    (next: LayoutNode, profileId: string) => {
      setLayout(next);
      setActiveProfileId(profileId);
      save(next, profileId);
    },
    [save],
  );

  const doSplitPanel = useCallback(
    (panelId: string, direction: Direction) => {
      setLayout((prev) => {
        const next = splitPanel(prev, panelId, direction);
        save(next, activeProfileId);
        return next;
      });
    },
    [activeProfileId, save],
  );

  const doRemovePanel = useCallback(
    (panelId: string) => {
      setLayout((prev) => {
        const next = removePanel(prev, panelId);
        if (!next) return prev; // never remove the last panel
        save(next, activeProfileId);
        return next;
      });
    },
    [activeProfileId, save],
  );

  const doSetPanelState = useCallback(
    (panelId: string, state: PanelState) => {
      setLayout((prev) => {
        const next = setPanelState(prev, panelId, state);
        save(next, activeProfileId);
        return next;
      });
    },
    [activeProfileId, save],
  );

  const doUpdateGroupSizes = useCallback(
    (groupId: string, sizes: number[]) => {
      setLayout((prev) => {
        const next = updateGroupSizes(prev, groupId, sizes);
        save(next, activeProfileId);
        return next;
      });
    },
    [activeProfileId, save],
  );

  const doSetActiveTab = useCallback(
    (panelId: string, tabId: string) => {
      setLayout((prev) => {
        const next = setActiveTab(prev, panelId, tabId);
        save(next, activeProfileId);
        return next;
      });
    },
    [activeProfileId, save],
  );

  const doResetLayout = useCallback(() => {
    const profile = profiles.find((p) => p.id === activeProfileId)
      ?? profiles.find((p) => p.id === DEFAULT_PROFILE_ID)!;
    applyLayout(profile.layout, profile.id);
  }, [profiles, activeProfileId, applyLayout]);

  const doSetProfile = useCallback(
    (profileId: string) => {
      const profile = profiles.find((p) => p.id === profileId);
      if (profile) applyLayout(profile.layout, profile.id);
    },
    [profiles, applyLayout],
  );

  return {
    layout,
    profiles,
    activeProfileId,
    splitPanel:       doSplitPanel,
    removePanel:      doRemovePanel,
    setPanelState:    doSetPanelState,
    updateGroupSizes: doUpdateGroupSizes,
    setActiveTab:     doSetActiveTab,
    resetLayout:      doResetLayout,
    setProfile:       doSetProfile,
  };
}
