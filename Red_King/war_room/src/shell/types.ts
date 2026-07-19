/**
 * Red King — Shell
 * Shared Shell Types
 */

export type ResizeDirection = 'right' | 'left' | 'top';

export interface ShellSlots {
  /** Content rendered in the left sidebar */
  left?: React.ReactNode;
  /** Content rendered in the right sidebar */
  right?: React.ReactNode;
  /** Content rendered in the bottom console drawer */
  bottom?: React.ReactNode;
  /** Content rendered in the main workspace */
  children: React.ReactNode;
}
