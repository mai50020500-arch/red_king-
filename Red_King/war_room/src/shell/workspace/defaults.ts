/**
 * Red King — Docking Workspace
 * Default layouts and workspace profiles.
 *
 * The special tab id "main" renders the mainContent prop (IntelFeed).
 * Any other tab id renders the EmptyDockZone placeholder.
 */

import type { PanelLeaf, PanelGroup, LayoutNode, WorkspaceProfile } from './types';

/* ── Helpers ───────────────────────────────────────────────────── */

let _counter = 0;
export function genId(prefix = 'node'): string {
  return `${prefix}-${Date.now()}-${++_counter}`;
}

function mainPanel(): PanelLeaf {
  return {
    id:          'main-panel',
    type:        'panel',
    tabs:        [{ id: 'main', title: 'Intel Feed', icon: 'Activity' }],
    activeTabId: 'main',
    state:       'normal',
  };
}

function emptyPanel(title = 'New Panel'): PanelLeaf {
  const id = genId('panel');
  return {
    id,
    type:        'panel',
    tabs:        [{ id: 'empty', title, icon: 'Square' }],
    activeTabId: 'empty',
    state:       'normal',
  };
}

function hSplit(...children: LayoutNode[]): PanelGroup {
  return {
    id:        genId('group'),
    type:      'group',
    direction: 'row',
    sizes:     Array(children.length).fill(1),
    children,
  };
}

function vSplit(...children: LayoutNode[]): PanelGroup {
  return {
    id:        genId('group'),
    type:      'group',
    direction: 'col',
    sizes:     Array(children.length).fill(1),
    children,
  };
}

/* ── Profiles ──────────────────────────────────────────────────── */

export function buildProfiles(): WorkspaceProfile[] {
  return [
    {
      id:     'focus',
      name:   'Focus',
      icon:   'Square',
      layout: mainPanel(),
    },
    {
      id:     'h-split',
      name:   'Split',
      icon:   'Columns2',
      layout: hSplit(mainPanel(), emptyPanel('Aux Panel')),
    },
    {
      id:     'v-split',
      name:   'Stacked',
      icon:   'Rows2',
      layout: vSplit(mainPanel(), emptyPanel('Aux Panel')),
    },
    {
      id:     'triage',
      name:   'Triage',
      icon:   'LayoutTemplate',
      layout: hSplit(mainPanel(), emptyPanel('Panel B'), emptyPanel('Panel C')),
    },
  ];
}

export const DEFAULT_PROFILE_ID = 'focus';
