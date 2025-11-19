'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Event } from '@/types/game';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface SwipeCardProps {
  event: Event;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onContinue?: () => void;
}

export default function SwipeCard({ event, onSwipeLeft, onSwipeRight, onContinue }: SwipeCardProps) {
  const x = useMotionValue(0);
  
  // Smooth spring animation for natural feel
  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  
  // More responsive rotation - starts earlier, maxes out sooner
  const rotate = useTransform(xSpring, [-150, 0, 150], [-20, 0, 20]);
  
  // Opacity fades out more gradually
  const opacity = useTransform(xSpring, [-200, -80, 0, 80, 200], [0, 0.7, 1, 0.7, 0]);
  
  // Scale down slightly when dragging
  const scale = useTransform(xSpring, [-200, 0, 200], [0.95, 1, 0.95]);

  const isNarrative = event.type === 'narrative';

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

  function handleDragEnd(_event: any, info: any) {
    if (isNarrative) return;
    
    // Lower threshold for mobile (more responsive)
    // Also consider velocity for natural swipe feel
    const threshold = 60; // Reduced from 100 for better mobile responsiveness
    const velocityThreshold = 500; // Fast swipe triggers even with less distance
    
    const shouldSwipeRight = info.offset.x > threshold || info.velocity.x > velocityThreshold;
    const shouldSwipeLeft = info.offset.x < -threshold || info.velocity.x < -velocityThreshold;
    
    if (shouldSwipeRight) {
      triggerHaptic('medium');
      onSwipeRight();
    } else if (shouldSwipeLeft) {
      triggerHaptic('medium');
      onSwipeLeft();
    } else {
      // Snap back if not enough swipe
      x.set(0);
    }
  }

  // Reset position when event changes
  useEffect(() => {
    x.set(0);
  }, [event.id, x]);

  return (
    <motion.div
      drag={isNarrative ? false : "x"}
      dragConstraints={{ left: -200, right: 200 }} // Allow more drag range
      dragElastic={0.2} // Slight elastic feel at edges
      dragMomentum={false} // Disable momentum to prevent accidental swipes
      style={isNarrative ? {} : { x: xSpring, rotate, opacity, scale }}
      onDragEnd={handleDragEnd}
      onDragStart={() => {
        if (!isNarrative) triggerHaptic('light');
      }}
      className={`
        absolute w-full h-full 
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        backdrop-blur-xl
        border ${isNarrative ? 'border-blue-500/30' : 'border-slate-700/50'}
        rounded-xl sm:rounded-2xl 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        p-4 sm:p-6 md:p-8
        select-none
        flex flex-col
        touch-none
        ${isNarrative ? '' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      {/* Portrait */}
      <div className={`
        w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 md:mb-6 
        rounded-full overflow-hidden 
        border-2 ${isNarrative ? 'border-blue-400/50' : 'border-slate-600/50'}
        shadow-lg
        ring-2 sm:ring-4 ${isNarrative ? 'ring-blue-500/10' : 'ring-slate-700/20'}
        flex-shrink-0
      `}>
        <img 
          src={event.characterImage} 
          alt={event.character} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Character name */}
      <h2 className="
        text-lg sm:text-xl md:text-2xl font-display font-bold 
        text-center mb-2 sm:mb-3 md:mb-4
        text-slate-100
        tracking-wide
        flex-shrink-0
      ">
        {event.character}
      </h2>

      {/* Event text - flex-1 to take available space */}
      <div className={`
        rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 md:mb-5
        flex items-center flex-1 min-h-0 overflow-y-auto
        ${isNarrative 
          ? 'bg-blue-950/40 border border-blue-500/20 backdrop-blur-sm' 
          : 'bg-slate-800/40 border border-slate-600/20 backdrop-blur-sm'
        }
      `}>
        <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-200 text-balance w-full">
          {event.text}
        </p>
      </div>

      {/* Choices or Continue Button */}
      <div className="flex-shrink-0 mt-auto pb-2 sm:pb-4 md:pb-6">
        {isNarrative ? (
          <button
            onClick={onContinue}
            className="
              w-full 
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              text-white font-semibold 
              py-3 sm:py-3.5 md:py-4 
              text-sm sm:text-base
              rounded-lg sm:rounded-xl 
              transition-all duration-200
              shadow-lg shadow-blue-500/20
              hover:shadow-blue-500/30
              border border-blue-400/20
            "
          >
            Fortsett →
          </button>
        ) : (
          <div className="
            bg-slate-800/60
            border border-slate-600/30
            rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5
            backdrop-blur-sm
            hover:border-slate-500/50
            transition-all
          ">
            <div className="flex justify-between items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2 text-slate-300 hover:text-white transition-colors flex-1 min-w-0">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">{event.leftChoice}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-slate-300 hover:text-white transition-colors flex-1 min-w-0 justify-end">
                <span className="text-xs sm:text-sm font-medium truncate">{event.rightChoice}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual feedback during drag (only for choice cards) */}
      {!isNarrative && (
        <>
          {/* Left swipe indicator - more visible and responsive */}
          <motion.div
            style={{ 
              opacity: useTransform(xSpring, [-80, -40, 0], [1, 0.6, 0]),
              scale: useTransform(xSpring, [-80, -40, 0], [1.1, 1, 0.8])
            }}
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 pointer-events-none z-10"
          >
            <div className="
              w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full 
              bg-gradient-to-br from-red-500/30 to-red-600/30
              border-2 border-red-400/50
              flex items-center justify-center
              backdrop-blur-md
              shadow-lg shadow-red-500/30
            ">
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-300" />
            </div>
          </motion.div>
          
          {/* Right swipe indicator - more visible and responsive */}
          <motion.div
            style={{ 
              opacity: useTransform(xSpring, [0, 40, 80], [0, 0.6, 1]),
              scale: useTransform(xSpring, [0, 40, 80], [0.8, 1, 1.1])
            }}
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 pointer-events-none z-10"
          >
            <div className="
              w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full 
              bg-gradient-to-br from-green-500/30 to-green-600/30
              border-2 border-green-400/50
              flex items-center justify-center
              backdrop-blur-md
              shadow-lg shadow-green-500/30
            ">
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-300" />
            </div>
          </motion.div>
          
          {/* Progress indicator bar at bottom - shows swipe progress */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none overflow-hidden bg-slate-700/30"
          >
            <motion.div
              style={{
                width: useTransform(xSpring, [-200, 0, 200], ['50%', '0%', '50%']),
                x: useTransform(xSpring, [-200, 0, 200], ['-50%', '0%', '50%']),
              }}
              className="absolute inset-y-0 bg-gradient-to-r from-red-500 via-transparent to-green-500 opacity-70"
            />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
