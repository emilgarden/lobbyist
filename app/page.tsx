'use client';

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

  const currentEvent = events[currentEventIndex];
  const themeConfig = getThemeConfig(theme);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentEvent.type === 'narrative') return; // Shouldn't happen, but safety check
    
    const consequence = currentEvent.consequences?.[direction];
    if (consequence) {
      applyConsequence(consequence, direction, currentEvent);
    }
    
    // Small delay before showing next card
    setTimeout(() => {
      nextEvent();
    }, 300);
  };

  const handleContinue = () => {
    // For narrative cards, just move to next event
    nextEvent();
  };

  return (
    <main className={`min-h-screen ${themeConfig.gradient} flex flex-col items-center justify-start p-2 sm:p-4 transition-colors duration-500`}>
      {/* Resource Display - Compact on mobile */}
      <div className="w-full max-w-screen-lg pt-2 sm:pt-4 pb-2 sm:pb-4">
        <ResourceDisplay />
      </div>
      
      {/* Card Area - Optimized for mobile viewport */}
      <div className="flex-1 flex items-center justify-center w-full max-w-[400px] mb-16 sm:mb-20 min-h-0">
        <div className="relative w-full h-[380px] sm:h-[480px] md:h-[520px]">
          <SwipeCard
            key={currentEvent.id}
            event={currentEvent}
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
            onContinue={handleContinue}
          />
        </div>
      </div>
      
      {/* Settings Button - Bottom Left */}
      <SettingsButton />

      {/* Overlays */}
      {gameOver && <GameOver />}
      <Settings />
      <ArchetypeUnlock />
      <ArchetypeDebug />
    </main>
  );
}
