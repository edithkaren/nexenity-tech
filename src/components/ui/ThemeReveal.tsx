import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeRevealProps {
  active: boolean;
  theme: 'dark' | 'light';
  x: number;
  y: number;
  onComplete: () => void;
}

export function ThemeReveal({ active, theme, x, y, onComplete }: ThemeRevealProps) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {active && (
        <motion.div
          initial={{ 
            clipPath: `circle(0% at ${x}px ${y}px)`,
            opacity: 1
          }}
          animate={{ 
            clipPath: `circle(150% at ${x}px ${y}px)`,
            opacity: 1
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, delay: 0.2 }
          }}
          transition={{ 
            duration: 1,
            ease: [0.23, 1, 0.32, 1] // Custom ease-out expo
          }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
          }}
        />
      )}
    </AnimatePresence>
  );
}
