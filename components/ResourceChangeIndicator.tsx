'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ResourceChangeIndicatorProps {
  value: number;
  isVisible: boolean;
}

export default function ResourceChangeIndicator({ value, isVisible }: ResourceChangeIndicatorProps) {
  const isPositive = value > 0;
  const displayValue = isPositive ? `+${value}` : `${value}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: -10,
            scale: [0.9, 1, 1, 0.85]
          }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            duration: 1.2,
            times: [0, 0.15, 0.85, 1],
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`
            absolute -top-2 left-1/2 -translate-x-1/2
            pointer-events-none
            z-50
            whitespace-nowrap
            font-bold text-base sm:text-lg
            ${isPositive ? 'text-green-400' : 'text-red-400'}
            drop-shadow-lg
          `}
          style={{
            textShadow: isPositive 
              ? '0 0 10px rgba(74, 222, 128, 0.8), 0 0 20px rgba(74, 222, 128, 0.5), 0 0 30px rgba(74, 222, 128, 0.3)'
              : '0 0 10px rgba(248, 113, 113, 0.8), 0 0 20px rgba(248, 113, 113, 0.5), 0 0 30px rgba(248, 113, 113, 0.3)'
          }}
        >
          {displayValue}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

