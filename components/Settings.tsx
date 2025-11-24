'use client';

import { useGameStore } from '@/store/gameStore';
import { allScenarios } from '@/data/scenarios';
import { colorSchemes } from '@/data/colorSchemes';
import { ColorScheme } from '@/types/game';
import { X, Sparkles, BookOpen, Lock } from 'lucide-react';

export default function Settings() {
  const { 
    settingsOpen, 
    toggleSettings, 
    currentScenarioId, 
    changeScenario, 
    colorScheme,
    changeColorScheme
  } = useGameStore();

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        border border-slate-700/50
        rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 
        max-w-lg sm:max-w-2xl w-full max-h-[90vh] 
        overflow-y-auto 
        shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]
      ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-100">
            Meny
          </h2>
          <button
            onClick={toggleSettings}
            className="
              text-slate-400 hover:text-slate-200 
              transition-colors
              w-10 h-10 rounded-full
              hover:bg-slate-800/60
              flex items-center justify-center
            "
            aria-label="Lukk"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scenario Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-slate-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-200">
              Velg Scenario
            </h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Bytter scenario starter spillet på nytt med nye events.
          </p>
          <div className="space-y-3">
            {allScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => !scenario.locked && changeScenario(scenario.id)}
                disabled={scenario.locked}
                className={`
                  w-full p-5 rounded-xl border-2 text-left transition-all
                  ${currentScenarioId === scenario.id 
                    ? 'border-blue-500 bg-blue-950/30 ring-2 ring-blue-500/20' 
                    : scenario.locked
                    ? 'border-slate-700/30 bg-slate-800/20 opacity-60 cursor-not-allowed'
                    : 'border-slate-700/50 hover:border-slate-600/70 bg-slate-800/30 hover:bg-slate-800/50'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{scenario.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-base sm:text-lg text-slate-100">
                        {scenario.name}
                      </h4>
                      {scenario.locked && (
                        <span className="
                          flex items-center gap-1
                          text-xs bg-yellow-500/20 text-yellow-300 
                          px-2 py-1 rounded-full
                          border border-yellow-500/30
                        ">
                          <Lock className="w-3 h-3" />
                          {scenario.price} kr
                        </span>
                      )}
                      {currentScenarioId === scenario.id && (
                        <span className="
                          text-xs bg-blue-500/20 text-blue-300 
                          px-2 py-1 rounded-full
                          border border-blue-500/30
                        ">
                          Aktiv
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">
                      {scenario.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      {scenario.events.length} events
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* WCAG Color Scheme Selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-slate-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-200">
              Visuell stil (WCAG-kompatibel)
            </h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Velg en visuell stil som passer din preferanse. Alle stiler oppfyller WCAG AA-standarder for tilgjengelighet og inkluderer bakgrunnsfarge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(colorSchemes).map((schemeConfig) => {
              const isSelected = colorScheme === schemeConfig.id;
              return (
                <button
                  key={schemeConfig.id}
                  onClick={() => changeColorScheme(schemeConfig.id)}
                  className={`
                    relative overflow-hidden rounded-lg transition-all duration-200
                    ${isSelected 
                      ? 'border-2 border-blue-500' 
                      : 'border border-slate-700/50 hover:border-slate-600'
                    }
                  `}
                >
                  {/* Simple background preview */}
                  <div className={`w-full h-16 ${schemeConfig.background} flex items-center justify-between px-4`}>
                    <div className="text-left">
                      <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                        {schemeConfig.name}
                      </div>
                      <div className="text-xs text-slate-300/70 mt-0.5">
                        {schemeConfig.description}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <button
            onClick={toggleSettings}
            className="
              w-full 
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              text-white font-semibold 
              py-3 rounded-xl 
              transition-all
              shadow-lg shadow-blue-500/20
              border border-blue-400/20
            "
          >
            Lukk
          </button>
        </div>
      </div>
    </div>
  );
}
