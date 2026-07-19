/**
 * Red King — Shell
 * useShellLayout
 *
 * Manages panel open/closed state and resizable widths/heights.
 * Persists to localStorage under "rk-shell-layout".
 */

import { useState, useCallback } from 'react';

export interface ShellLayout {
  leftWidth: number;
  rightWidth: number;
  bottomHeight: number;
  leftOpen: boolean;
  rightOpen: boolean;
  bottomOpen: boolean;
}

const STORAGE_KEY = 'rk-shell-layout';

const DEFAULTS: ShellLayout = {
  leftWidth: 320,
  rightWidth: 320,
  bottomHeight: 240,
  leftOpen: true,
  rightOpen: true,
  bottomOpen: false,
};

const CONSTRAINTS = {
  leftMin: 220,
  leftMax: 520,
  rightMin: 220,
  rightMax: 520,
  bottomMin: 120,
  bottomMax: 480,
} as const;

function loadLayout(): ShellLayout {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<ShellLayout>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

function saveLayout(layout: ShellLayout): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    // ignore
  }
}

export function useShellLayout() {
  const [layout, setLayout] = useState<ShellLayout>(loadLayout);

  const update = useCallback((patch: Partial<ShellLayout>) => {
    setLayout((prev) => {
      const next = { ...prev, ...patch };
      saveLayout(next);
      return next;
    });
  }, []);

  const setLeftWidth = useCallback(
    (w: number) =>
      update({ leftWidth: Math.max(CONSTRAINTS.leftMin, Math.min(CONSTRAINTS.leftMax, w)) }),
    [update],
  );

  const setRightWidth = useCallback(
    (w: number) =>
      update({ rightWidth: Math.max(CONSTRAINTS.rightMin, Math.min(CONSTRAINTS.rightMax, w)) }),
    [update],
  );

  const setBottomHeight = useCallback(
    (h: number) =>
      update({
        bottomHeight: Math.max(CONSTRAINTS.bottomMin, Math.min(CONSTRAINTS.bottomMax, h)),
      }),
    [update],
  );

  const toggleLeft = useCallback(() => update({ leftOpen: !layout.leftOpen }), [update, layout.leftOpen]);
  const toggleRight = useCallback(() => update({ rightOpen: !layout.rightOpen }), [update, layout.rightOpen]);
  const toggleBottom = useCallback(
    () => update({ bottomOpen: !layout.bottomOpen }),
    [update, layout.bottomOpen],
  );

  return {
    layout,
    setLeftWidth,
    setRightWidth,
    setBottomHeight,
    toggleLeft,
    toggleRight,
    toggleBottom,
    CONSTRAINTS,
  };
}
