import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from './SmoothScroll';
import { Magnetic } from './Magnetic';
import { cn } from '../../lib/utils';

interface ScrollToTopProps {
  theme?: 'dark' | 'light';
}

export function ScrollToTop({ theme = 'dark' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useSmoothScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if scrolled more than 800px (approx hero height)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Magnetic className="fixed bottom-8 right-8 z-[1500]" strength={0.5}>
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border backdrop-blur-md group",
              theme === 'dark' 
                ? "bg-black/60 text-white border-white/10 hover:border-brand-accent/50 hover:bg-brand-accent/10" 
                : "bg-white/60 text-black border-black/10 hover:border-brand-accent/50 hover:bg-brand-accent/5"
            )}
            aria-label="Scroll to top"
          >
            <div className="absolute inset-0 rounded-full bg-brand-accent/20 scale-0 group-hover:scale-100 transition-transform duration-500 blur-xl" />
            <ArrowUp size={20} className="relative z-10 group-hover:text-brand-accent transition-colors" />
            
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border border-brand-accent/20 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '3s' }} />
          </motion.button>
        </Magnetic>
      )}
    </AnimatePresence>
  );
}
