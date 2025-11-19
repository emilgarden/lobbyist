'use client';

import { useGameStore } from '@/store/gameStore';
import { getScenarioById } from '@/data/scenarios';
import { getArchetypeById } from '@/data/archetypes';
import { RefreshCw, Settings, TrendingDown, Sparkles } from 'lucide-react';
import { Briefcase, Handshake, Coins, Newspaper } from 'lucide-react';

export default function GameOver() {
  const { gameOverReason, resources, turn, resetGame, currentScenarioId, toggleSettings, thresholdEventsTriggered, unlockedArchetypes } = useGameStore();
  const scenario = getScenarioById(currentScenarioId);

  const resourceIcons = {
    klient: Briefcase,
    tillit: Handshake,
    penger: Coins,
    omdømme: Newspaper,
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        border border-slate-700/50
        rounded-2xl p-8 
        max-w-md w-full 
        text-center 
        shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]
      ">
        <div className="
          w-20 h-20 mx-auto mb-6
          rounded-full 
          bg-gradient-to-br from-red-900/40 to-red-800/40
          border-2 border-red-500/30
          flex items-center justify-center
          shadow-lg shadow-red-500/20
        ">
          <TrendingDown className="w-10 h-10 text-red-400" />
        </div>
        
        <h2 className="text-3xl font-display font-bold mb-2 text-slate-100">
          Spillet er over
        </h2>
        <p className="text-sm text-slate-400 mb-5">{scenario?.name}</p>
        
        <p className="text-lg mb-8 text-slate-200 font-medium">
          {gameOverReason}
        </p>
        
        <div className="
          bg-slate-800/60
          backdrop-blur-sm
          border border-slate-700/50
          rounded-xl p-6 mb-8
        ">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h3 className="font-semibold text-slate-200">Sluttresultat</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-5">
            {Object.entries(resources).map(([key, value]) => {
              const Icon = resourceIcons[key as keyof typeof resourceIcons];
              const labels: Record<string, string> = {
                klient: 'Klient',
                tillit: 'Tillit',
                penger: 'Penger',
                omdømme: 'Omdømme',
              };
              return (
                <div 
                  key={key}
                  className="
                    bg-slate-900/60 
                    rounded-lg p-3 
                    border border-slate-700/40
                  "
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-2xl font-bold text-slate-100 mb-1">{value}</div>
                  <div className="text-xs text-slate-400">{labels[key]}</div>
                </div>
              );
            })}
          </div>
          <div className="pt-4 border-t border-slate-700/50 text-slate-300 text-sm">
            <span className="font-semibold">Du overlevde {turn} runder</span>
          </div>
        </div>

        {/* Threshold Achievements */}
        {thresholdEventsTriggered.length > 0 && (
          <div className="
            bg-gradient-to-br from-yellow-900/30 to-yellow-800/30
            border border-yellow-500/30
            rounded-xl p-5 mb-6
          ">
            <h3 className="font-semibold text-yellow-200 mb-3 flex items-center gap-2">
              <span className="text-xl">🏆</span>
              Threshold Events Unlocked!
            </h3>
            <div className="flex flex-wrap gap-2">
              {thresholdEventsTriggered.map((resource) => {
                const labels: Record<string, string> = {
                  klient: '💼 Lobbyist Messias',
                  tillit: '🤝 Politisk Insider',
                  penger: '💰 Finanspyramiden',
                  omdømme: '📰 Folkehelten',
                };
                return (
                  <div 
                    key={resource}
                    className="
                      bg-yellow-500/20 
                      border border-yellow-400/30
                      text-yellow-200
                      px-3 py-1 rounded-full
                      text-sm font-medium
                    "
                  >
                    {labels[resource]}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-yellow-300/70 mt-3">
              Du nådde 100 i {thresholdEventsTriggered.length} ressurs{thresholdEventsTriggered.length > 1 ? 'er' : ''} og låste opp special events!
            </p>
          </div>
        )}

        {/* Archetype Achievements */}
        {unlockedArchetypes.length > 0 && (
          <div className="
            bg-gradient-to-br from-purple-900/30 to-purple-800/30
            border border-purple-500/30
            rounded-xl p-5 mb-6
          ">
            <h3 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Archetypes Unlocked!
            </h3>
            <div className="space-y-2">
              {unlockedArchetypes.map((archetypeId) => {
                const archetype = getArchetypeById(archetypeId);
                if (!archetype) return null;
                return (
                  <div 
                    key={archetypeId}
                    className="
                      bg-purple-500/20 
                      border border-purple-400/30
                      rounded-lg p-3
                      flex items-center gap-3
                    "
                  >
                    <span className="text-2xl">{archetype.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="text-purple-100 font-semibold">{archetype.name}</div>
                      <div className="text-xs text-purple-300/70">{archetype.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-purple-300/70 mt-3">
              Du unlocket {unlockedArchetypes.length} spillestil{unlockedArchetypes.length > 1 ? 'er' : ''}!
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={resetGame}
            className="
              flex-1 
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              text-white font-semibold 
              px-6 py-3 rounded-xl 
              transition-all
              shadow-lg shadow-blue-500/20
              border border-blue-400/20
              flex items-center justify-center gap-2
            "
          >
            <RefreshCw className="w-4 h-4" />
            Spill igjen
          </button>
          <button
            onClick={toggleSettings}
            className="
              flex-1 
              bg-slate-800/60 
              hover:bg-slate-700/60
              text-slate-200 font-semibold 
              px-6 py-3 rounded-xl 
              transition-all
              border border-slate-600/50
              hover:border-slate-500/70
              flex items-center justify-center gap-2
            "
          >
            <Settings className="w-4 h-4" />
            Bytt scenario
          </button>
        </div>
      </div>
    </div>
  );
}
