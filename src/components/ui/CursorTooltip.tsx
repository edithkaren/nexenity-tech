import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { cn } from '../../lib/utils';

interface CursorTooltipProps {
  content: string;
  active: boolean;
  className?: string;
}

export function CursorTooltip({ content, active, className }: CursorTooltipProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        translateX: '-50%',
        translateY: '-140%',
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ 
        opacity: active ? 1 : 0, 
        scale: active ? 1 : 0.8,
        y: active ? 0 : 10,
        transition: { 
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      className={cn(
        "fixed z-[1000] pointer-events-none px-4 py-2 bg-brand-accent text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl backdrop-blur-md",
        className
      )}
    >
      <div className="relative">
        {content}
        {/* Triangle arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-accent rotate-45" />
      </div>
    </motion.div>
  );
}
