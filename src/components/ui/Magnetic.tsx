import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { cn } from '../../lib/utils';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  className?: string;
}

/**
 * A wrapper component that adds a "magnetic" pull effect to its child.
 * When the user hovers near the child, it subtly moves toward the cursor.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative p-8 -m-8 flex items-center justify-center", className)}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
