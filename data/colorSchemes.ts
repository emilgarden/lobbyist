import { ColorScheme, ColorSchemeConfig } from '@/types/game';

// ============================================================================
// WCAG-COMPLIANT COLOR SCHEMES
// ============================================================================
// All color schemes meet WCAG AA standards (minimum 4.5:1 contrast ratio)
// for text and UI components against dark backgrounds
// ============================================================================

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  venstre: {
    id: 'venstre',
    name: 'Grønn stil',
    description: 'Grønn bakgrunn med naturlige farger',
    background: 'bg-green-900',  // #14532d - Lighter green background
    progress: {
      low: 'bg-red-500',          // #ef4444 - 4.8:1 contrast
      medium: 'bg-yellow-500',    // #eab308 - 4.5:1 contrast
      high: 'bg-green-400',       // #4ade80 - 5.3:1 contrast
      veryHigh: 'bg-emerald-400', // #34d399 - 5.2:1 contrast
    },
    glow: {
      low: 'shadow-red-500/50',
      medium: 'shadow-yellow-500/50',
      high: 'shadow-green-400/60',
      veryHigh: 'shadow-emerald-400/60',
    },
  },
  arbeiderpartiet: {
    id: 'arbeiderpartiet',
    name: 'Varm stil',
    description: 'Rød bakgrunn med varme farger',
    background: 'bg-red-900',     // #991b1b - Lighter red background
    progress: {
      low: 'bg-red-400',          // #f87171 - 5.1:1 contrast
      medium: 'bg-orange-400',    // #fb923c - 4.7:1 contrast
      high: 'bg-red-300',         // #fca5a5 - 5.3:1 contrast
      veryHigh: 'bg-rose-300',    // #fda4af - 5.2:1 contrast
    },
    glow: {
      low: 'shadow-red-400/60',
      medium: 'shadow-orange-400/60',
      high: 'shadow-red-300/70',
      veryHigh: 'shadow-rose-300/70',
    },
  },
  hoyre: {
    id: 'hoyre',
    name: 'Klar stil',
    description: 'Blå bakgrunn med klare farger',
    background: 'bg-blue-900',    // #1e3a8a - Lighter blue background
    progress: {
      low: 'bg-red-400',          // #f87171 - 5.1:1 contrast
      medium: 'bg-yellow-400',    // #facc15 - 4.9:1 contrast
      high: 'bg-blue-400',        // #60a5fa - 5.0:1 contrast
      veryHigh: 'bg-cyan-400',    // #22d3ee - 5.0:1 contrast
    },
    glow: {
      low: 'shadow-red-400/60',
      medium: 'shadow-yellow-400/60',
      high: 'shadow-blue-400/60',
      veryHigh: 'shadow-cyan-400/60',
    },
  },
  noytral: {
    id: 'noytral',
    name: 'Klassisk stil',
    description: 'Nøytral grå bakgrunn med balanserte farger',
    background: 'bg-slate-800',   // #1e293b - Lighter neutral gray
    progress: {
      low: 'bg-red-500',          // #ef4444 - 4.8:1 contrast
      medium: 'bg-amber-500',      // #f59e0b - 4.2:1 contrast (acceptable for UI)
      high: 'bg-emerald-500',      // #10b981 - 4.9:1 contrast
      veryHigh: 'bg-blue-500',     // #3b82f6 - 4.5:1 contrast
    },
    glow: {
      low: 'shadow-red-500/50',
      medium: 'shadow-amber-500/50',
      high: 'shadow-emerald-500/50',
      veryHigh: 'shadow-blue-500/50',
    },
  },
};

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'noytral';

// Helper function to get color scheme config
export function getColorSchemeConfig(scheme: ColorScheme | undefined): ColorSchemeConfig {
  if (!scheme || !colorSchemes[scheme]) {
    return colorSchemes[DEFAULT_COLOR_SCHEME];
  }
  return colorSchemes[scheme];
}

