/**
 * Red King — Design System
 * Public Barrel Export
 *
 * All consumers should import exclusively from this path:
 *   import { useTheme, colors, variants } from '@/design-system';
 *
 * Never import directly from token or theme sub-paths.
 */

// ─── Tokens ──────────────────────────────────────────────────────────────────
export { colors } from './tokens/colors';
export { spacing } from './tokens/spacing';
export {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from './tokens/typography';
export { radius } from './tokens/radius';
export { duration, easing, variants } from './tokens/motion';
export { shadows, dropShadows } from './tokens/shadows';
export { zIndex } from './tokens/zIndex';
export { breakpoints, breakpointsPx } from './tokens/breakpoints';

// ─── Theme engine ─────────────────────────────────────────────────────────────
export { ThemeProvider, darkTheme, midnightTheme } from './theme/ThemeProvider';
export { ThemeContext, useTheme } from './theme/ThemeContext';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { glowShadow, glassPanel, layerZ, hexAlpha, fontStack } from './theme/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
export type { Theme, ThemeId, ThemeContextValue } from './theme/types';
export type { ColorToken } from './tokens/colors';
export type { SpacingToken } from './tokens/spacing';
export type { RadiusToken } from './tokens/radius';
export type { ShadowToken } from './tokens/shadows';
export type { ZIndexToken } from './tokens/zIndex';
export type { BreakpointToken } from './tokens/breakpoints';
