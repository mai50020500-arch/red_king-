/**
 * Red King — Design System
 * Breakpoint Tokens
 *
 * Mirrors Tailwind's default breakpoint scale so CSS-in-JS and
 * utility classes share the same thresholds.
 */

export const breakpoints = {
  /** 640px — small devices */
  sm: '640px',
  /** 768px — tablets */
  md: '768px',
  /** 1024px — laptop */
  lg: '1024px',
  /** 1280px — desktop */
  xl: '1280px',
  /** 1536px — wide monitors / ops center */
  '2xl': '1536px',
} as const;

/** Numeric px values for programmatic use (e.g. ResizeObserver comparisons) */
export const breakpointsPx = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointToken = typeof breakpoints;
