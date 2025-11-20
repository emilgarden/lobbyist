import { Briefcase, Handshake, Coins, Newspaper } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ResourceBarProps {
  name: string;
  value: number; // 0-100
  icon: string;  // For backwards compatibility, but we'll use iconComponent
  color: string;
}

const iconMap: Record<string, LucideIcon> = {
  '💼': Briefcase,
  '🤝': Handshake,
  '💰': Coins,
  '📰': Newspaper,
};

export default function ResourceBar({ name, value, icon, color }: ResourceBarProps) {
  // Get icon component
  const IconComponent = iconMap[icon] || Briefcase;
  
  // Color coding based on value
  const getBarColor = () => {
    if (value <= 25) return 'from-red-500 to-red-600';
    if (value <= 50) return 'from-yellow-500 to-yellow-600';
    if (value <= 75) return 'from-green-500 to-green-600';
    return 'from-blue-500 to-blue-600';
  };

  const getGlowColor = () => {
    if (value <= 25) return 'shadow-red-500/30';
    if (value <= 50) return 'shadow-yellow-500/30';
    if (value <= 75) return 'shadow-green-500/30';
    return 'shadow-blue-500/30';
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-2.5 min-w-[55px] sm:min-w-[65px] md:min-w-[75px]">
      {/* Icon and Name together */}
      <div className="flex flex-col items-center gap-1 sm:gap-1.5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-slate-800/60 border border-slate-600/40 flex items-center justify-center">
          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 text-slate-300" />
        </div>
        {/* Name */}
        <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 leading-tight text-center">
          {name}
        </div>
      </div>
      
      {/* Bar only - no numbers, more prominent */}
      <div className="w-full">
        {/* Bar - larger and more visible */}
        <div className="w-full h-3 sm:h-4 md:h-5 bg-slate-800/80 rounded-full overflow-hidden border-2 border-slate-700/50 shadow-inner">
          <div 
            className={`h-full transition-all duration-500 ease-out bg-gradient-to-r ${getBarColor()} ${getGlowColor()} shadow-lg`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    </div>
  );
}
