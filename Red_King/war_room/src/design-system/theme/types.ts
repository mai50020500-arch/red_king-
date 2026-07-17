/**
 * Red King — Design System
 * Theme Types
 */

import type { ColorToken } from '../tokens/colors';
import type { SpacingToken } from '../tokens/spacing';
import type { FontFamilyToken, FontSizeToken, FontWeightToken } from '../tokens/typography';
import type { RadiusToken } from '../tokens/radius';
import type { DurationToken, EasingToken } from '../tokens/motion';
import type { ShadowToken } from '../tokens/shadows';
import type { ZIndexToken } from '../tokens/zIndex';
import type { BreakpointToken } from '../tokens/breakpoints';

/** Supported theme identifiers */
export type ThemeId = 'dark' | 'midnight';

/** Complete theme token map */
export interface Theme {
  id: ThemeId;
  colors: ColorToken;
  spacing: SpacingToken;
  fontFamily: FontFamilyToken;
  fontSize: FontSizeToken;
  fontWeight: FontWeightToken;
  radius: RadiusToken;
  duration: DurationToken;
  easing: EasingToken;
  shadows: ShadowToken;
  zIndex: ZIndexToken;
  breakpoints: BreakpointToken;
}

/** Shape of the context value exposed by ThemeProvider */
export interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}
