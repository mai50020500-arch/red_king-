/**
 * Red King — Design System
 * Border Radius Tokens
 */

export const radius = {
  /** 0px — hard edge, tactical elements */
  none: '0px',
  /** 2px — minimal rounding on micro elements */
  sm: '2px',
  /** 4px — default for badges and tags */
  DEFAULT: '4px',
  /** 6px — panels, cards */
  md: '6px',
  /** 8px — primary containers */
  lg: '8px',
  /** 12px — modals, overlays */
  xl: '12px',
  /** 16px — hero containers */
  '2xl': '16px',
  /** 9999px — pills, chips */
  full: '9999px',
} as const;

export type RadiusToken = typeof radius;
