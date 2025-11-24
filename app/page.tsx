'use client';

import { AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import SwipeCard from '@/components/SwipeCard';
import ResourceDisplay from '@/components/ResourceDisplay';
import GameOver from '@/components/GameOver';
import Settings from '@/components/Settings';
import SettingsButton from '@/components/SettingsButton';
import ArchetypeUnlock from '@/components/ArchetypeUnlock';
import { getColorSchemeConfig } from '@/data/colorSchemes';

export default function Game() {
  const { 
    events, 
    currentEventIndex, 
    gameOver, 
    colorScheme,
    applyConsequence, 
    nextEvent 
  } = useGameStore();

  const currentEvent = events?.[currentEventIndex];
  const schemeConfig = getColorSchemeConfig(colorScheme);

  // Safety check: if no event or events array is empty, show loading state
  if (!currentEvent || !events || events.length === 0) {
    return (
      <main className={`min-h-screen ${schemeConfig.background} flex items-center justify-center p-4`}>
        <div className="text-slate-200 text-center">
          <p className="text-lg mb-2">Laster spill...</p>
          <p className="text-sm text-slate-400">Vennligst vent</p>
        </div>
      </main>
    );
  }

  const handleChoiceMade = (direction: 'left' | 'right') => {
    // This is called immediately when user clicks, before card animation
    console.log('[handleChoiceMade] Direction:', direction, 'Event:', currentEvent?.id);
    if (!currentEvent || currentEvent.type === 'narrative') return;
    
    const consequence = currentEvent.consequences?.[direction];
    if (consequence) {
      // Apply consequence immediately - this will trigger resource change animation
      // This happens simultaneously with the card exit animation
      applyConsequence(consequence, direction, currentEvent);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    // This is called after card animation completes (300ms)
    // Add 100ms buffer for AnimatePresence to demount cleanly
    console.log('[handleSwipe] Card animation complete for:', direction);
    setTimeout(() => {
      console.log('[handleSwipe] Calling nextEvent after buffer');
      nextEvent();
    }, 100); // Buffer for AnimatePresence demontering
  };

  const handleContinue = () => {
    // For narrative cards, add same delay as choice events for consistency
    console.log('[handleContinue] Narrative continue clicked');
    setTimeout(() => {
      console.log('[handleContinue] Calling nextEvent after buffer');
      nextEvent();
    }, 100); // Consistent timing with choice events
  };

  return (
    <main className={`min-h-screen ${schemeConfig.background} flex flex-col items-center justify-start p-2 sm:p-4 transition-colors duration-500`}>
      {/* Resource Display - Fixed position at top */}
      <div className="w-full max-w-screen-lg pt-2 sm:pt-4">
        <ResourceDisplay />
      </div>
      
      {/* Card Area - Fixed distance from resource bar */}
      <div className="flex items-center justify-center w-full max-w-[400px] mt-4 sm:mt-8 mb-20 sm:mb-24">
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[520px]">
          <AnimatePresence mode="wait" initial={false}>
            <SwipeCard
              key={currentEvent.id}
              event={currentEvent}
              onSwipeLeft={() => handleSwipe('left')}
              onSwipeRight={() => handleSwipe('right')}
              onContinue={handleContinue}
              onChoiceMade={handleChoiceMade}
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
    </main>
  );
}
