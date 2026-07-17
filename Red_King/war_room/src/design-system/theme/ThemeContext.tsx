/**
 * Red King — Design System
 * ThemeContext
 *
 * React context that exposes the active theme token map and a setter
 * for switching themes at runtime. Consume via `useTheme()`.
 */

import { createContext, useContext } from 'react';
import type { ThemeContextValue } from './types';
import { darkTheme } from './ThemeProvider';

const defaultContext: ThemeContextValue = {
  theme: darkTheme,
  themeId: 'dark',
  setTheme: () => undefined,
};

export const ThemeContext = createContext<ThemeContextValue>(defaultContext);

/**
 * Hook for consuming the active theme inside any component.
 *
 * @example
 * const { theme } = useTheme();
 * style={{ color: theme.colors.danger.DEFAULT }}
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
