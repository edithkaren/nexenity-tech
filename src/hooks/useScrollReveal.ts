import { useInView, useAnimation, Variant } from 'motion/react';
import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function useScrollReveal({
  threshold = 0.1,
  once = true,
  delay = 0,
  duration = 0.8,
  yOffset = 20,
}: ScrollRevealOptions = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const controls = useAnimation();

  const variants = {
    hidden: { 
      opacity: 0, 
      y: yOffset,
      scale: 0.95,
      transition: { duration }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as const // Quartic ease out
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return { ref, controls, variants };
}
