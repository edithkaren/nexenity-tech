import React, { useState } from 'react';
import { Download, X, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { cn } from '../../lib/utils';

export const PWAInstallButton: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all",
          theme === 'dark' 
            ? "bg-white text-black hover:bg-brand-accent hover:text-white" 
            : "bg-black text-white hover:bg-brand-accent hover:text-white"
        )}
      >
        <Download size={16} />
        Install App
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all border border-border-base",
            theme === 'dark' ? "text-white" : "text-black"
          )}
        >
          <Download size={16} />
          Add to Home
        </button>

        <AnimatePresence>
          {showIOSGuide && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "w-full max-w-sm rounded-2xl p-8 relative",
                  theme === 'dark' ? "bg-black border border-white/10" : "bg-white border border-black/10"
                )}
              >
                <button 
                  onClick={() => setShowIOSGuide(false)}
                  className="absolute top-4 right-4 text-text-muted hover:text-text-base"
                >
                  <X size={24} />
                </button>
                
                <h3 className="text-xl font-bold mb-4">Install Nexenity</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  Experience Nexenity as a native app on your iPhone or iPad:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                      <Share size={16} className="text-brand-accent" />
                    </div>
                    <p className="text-sm">
                      1. Tap the <span className="font-bold underline">Share</span> button in the Safari toolbar.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                      <Download size={16} className="text-brand-accent" />
                    </div>
                    <p className="text-sm">
                      2. Scroll down and tap <span className="font-bold underline">Add to Home Screen</span>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowIOSGuide(false)}
                  className={cn(
                    "mt-8 w-full rounded-xl py-3 text-sm font-bold transition-all",
                    theme === 'dark' ? "bg-white text-black" : "bg-black text-white"
                  )}
                >
                  Got it
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return null;
};
