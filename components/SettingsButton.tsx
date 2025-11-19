'use client';

import { useGameStore } from '@/store/gameStore';
import { Settings } from 'lucide-react';

export default function SettingsButton() {
  const toggleSettings = useGameStore((state) => state.toggleSettings);

  return (
    <button
      onClick={toggleSettings}
      className="
        fixed bottom-8 left-8 z-20 
        w-14 h-14 
        bg-gradient-to-br from-slate-900 to-slate-800
        backdrop-blur-xl
        border border-slate-700/50
        rounded-full 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        flex items-center justify-center 
        hover:border-slate-600/70
        transition-all 
        hover:scale-110
        group
      "
      aria-label="Innstillinger"
    >
      <Settings className="w-6 h-6 text-slate-300 group-hover:text-slate-100 transition-colors group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
}
