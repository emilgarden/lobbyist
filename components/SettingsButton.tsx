'use client';

import { useGameStore } from '@/store/gameStore';
import { Settings } from 'lucide-react';

export default function SettingsButton() {
  const toggleSettings = useGameStore((state) => state.toggleSettings);

  return (
    <button
      onClick={toggleSettings}
      className="
        fixed bottom-0 left-0 right-0 z-20 
        w-full
        bg-gradient-to-t from-slate-900/95 via-slate-800/95 to-slate-900/95
        backdrop-blur-xl
        border-t border-slate-700/50
        shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)]
        flex items-center justify-center 
        py-3 sm:py-4
        pb-[calc(0.75rem+env(safe-area-inset-bottom))]
        active:bg-slate-800/95
        transition-all 
        group
        touch-manipulation
      "
      aria-label="Innstillinger"
    >
      <div className="flex items-center gap-2 sm:gap-3 text-slate-300 group-active:text-slate-100 transition-colors">
        <Settings className="w-5 h-5 sm:w-6 sm:h-6 group-active:rotate-90 transition-transform duration-300" />
        <span className="text-sm sm:text-base font-semibold uppercase tracking-wider">
          Innstillinger
        </span>
      </div>
    </button>
  );
}
