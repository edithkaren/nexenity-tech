import { ReactNode, createContext, useContext } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from 'motion/react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScrollContext = createContext<any>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: SmoothScrollProps) {
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

  return (
    <SmoothScrollContext.Provider value={null}>
      <motion.div
        className="origin-center"
      >
        {children}
      </motion.div>
    </SmoothScrollContext.Provider>
  );
}
