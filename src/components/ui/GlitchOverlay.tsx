import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function GlitchOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  // Expose a way to trigger the glitch via custom event
  useEffect(() => {
    let timeoutId: number;
    const triggerGlitch = () => {
      setIsVisible(true);
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsVisible(false), 800);
    };

    window.addEventListener('trigger-glitch', triggerGlitch);
    return () => {
      window.removeEventListener('trigger-glitch', triggerGlitch);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        >
          {/* Glitch Bars */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-brand-accent/20 backdrop-blur-md"
          />
          
          {/* Scanning lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1]" 
               style={{ backgroundSize: '100% 2px, 3px 100%' }} />
          
          {/* Data fragments */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <motion.span 
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ duration: 0.2, repeat: 4 }}
              className="text-4xl font-black text-white tracking-[1em] uppercase mb-4"
            >
              SYNCING_SYSTEM
            </motion.span>
            <div className="h-1 w-64 bg-white/20 relative overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-brand-accent shadow-[0_0_15px_#ff2d95]"
              />
            </div>
          </div>
          
          {/* Full-screen flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.1, times: [0, 0.5, 1] }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
