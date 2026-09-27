import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface ParallaxElementProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  reverse?: boolean;
}

export function ParallaxElement({ children, offset = 50, className, reverse = false }: ParallaxElementProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const range = reverse ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
