'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Event } from '@/types/game';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SwipeCardProps {
  event: Event;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onContinue?: () => void;
}

export default function SwipeCard({ event, onSwipeLeft, onSwipeRight, onContinue }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const isNarrative = event.type === 'narrative';

  function handleDragEnd(_event: any, info: any) {
    if (isNarrative) return;
    
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      onSwipeLeft();
    }
  }

  return (
    <motion.div
      drag={isNarrative ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      style={isNarrative ? {} : { x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className={`
        absolute w-full h-full 
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        backdrop-blur-xl
        border ${isNarrative ? 'border-blue-500/30' : 'border-slate-700/50'}
        rounded-2xl 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        p-6 sm:p-8
        select-none
        ${isNarrative ? '' : 'cursor-grab active:cursor-grabbing'}
      `}
    >
      {/* Portrait */}
      <div className={`
        w-24 h-24 mx-auto mb-6 
        rounded-full overflow-hidden 
        border-2 ${isNarrative ? 'border-blue-400/50' : 'border-slate-600/50'}
        shadow-lg
        ring-4 ${isNarrative ? 'ring-blue-500/10' : 'ring-slate-700/20'}
      `}>
        <img 
          src={event.characterImage} 
          alt={event.character} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Character name */}
      <h2 className="
        text-xl sm:text-2xl font-display font-bold 
        text-center mb-5
        text-slate-100
        tracking-wide
      ">
        {event.character}
      </h2>

      {/* Event text */}
      <div className={`
        rounded-xl p-5 sm:p-6 mb-6 min-h-[160px] 
        flex items-center
        ${isNarrative 
          ? 'bg-blue-950/40 border border-blue-500/20 backdrop-blur-sm' 
          : 'bg-slate-800/40 border border-slate-600/20 backdrop-blur-sm'
        }
      `}>
        <p className="text-sm sm:text-base leading-relaxed text-slate-200 text-balance">
          {event.text}
        </p>
      </div>

      {/* Choices or Continue Button */}
      <div className="absolute bottom-6 left-6 right-6">
        {isNarrative ? (
          <button
            onClick={onContinue}
            className="
              w-full 
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-500 hover:to-blue-400
              text-white font-semibold 
              py-4 rounded-xl 
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
            rounded-xl p-5
            backdrop-blur-sm
            hover:border-slate-500/50
            transition-all
          ">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">{event.leftChoice}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <span className="text-sm font-medium">{event.rightChoice}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visual feedback during drag (only for choice cards) */}
      {!isNarrative && (
        <>
          <motion.div
            style={{ opacity: useTransform(x, [-100, -50, 0], [1, 0.5, 0]) }}
            className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none"
          >
            <div className="
              w-16 h-16 rounded-full 
              bg-gradient-to-br from-red-500/20 to-red-600/20
              border border-red-400/30
              flex items-center justify-center
              backdrop-blur-sm
            ">
              <ChevronLeft className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: useTransform(x, [0, 50, 100], [0, 0.5, 1]) }}
            className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none"
          >
            <div className="
              w-16 h-16 rounded-full 
              bg-gradient-to-br from-green-500/20 to-green-600/20
              border border-green-400/30
              flex items-center justify-center
              backdrop-blur-sm
            ">
              <ChevronRight className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
