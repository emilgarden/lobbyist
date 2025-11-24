import { Briefcase, Handshake, Coins, Newspaper } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { getColorSchemeConfig } from '@/data/colorSchemes';
import ResourceChangeIndicator from './ResourceChangeIndicator';

interface ResourceBarProps {
  name: string;
  value: number; // 0-100
  icon: string;  // For backwards compatibility, but we'll use iconComponent
  color: string;
  resourceKey: 'klient' | 'tillit' | 'penger' | 'omdømme';
}

const iconMap: Record<string, LucideIcon> = {
  '💼': Briefcase,
  '🤝': Handshake,
  '💰': Coins,
  '📰': Newspaper,
};

export default function ResourceBar({ name, value, icon, color, resourceKey }: ResourceBarProps) {
  // Get icon component
  const IconComponent = iconMap[icon] || Briefcase;
  
  // Get current color scheme from store
  const colorScheme = useGameStore((state) => state.colorScheme);
  const schemeConfig = getColorSchemeConfig(colorScheme);
  
  // Get active resource change for this resource
  const activeResourceChanges = useGameStore((state) => state.activeResourceChanges);
  const changeValue = activeResourceChanges[resourceKey];
  const hasChange = changeValue !== undefined && changeValue !== 0;
  
  // Color coding based on value using WCAG-compliant colors
  const getBarColor = () => {
    if (value <= 25) return schemeConfig.progress.low;
    if (value <= 50) return schemeConfig.progress.medium;
    if (value <= 75) return schemeConfig.progress.high;
    return schemeConfig.progress.veryHigh;
  };

  const getGlowColor = () => {
    if (value <= 25) return schemeConfig.glow.low;
    if (value <= 50) return schemeConfig.glow.medium;
    if (value <= 75) return schemeConfig.glow.high;
    return schemeConfig.glow.veryHigh;
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-2.5 min-w-[55px] sm:min-w-[65px] md:min-w-[75px] relative">
      {/* Icon and Name together */}
      <div className="flex flex-col items-center gap-1 sm:gap-1.5 relative">
        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-slate-800/60 border border-slate-600/40 flex items-center justify-center">
          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-slate-300" />
        </div>
        {/* Floating score animation - shows numbers that float up like vapor */}
        {hasChange && (
          <ResourceChangeIndicator value={changeValue} isVisible={hasChange} />
        )}
        {/* Name */}
        <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 leading-tight text-center">
          {name}
        </div>
      </div>
      
      {/* Resource bar fill animation - animates the progress bar */}
      <div className="w-full">
        {/* Bar - larger and more visible */}
        <div className="w-full h-3 sm:h-4 md:h-5 bg-slate-800/80 rounded-full overflow-hidden border-2 border-slate-700/50 shadow-inner">
          <div 
            className={`h-full transition-all duration-500 ease-out ${getBarColor()} ${getGlowColor()} shadow-lg`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
