import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = "",
  threshold = 0.1,
  once = true,
}: RevealProps) {
  const { ref, controls, variants } = useScrollReveal({
    threshold,
    once,
    delay,
    duration,
    yOffset,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
