/**
 * Red King — Design System
 * Color Tokens
 *
 * Single source of truth for every color value in the platform.
 * Consumers should import from `design-system` barrel, never from this file directly.
 */

export const colors = {
  // ─── Background scale ──────────────────────────────────────────────────────
  /** Pure void — deepest background */
  void: '#050505',
  /** Panel background — slightly lifted from void */
  surface: '#0a0a0a',
  /** Elevated surface — cards, modals */
  elevated: '#141414',
  /** Glass panel fill */
  glass: 'rgba(20, 0, 0, 0.6)',

  // ─── Danger / Primary ──────────────────────────────────────────────────────
  danger: {
    /** Vivid threat red — CTAs, alerts, borders */
    DEFAULT: '#ff003c',
    /** Tailwind red-500 alias */
    muted: '#ef4444',
    /** Low-opacity tint for backgrounds */
    subtle: 'rgba(255, 0, 60, 0.10)',
    /** Border-level opacity */
    border: 'rgba(255, 0, 60, 0.20)',
    /** Glow shadow color */
    glow: 'rgba(255, 0, 60, 0.40)',
  },

  // ─── Neon Cyan / Intel ─────────────────────────────────────────────────────
  cyan: {
    DEFAULT: '#00f3ff',
    subtle: 'rgba(0, 243, 255, 0.10)',
    border: 'rgba(0, 243, 255, 0.20)',
    glow: 'rgba(0, 243, 255, 0.50)',
  },

  // ─── Stealth Green / Comms ─────────────────────────────────────────────────
  emerald: {
    DEFAULT: '#10b981',
    subtle: 'rgba(16, 185, 129, 0.10)',
    border: 'rgba(16, 185, 129, 0.20)',
    glow: 'rgba(16, 185, 129, 0.40)',
  },

  // ─── Scanline Green ────────────────────────────────────────────────────────
  scanline: {
    DEFAULT: 'rgba(0, 255, 60, 0.03)',
    bright: 'rgba(0, 255, 60, 0.05)',
  },

  // ─── Neutrals ──────────────────────────────────────────────────────────────
  zinc: {
    800: '#27272a',
    700: '#3f3f46',
    600: '#52525b',
    400: '#a1a1aa',
    200: '#e4e4e7',
  },

  // ─── Text ──────────────────────────────────────────────────────────────────
  text: {
    primary: '#e0e0e0',
    secondary: '#a1a1aa',
    muted: 'rgba(255, 255, 255, 0.40)',
    danger: '#ff003c',
    cyan: '#00f3ff',
  },

  // ─── Semantic aliases ──────────────────────────────────────────────────────
  online: '#10b981',
  offline: '#ef4444',
  warning: '#f59e0b',
  info: '#00f3ff',
};

export type ColorToken = typeof colors;
