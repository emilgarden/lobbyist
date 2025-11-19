import { Theme, ThemeConfig } from '@/types/game';

// ============================================================================
// THEME CONFIGURATIONS - Professional Dark Palettes
// ============================================================================
// Each theme defines a background gradient for the game
// ============================================================================

export const themes: Record<Theme, ThemeConfig> = {
  blue: {
    id: 'blue',
    name: 'Blå',
    gradient: 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'
  },
  red: {
    id: 'red',
    name: 'Rød',
    gradient: 'bg-gradient-to-br from-slate-900 via-red-950 to-slate-900'
  },
  green: {
    id: 'green',
    name: 'Grønn',
    gradient: 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900'
  },
  purple: {
    id: 'purple',
    name: 'Lilla',
    gradient: 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900'
  },
  neutral: {
    id: 'neutral',
    name: 'Nøytral',
    gradient: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
  }
};

export const DEFAULT_THEME: Theme = 'neutral';

// Helper function to get theme config
export function getThemeConfig(theme: Theme): ThemeConfig {
  return themes[theme];
}
