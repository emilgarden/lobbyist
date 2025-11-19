'use client';

import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

/**
 * ARCHETYPE UNLOCK MODAL
 * Shows when player unlocks a new archetype
 */
export default function ArchetypeUnlock() {
  const { pendingArchetype, dismissArchetype } = useGameStore();

  if (!pendingArchetype) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70"
        onClick={dismissArchetype}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-2xl border border-purple-500/30 shadow-[0_20px_80px_rgba(139,92,246,0.3)] max-w-md w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={dismissArchetype}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className="inline-block"
            >
              <Sparkles className="w-16 h-16 text-yellow-400 mb-4 mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 mb-2">
              Archetype Unlocked!
            </h2>
            
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-5xl">{pendingArchetype.icon}</span>
              <h3 className="text-2xl font-display font-bold text-slate-100">
                {pendingArchetype.name}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-center mb-4 leading-relaxed">
            {pendingArchetype.description}
          </p>
          
          {/* Boost notification */}
          <div className="bg-green-900/30 rounded-lg p-3 mb-6 border border-green-500/30">
            <p className="text-sm text-green-200 text-center">
              ✨ Du fikk +5 til alle ressurser som belønning!
            </p>
          </div>

          {/* Unlock conditions display */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
            <h4 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">
              Du Oppnådde
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              {pendingArchetype.unlockConditions.resources && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Ressurskrav oppfylt</span>
                </div>
              )}
              {pendingArchetype.unlockConditions.choicePattern && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Valg-mønster gjenkjent</span>
                </div>
              )}
              {pendingArchetype.unlockConditions.minTurn && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span>Minimum turer fullført</span>
                </div>
              )}
            </div>
          </div>

          {/* Special events info */}
          <div className="bg-purple-900/30 rounded-xl p-4 mb-6 border border-purple-500/30">
            <p className="text-sm text-purple-200 text-center">
              <Sparkles className="inline w-4 h-4 mr-1" />
              <strong>{pendingArchetype.specialEvents.length}</strong> nye spesielle events er nå tilgjengelig!
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={dismissArchetype}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
          >
            Fortsett Spillet
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

