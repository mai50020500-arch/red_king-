/**
 * Red King — Design System
 * Theme Utilities
 *
 * Helper functions for consuming theme tokens in component code.
 */

import { colors } from '../tokens/colors';
import { shadows } from '../tokens/shadows';
import { radius } from '../tokens/radius';
import { zIndex } from '../tokens/zIndex';

/**
 * Builds a CSS `box-shadow` string combining a glow and a depth shadow.
 * @example glowShadow('danger') => "0 0 15px rgba(255,0,60,0.15), 0 4px 12px rgba(0,0,0,0.70)"
 */
export function glowShadow(
  variant: 'danger' | 'cyan' | 'emerald',
  strength: 'default' | 'strong' = 'default',
  withDepth = true,
): string {
  const key = strength === 'strong' ? (`${variant}Strong` as keyof typeof shadows) : variant;
  const glow = shadows[key as keyof typeof shadows] ?? shadows[variant];
  return withDepth ? `${glow}, ${shadows.md}` : glow;
}

/**
 * Returns the CSS variable string for a border with neon glow matching the
 * given semantic variant.
 */
export function glassPanel(variant: 'danger' | 'cyan' | 'emerald' = 'danger'): string {
  const borderMap = {
    danger: colors.danger.border,
    cyan: colors.cyan.border,
    emerald: colors.emerald.border,
  };
  const shadowMap = {
    danger: shadows.danger,
    cyan: shadows.cyan,
    emerald: shadows.emerald,
  };
  return [
    `background: ${colors.glass}`,
    `backdrop-filter: blur(12px)`,
    `border: 1px solid ${borderMap[variant]}`,
    `box-shadow: ${shadowMap[variant]}`,
    `border-radius: ${radius.lg}`,
  ].join('; ');
}

/**
 * Clamps a z-index value to a named layer.
 * Useful when composing multiple overlapping elements.
 */
export function layerZ(layer: keyof typeof zIndex): number {
  return zIndex[layer];
}

/**
 * Converts a hex color to an rgba string with a given alpha.
 * @example hexAlpha('#ff003c', 0.15) => "rgba(255, 0, 60, 0.15)"
 */
export function hexAlpha(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Returns the correct CSS `font-family` declaration for a role.
 */
export function fontStack(role: 'display' | 'mono'): string {
  return role === 'mono'
    ? "'Fira Code', 'Courier New', monospace"
    : "'Rajdhani', sans-serif";
}
