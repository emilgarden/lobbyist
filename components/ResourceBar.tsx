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
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
      {/* Icon */}
      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-slate-800/60 border border-slate-600/40 flex items-center justify-center">
        <IconComponent className="w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-slate-300" />
      </div>
      
      {/* Name */}
      <div className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-400 leading-tight">
        {name}
      </div>
      
      {/* Bar */}
      <div className="w-full h-1.5 sm:h-2 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
        <div 
          className={`h-full transition-all duration-300 bg-gradient-to-r ${getBarColor()} ${getGlowColor()} shadow-lg`}
          style={{ width: `${value}%` }}
        />
      </div>
      
      {/* Value */}
      <div className="text-[10px] sm:text-xs md:text-sm font-mono font-semibold text-slate-200">
        {value}
      </div>
    </div>
  );
}
