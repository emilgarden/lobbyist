'use client';

import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import SwipeCard from '@/components/SwipeCard';
import ResourceDisplay from '@/components/ResourceDisplay';
import GameOver from '@/components/GameOver';
import Settings from '@/components/Settings';
import SettingsButton from '@/components/SettingsButton';
import ArchetypeUnlock from '@/components/ArchetypeUnlock';
import ArchetypeDebug from '@/components/ArchetypeDebug';
import { getThemeConfig } from '@/data/themes';

export default function Game() {
  const { 
    events, 
    currentEventIndex, 
    gameOver, 
    theme,
    applyConsequence, 
    nextEvent 
  } = useGameStore();

  const currentEvent = events?.[currentEventIndex];
  const themeConfig = getThemeConfig(theme);

  // Safety check: if no event or events array is empty, show loading state
  if (!currentEvent || !events || events.length === 0) {
    return (
      <main className={`min-h-screen ${themeConfig.gradient} flex items-center justify-center p-4`}>
        <div className="text-slate-200 text-center">
          <p className="text-lg mb-2">Laster spill...</p>
          <p className="text-sm text-slate-400">Vennligst vent</p>
        </div>
      </main>
    );
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentEvent || currentEvent.type === 'narrative') return;
    
    const consequence = currentEvent.consequences?.[direction];
    if (consequence) {
      applyConsequence(consequence, direction, currentEvent);
    }
    
    // Shorter delay for snappier feel - spring animation handles the transition
    setTimeout(() => {
      nextEvent();
    }, 200);
  };

  const handleContinue = () => {
    // For narrative cards, just move to next event
    nextEvent();
  };

  return (
    <main className={`min-h-screen ${themeConfig.gradient} flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-500`}>
      {/* Resource Display - Compact on mobile, at top */}
      <div className="w-full max-w-screen-lg pt-2 sm:pt-4 pb-3 sm:pb-4">
        <ResourceDisplay />
      </div>
      
      {/* Card Area - Centered with balanced spacing */}
      <div className="flex-1 flex items-center justify-center w-full max-w-[400px] mb-20 sm:mb-24 min-h-0 py-2 sm:py-4">
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[520px]">
          <AnimatePresence mode="wait" initial={false}>
            <SwipeCard
              key={currentEvent.id}
              event={currentEvent}
              onSwipeLeft={() => handleSwipe('left')}
              onSwipeRight={() => handleSwipe('right')}
              onContinue={handleContinue}
            />
          </AnimatePresence>
        </div>
      </div>
      
      {/* Menu Button - Bottom Bar */}
      <SettingsButton />

      {/* Overlays */}
      {gameOver && <GameOver />}
      <Settings />
      <ArchetypeUnlock />
      <ArchetypeDebug />
    </main>
  );
}
