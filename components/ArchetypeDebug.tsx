'use client';

import { useGameStore } from '@/store/gameStore';
import { getArchetypeProgress } from '@/lib/archetypeChecker';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

/**
 * DEBUG COMPONENT: Shows progress towards archetype unlocks
 * Only visible in development mode
 */
export default function ArchetypeDebug() {
  const state = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Only show in development and after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only show in development
  if (!isClient || (typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1')) {
    return null;
  }
  
  const progress = getArchetypeProgress(state);
  
  if (progress.length === 0) {
    return null; // All archetypes unlocked
  }
  
  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-sm pointer-events-none">
      <div className="pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="
            bg-purple-900/90 backdrop-blur-sm
            border border-purple-500/50
            rounded-lg px-3 py-2
            text-xs font-semibold text-purple-200
            flex items-center gap-2
            hover:bg-purple-800/90 transition-colors
            shadow-lg
            cursor-pointer
            relative z-50
          "
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">Archetype Debug</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
        
        {isOpen && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="
              mt-2 bg-slate-900/95 backdrop-blur-xl
              border border-slate-700/50
              rounded-lg p-4
              shadow-xl
              max-h-[60vh] overflow-y-auto
              w-[320px] sm:w-auto
              pointer-events-auto
            "
          >
          <div className="text-xs text-slate-400 mb-3">
            Turn: {state.turn} | Choices: {state.choiceHistory.length}
          </div>
          
          <div className="space-y-4">
            {progress.map((p) => (
              <div
                key={p.archetypeId}
                className={`
                  border rounded-lg p-3
                  ${p.allMet 
                    ? 'border-green-500/50 bg-green-900/20' 
                    : 'border-slate-700/50 bg-slate-800/30'
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{p.allMet ? '✅' : '⏳'}</span>
                  <span className="font-semibold text-slate-200 text-sm">
                    {p.archetypeName}
                  </span>
                </div>
                
                {/* Min Turn */}
                {p.progress.minTurn.required !== undefined && (
                  <div className="text-xs text-slate-400 mb-1">
                    Turn: {p.progress.minTurn.met ? '✅' : '❌'} {p.progress.minTurn.current}/{p.progress.minTurn.required}
                  </div>
                )}
                
                {/* Resources */}
                {Object.keys(p.progress.resources.details).length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-slate-400 mb-1">
                      Resources: {p.progress.resources.met ? '✅' : '❌'}
                    </div>
                    <div className="space-y-1 ml-2">
                      {Object.entries(p.progress.resources.details).map(([key, detail]) => {
                        const range = detail.min !== undefined && detail.max !== undefined 
                          ? `${detail.min}-${detail.max}`
                          : detail.min !== undefined 
                          ? `≥${detail.min}`
                          : `≤${detail.max}`;
                        return (
                          <div key={key} className="text-xs text-slate-300">
                            {key}: {detail.met ? '✅' : '❌'} {detail.current} (needs {range})
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Choice Patterns */}
                {p.progress.choicePattern.details.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">
                      Tags: {p.progress.choicePattern.met ? '✅' : '❌'}
                    </div>
                    <div className="space-y-1 ml-2">
                      {p.progress.choicePattern.details.map((detail) => (
                        <div key={detail.tag} className="text-xs text-slate-300">
                          "{detail.tag}": {detail.met ? '✅' : '❌'} {detail.current}/{detail.required}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {state.unlockedArchetypes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700/50">
              <div className="text-xs text-green-400 font-semibold mb-2">
                ✅ Unlocked ({state.unlockedArchetypes.length})
              </div>
              <div className="space-y-1">
                {state.unlockedArchetypes.map(id => (
                  <div key={id} className="text-xs text-green-300">
                    • {id}
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}

