import { useEffect, useRef, ReactNode, createContext, useContext, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from 'motion/react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [_, setTick] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform velocity into a skew angle (capped at +/- 2 degrees for subtlety)
  const skewVelocity = useTransform(
    scrollVelocity,
    [-1000, 1000],
    [-2, 2]
  );

  const smoothSkew = useSpring(skewVelocity, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Force re-render once to provide lenis instance to context
    setTick(t => t + 1);

    let rafId: number | null = null;
    let isMounted = true;
    function raf(time: number) {
      if (!isMounted) return;
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      isMounted = false;
      lenisRef.current?.destroy();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      <motion.div
        style={{ skewY: shouldReduceMotion ? 0 : smoothSkew }}
        className="origin-center"
      >
        {children}
      </motion.div>
    </SmoothScrollContext.Provider>
  );
}
