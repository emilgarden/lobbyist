'use client';

import { motion } from 'framer-motion';
import { Event } from '@/types/game';
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getColorSchemeConfig } from '@/data/colorSchemes';

interface SwipeCardProps {
  event: Event;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onContinue?: () => void;
  onChoiceMade?: (direction: 'left' | 'right') => void; // Called immediately when choice is made
}

export default function SwipeCard({ event, onSwipeLeft, onSwipeRight, onContinue, onChoiceMade }: SwipeCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  
  const colorScheme = useGameStore((state) => state.colorScheme);
  const schemeConfig = getColorSchemeConfig(colorScheme);
  const activeResourceChanges = useGameStore((state) => state.activeResourceChanges);

  const isNarrative = event.type === 'narrative';
  const isConsequenceCard = event.character === 'Konsekvens';
  const hasResourceChanges = Object.keys(activeResourceChanges).some(
    key => activeResourceChanges[key as keyof typeof activeResourceChanges] !== undefined && 
           activeResourceChanges[key as keyof typeof activeResourceChanges] !== 0
  );
  
  // Special visual treatment for consequence cards with resource changes
  const hasSpecialVisuals = isConsequenceCard && hasResourceChanges;

  // Haptic feedback helper (for supported devices)
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns: Record<string, number> = {
        light: 10,
        medium: 20,
        heavy: 30,
      };
      navigator.vibrate(patterns[type]);
    }
  };

  const handleChoice = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    // Call onChoiceMade immediately to trigger resource changes animation
    if (onChoiceMade) {
      onChoiceMade(direction);
    }
    
    setIsAnimating(true);
    setExitDirection(direction);
    triggerHaptic('medium');
    
    // Trigger callback after animation completes
    setTimeout(() => {
      if (direction === 'left') {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }, 300);
  };

  // Exit animation variants
  const exitVariants: Record<'left' | 'right', { x: number; rotate: number; opacity: number }> = {
    left: {
      x: -500,
      rotate: -30,
      opacity: 0,
    },
    right: {
      x: 500,
      rotate: 30,
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={exitDirection ? exitVariants[exitDirection] : { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: 0,
        x: 0,
      }}
      transition={{
        duration: 0.3,
        ease: exitDirection ? 'easeInOut' : 'easeOut',
      }}
      className={`
        absolute w-full h-full 
        ${schemeConfig.background}
        backdrop-blur-xl
        border ${hasSpecialVisuals
          ? 'border-amber-500/50 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
          : isNarrative 
            ? 'border-blue-500/30' 
            : 'border-slate-700/50'}
        rounded-xl sm:rounded-2xl 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        p-4 sm:p-6 md:p-8
        select-none
        flex flex-col
        ${hasSpecialVisuals ? 'animate-[pulse_2s_ease-in-out_2]' : ''}
      `}
    >
      {/* Header: Character info and act indicator */}
      <div className="flex-shrink-0 mb-3 sm:mb-4">
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          {/* Portrait - smaller, left-aligned */}
          <div className={`
            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-lg overflow-hidden 
            border-2 ${isNarrative ? 'border-blue-400/50' : 'border-slate-600/50'}
            shadow-md
            flex-shrink-0
          `}>
            <img 
              src={event.characterImage} 
              alt={event.character} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Character name and act */}
          <div className="flex-1 min-w-0">
            <h2 className="
              text-base sm:text-lg md:text-xl font-display font-bold 
              text-slate-100
              tracking-wide
              truncate
            ">
              {event.character}
            </h2>
            {event.act && !isNarrative && (
              <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                Akt {event.act}
              </div>
            )}
            {isNarrative && !isConsequenceCard && (
              <div className="text-[10px] sm:text-xs text-blue-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                <span>📖</span>
                <span>Fortelling</span>
              </div>
            )}
            {isConsequenceCard && (
              <div className="text-[10px] sm:text-xs text-amber-400 uppercase tracking-wider mt-0.5 flex items-center gap-1 animate-pulse">
                <span>⚡</span>
                <span>Konsekvens</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event text - More prominent, better spacing */}
      <div className={`
        flex-1 min-h-0 overflow-y-auto mb-3 sm:mb-4
        flex items-start
      `}>
        <div className={`
          rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6
          w-full
          ${hasSpecialVisuals
            ? 'bg-amber-950/30 border border-amber-500/40 backdrop-blur-sm'
            : isNarrative 
              ? 'bg-blue-950/50 border border-blue-500/30 backdrop-blur-sm' 
              : 'bg-slate-800/50 border border-slate-600/30 backdrop-blur-sm'
          }
        `}>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-100 text-balance">
            {event.text}
          </p>
        </div>
      </div>

      {/* Choices or Continue Button */}
      <div className="flex-shrink-0 mt-auto">
        {isNarrative ? (
          <button
            onClick={onContinue}
            disabled={isAnimating}
            className="
              w-full 
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              active:from-blue-400 active:to-blue-300
              disabled:opacity-50 disabled:cursor-not-allowed
              text-white font-semibold 
              py-3.5 sm:py-4 md:py-4.5
              text-sm sm:text-base
              rounded-lg sm:rounded-xl 
              transition-all duration-200
              shadow-lg shadow-blue-500/20
              hover:shadow-blue-500/30
              border border-blue-400/20
              touch-manipulation
            "
          >
            Fortsett →
          </button>
        ) : (
          <div className="space-y-2">
            {/* Choice labels for better context */}
            <div className="flex gap-2 sm:gap-3">
              {/* Left Choice Button */}
              <button
                onClick={() => handleChoice('left')}
                disabled={isAnimating}
                className="
                  flex-1
                  bg-gradient-to-br from-slate-700/95 to-slate-800/95
                  hover:from-slate-600 hover:to-slate-700
                  active:from-slate-500 active:to-slate-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-white font-semibold 
                  py-3.5 sm:py-4 md:py-4.5
                  text-xs sm:text-sm
                  rounded-lg sm:rounded-xl 
                  transition-all duration-200
                  shadow-lg shadow-slate-700/20
                  hover:shadow-slate-600/30
                  border border-slate-600/30
                  flex items-center justify-center
                  touch-manipulation
                  min-h-[60px] sm:min-h-[70px]
                "
              >
                <span className="text-center px-2 leading-tight">{event.leftChoice}</span>
              </button>
              
              {/* Right Choice Button */}
              <button
                onClick={() => handleChoice('right')}
                disabled={isAnimating}
                className="
                  flex-1
                  bg-gradient-to-br from-blue-700/95 to-blue-800/95
                  hover:from-blue-600 hover:to-blue-700
                  active:from-blue-500 active:to-blue-600
                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-white font-semibold 
                  py-3.5 sm:py-4 md:py-4.5
                  text-xs sm:text-sm
                  rounded-lg sm:rounded-xl 
                  transition-all duration-200
                  shadow-lg shadow-blue-700/20
                  hover:shadow-blue-600/30
                  border border-blue-600/30
                  flex items-center justify-center
                  touch-manipulation
                  min-h-[60px] sm:min-h-[70px]
                "
              >
                <span className="text-center px-2 leading-tight">{event.rightChoice}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
