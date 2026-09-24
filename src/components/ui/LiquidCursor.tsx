import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface LiquidCursorProps {
  theme?: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  targetX: number;
  targetY: number;
  mass: number;
  damping: number;
  stiffness: number;
}

export function LiquidCursor({ theme = 'dark' }: LiquidCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovering = useRef(false);
  const [hoverState, setHoverState] = useState(false);

  // Precision Ring Spring
  const ringSpring = { damping: 30, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    // Define Liquid Particles
    const particles: Particle[] = [
      { x: 0, y: 0, vx: 0, vy: 0, size: 450, color: '#00f3ff', targetX: 0, targetY: 0, mass: 1.5, damping: 0.85, stiffness: 0.05 },
      { x: 0, y: 0, vx: 0, vy: 0, size: 500, color: '#ff2d95', targetX: 0, targetY: 0, mass: 2.5, damping: 0.8, stiffness: 0.03 },
      { x: 0, y: 0, vx: 0, vy: 0, size: 300, color: '#ff8c00', targetX: 0, targetY: 0, mass: 1.2, damping: 0.9, stiffness: 0.08 },
      { x: 0, y: 0, vx: 0, vy: 0, size: 250, color: '#00ff9d', targetX: 0, targetY: 0, mass: 1.0, damping: 0.92, stiffness: 0.1 }
    ];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      particles.forEach(p => {
        p.targetX = e.clientX;
        p.targetY = e.clientY;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      isHovering.current = !!isInteractive;
      setHoverState(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Use additive blending for "liquid light" feel
      ctx.globalCompositeOperation = 'screen';
      
      particles.forEach(p => {
        // Physics Simulation (Spring behavior)
        const ax = (p.targetX - p.x) * p.stiffness;
        const ay = (p.targetY - p.y) * p.stiffness;
        
        p.vx += ax / p.mass;
        p.vy += ay / p.mass;
        
        p.vx *= p.damping;
        p.vy *= p.damping;
        
        p.x += p.vx;
        p.y += p.vy;

        // Visual Rendering
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        const opacity = theme === 'dark' ? 0.25 : 0.15;
        const hoverScale = isHovering.current ? 1.4 : 1;
        
        gradient.addColorStop(0, `${p.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${p.color}00`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * hoverScale, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [theme, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* High-Fidelity Fluid Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(40px)' }} // Extra diffusion layer
      />

      {/* Modern Interaction Ring (Difference Blend) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute z-[9999]"
      >
        <motion.div
          animate={{
            width: hoverState ? 80 : 32,
            height: hoverState ? 80 : 32,
            borderWidth: hoverState ? 1 : 2,
          }}
          className="rounded-full border border-white mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center"
        >
          <motion.div 
            animate={{
              scale: hoverState ? 0 : 1,
            }}
            className="w-1 h-1 bg-white rounded-full"
          />
          
          {hoverState && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-bold text-white tracking-widest uppercase"
            >
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

