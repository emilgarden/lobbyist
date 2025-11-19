'use client';

import ResourceBar from './ResourceBar';
import { useGameStore } from '@/store/gameStore';
import { BarChart3 } from 'lucide-react';

export default function ResourceDisplay() {
  const resources = useGameStore((state) => state.resources);
  const turn = useGameStore((state) => state.turn);

  return (
    <div className="
      bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
      backdrop-blur-xl
      rounded-xl 
      shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
      border border-slate-700/50
      overflow-hidden 
      w-full max-w-md
      mx-auto
    ">
      <div className="flex justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5">
        <ResourceBar name="Klient" value={resources.klient} icon="💼" color="blue" />
        <ResourceBar name="Tillit" value={resources.tillit} icon="🤝" color="green" />
        <ResourceBar name="Penger" value={resources.penger} icon="💰" color="amber" />
        <ResourceBar name="Omdømme" value={resources.omdømme} icon="📰" color="purple" />
      </div>
      <div className="
        bg-slate-800/60 
        px-4 sm:px-6 py-3 
        border-t border-slate-700/50 
        text-center
        flex items-center justify-center gap-2
      ">
        <BarChart3 className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Runde {turn}
        </span>
      </div>
    </div>
  );
}
