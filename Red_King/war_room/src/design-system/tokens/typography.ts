/**
 * Red King — Design System
 * Typography Tokens
 *
 * Font families, sizes, weights, leading, and tracking values
 * used across the platform.
 */

export const fontFamily = {
  /** Rajdhani — display / heading / UI labels */
  display: "'Rajdhani', sans-serif",
  /** Fira Code — console, terminal, code output */
  mono: "'Fira Code', 'Courier New', monospace",
} as const;

export const fontSize = {
  /** 9px — micro labels, tags */
  '2xs': ['9px', { lineHeight: '12px', letterSpacing: '0.12em' }],
  /** 10px — status badges, timestamps */
  xs: ['10px', { lineHeight: '14px', letterSpacing: '0.08em' }],
  /** 12px — secondary body */
  sm: ['12px', { lineHeight: '16px', letterSpacing: '0.04em' }],
  /** 14px — body */
  base: ['14px', { lineHeight: '20px', letterSpacing: '0.02em' }],
  /** 16px — section labels */
  lg: ['16px', { lineHeight: '24px', letterSpacing: '0.01em' }],
  /** 18px — panel headers */
  xl: ['18px', { lineHeight: '28px', letterSpacing: '0.01em' }],
  /** 20px — page section titles */
  '2xl': ['20px', { lineHeight: '28px', letterSpacing: '0em' }],
  /** 24px — top-level headings */
  '3xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em' }],
  /** 30px — hero / masthead */
  '4xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
} as const;

export const letterSpacing = {
  tightest: '-0.05em',
  tighter: '-0.025em',
  tight: '-0.01em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  /** Military / tactical label tracking */
  widest: '0.1em',
  /** Extreme tracking for badge labels */
  tactical: '0.15em',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

export type FontFamilyToken = typeof fontFamily;
export type FontSizeToken = typeof fontSize;
export type FontWeightToken = typeof fontWeight;
