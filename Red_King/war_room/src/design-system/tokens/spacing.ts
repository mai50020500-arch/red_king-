/**
 * Red King — Design System
 * Spacing Tokens
 *
 * 4-point base grid. All layout gaps, padding, and margin values
 * should reference this scale.
 */

export const spacing = {
  /** 0px */
  0: '0px',
  /** 2px — hairline */
  px: '1px',
  0.5: '2px',
  /** 4px */
  1: '4px',
  /** 6px */
  1.5: '6px',
  /** 8px */
  2: '8px',
  /** 10px */
  2.5: '10px',
  /** 12px */
  3: '12px',
  /** 14px */
  3.5: '14px',
  /** 16px */
  4: '16px',
  /** 20px */
  5: '20px',
  /** 24px */
  6: '24px',
  /** 28px */
  7: '28px',
  /** 32px */
  8: '32px',
  /** 36px */
  9: '36px',
  /** 40px */
  10: '40px',
  /** 48px */
  12: '48px',
  /** 64px */
  16: '64px',
  /** 80px */
  20: '80px',
  /** 96px */
  24: '96px',
  /** 128px */
  32: '128px',
  /** 160px */
  40: '160px',
  /** 192px */
  48: '192px',
  /** 320px — standard panel width */
  panelWidth: '320px',
} as const;

export type SpacingToken = typeof spacing;
