import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  strength?: number;
}

export function MagneticCard({ 
  children, 
  className, 
  onClick, 
  onMouseEnter,
  onMouseLeave,
  strength = 20 
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate relative pull based on strength
    x.set(distanceX / (rect.width / strength));
    y.set(distanceY / (rect.height / strength));
  };

  const handleMouseLeaveInternal = () => {
    x.set(0);
    y.set(0);
    if (onMouseLeave) onMouseLeave();
  };

  const glowOpacity = useTransform(
    [springX, springY],
    ([latestX, latestY]) => {
      const distance = Math.sqrt(Math.pow(latestX as number, 2) + Math.pow(latestY as number, 2));
      return Math.min(distance / strength, 1);
    }
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeaveInternal}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
      className={className}
    >
      {/* Dynamic Glow Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(circle at center, rgba(0, 243, 255, 0.15) 0%, transparent 70%)',
        }}
      />
      
      {/* Border Glow Highlight */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none border border-brand-accent/0 rounded-[inherit] transition-colors duration-300"
        style={{
          borderColor: useTransform(glowOpacity, [0, 1], ['rgba(0, 243, 255, 0)', 'rgba(0, 243, 255, 0.3)']),
          boxShadow: useTransform(glowOpacity, [0, 1], ['0 0 0px rgba(0, 243, 255, 0)', '0 0 20px rgba(0, 243, 255, 0.1)']),
        }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
