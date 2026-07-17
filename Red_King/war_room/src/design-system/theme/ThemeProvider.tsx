/**
 * Red King — Design System
 * ThemeProvider
 *
 * Wraps the application and makes the active theme available via ThemeContext.
 * Persists the selected theme to localStorage under the key `rk-theme`.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme, ThemeId } from './types';

import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { fontFamily, fontSize, fontWeight } from '../tokens/typography';
import { radius } from '../tokens/radius';
import { duration, easing } from '../tokens/motion';
import { shadows } from '../tokens/shadows';
import { zIndex } from '../tokens/zIndex';
import { breakpoints } from '../tokens/breakpoints';

// ─── Theme definitions ───────────────────────────────────────────────────────

const baseTokens = {
  spacing,
  fontFamily,
  fontSize,
  fontWeight,
  radius,
  duration,
  easing,
  shadows,
  zIndex,
  breakpoints,
} as const;

/** Default dark theme — matches the existing War Room visual language */
export const darkTheme: Theme = {
  id: 'dark',
  colors,
  ...baseTokens,
};

/**
 * Midnight variant — deeper blacks, slightly reduced glow intensity.
 * Colors override only the surface/glass values; all other tokens are shared.
 */
export const midnightTheme: Theme = {
  id: 'midnight',
  colors: {
    ...colors,
    surface: '#060606',
    elevated: '#0d0d0d',
    glass: 'rgba(10, 0, 0, 0.75)',
  },
  ...baseTokens,
};

const themes: Record<ThemeId, Theme> = {
  dark: darkTheme,
  midnight: midnightTheme,
};

// ─── Storage helper ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'rk-theme';

function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'midnight') return stored;
  } catch {
    // localStorage unavailable (SSR or private browsing)
  }
  return 'dark';
}

function writeStoredTheme(id: ThemeId): void {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Override the initial theme (useful for testing). Defaults to localStorage or 'dark'. */
  defaultTheme?: ThemeId;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(defaultTheme ?? readStoredTheme());

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
    writeStoredTheme(id);
  }, []);

  const value = useMemo(
    () => ({ theme: themes[themeId], themeId, setTheme }),
    [themeId, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
