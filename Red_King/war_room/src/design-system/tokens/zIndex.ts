/**
 * Red King — Design System
 * Z-Index Tokens
 *
 * Explicit layering scale. Never use raw numbers outside this map.
 */

export const zIndex = {
  /** Base content layer */
  base: 0,
  /** Slightly raised panels */
  raised: 10,
  /** Sticky headers, fixed sidebars */
  sticky: 20,
  /** Dropdown menus, tooltips */
  dropdown: 30,
  /** Overlay backdrops */
  overlay: 40,
  /** Modal dialogs */
  modal: 50,
  /** Toast notifications */
  toast: 60,
  /** Full-screen takeovers (LiveViewport) */
  fullscreen: 70,
  /** CRT scanline — always on top */
  scanline: 9999,
} as const;

export type ZIndexToken = typeof zIndex;
