/**
 * Red King — Design System
 * Motion Tokens
 *
 * Duration and easing values for CSS transitions and Framer Motion animations.
 * Framer Motion variants are exported as ready-to-use objects.
 */

export const duration = {
  /** 75ms — micro interactions */
  instant: 0.075,
  /** 150ms — hover states */
  fast: 0.15,
  /** 200ms — panel transitions */
  normal: 0.2,
  /** 300ms — standard enter/exit */
  moderate: 0.3,
  /** 500ms — complex state changes */
  slow: 0.5,
  /** 800ms — page-level transitions */
  glacial: 0.8,
} as const;

export const easing = {
  /** Standard ease-in-out */
  standard: [0.4, 0, 0.2, 1] as const,
  /** Sharp entry */
  enter: [0, 0, 0.2, 1] as const,
  /** Sharp exit */
  exit: [0.4, 0, 1, 1] as const,
  /** Spring-like */
  spring: [0.34, 1.56, 0.64, 1] as const,
  /** Linear — scanlines, looping */
  linear: [0, 0, 1, 1] as const,
} as const;

/** Pre-built Framer Motion variant sets */
export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.normal, ease: easing.enter } },
    exit: { opacity: 0, transition: { duration: duration.fast, ease: easing.exit } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.moderate, ease: easing.spring } },
    exit: { opacity: 0, y: -8, transition: { duration: duration.fast, ease: easing.exit } },
  },
  slideIn: {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: duration.moderate, ease: easing.spring } },
    exit: { opacity: 0, x: 12, transition: { duration: duration.fast, ease: easing.exit } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: duration.normal, ease: easing.spring } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: duration.fast, ease: easing.exit } },
  },
  /** Stagger container — apply to parent */
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  },
} as const;

export type DurationToken = typeof duration;
export type EasingToken = typeof easing;
