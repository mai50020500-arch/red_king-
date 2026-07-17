/**
 * Red King — Design System
 * Shadow Tokens
 *
 * Neon glow shadows keyed by semantic role.
 * Values are valid CSS `box-shadow` strings.
 */

export const shadows = {
  // ─── Neon glow variants ────────────────────────────────────────────────────
  /** Default red glow — panels, active borders */
  danger: '0 0 15px rgba(255, 0, 60, 0.15)',
  /** Intense red glow — hover / active state */
  dangerStrong: '0 0 24px rgba(255, 0, 60, 0.40)',
  /** Cyan glow — intel / info panels */
  cyan: '0 0 12px rgba(0, 243, 255, 0.20)',
  /** Strong cyan glow — active intel nodes */
  cyanStrong: '0 0 24px rgba(0, 243, 255, 0.45)',
  /** Emerald glow — stealth / comms panels */
  emerald: '0 0 12px rgba(16, 185, 129, 0.20)',
  /** Strong emerald — active stealth state */
  emeraldStrong: '0 0 24px rgba(16, 185, 129, 0.40)',

  // ─── Glass / depth ─────────────────────────────────────────────────────────
  /** Subtle panel lift */
  sm: '0 1px 3px rgba(0, 0, 0, 0.60)',
  /** Standard panel shadow */
  md: '0 4px 12px rgba(0, 0, 0, 0.70)',
  /** Modal / overlay */
  lg: '0 8px 32px rgba(0, 0, 0, 0.80)',
  /** None */
  none: 'none',
} as const;

/** Tailwind `drop-shadow` filter values (no `filter:` prefix, for Tailwind arbitrary usage) */
export const dropShadows = {
  dangerText: '0 0 5px rgba(255, 0, 60, 0.5)',
  cyanText: '0 0 5px rgba(0, 243, 255, 0.5)',
  emeraldText: '0 0 4px rgba(16, 185, 129, 0.5)',
} as const;

export type ShadowToken = typeof shadows;
