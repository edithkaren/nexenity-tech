import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

interface ShapeProps {
  mouseX: any;
  mouseY: any;
  index: number;
  reducedMotion?: boolean;
}

const Shape = ({ mouseX, mouseY, index, reducedMotion = false }: ShapeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Base positions for each index
  const initialPos = useMemo(() => [
    { top: '15%', left: '10%' },
    { top: '65%', left: '80%' },
    { top: '25%', left: '75%' },
    { top: '75%', left: '15%' },
    { top: '45%', left: '50%' },
    { top: '10%', left: '40%' },
  ], []);

  const pos = initialPos[index % initialPos.length];

  // Elastic physics for position
  const x = useSpring(0, { stiffness: 60, damping: 20 });
  const y = useSpring(0, { stiffness: 60, damping: 20 });
  
  // Elastic physics for rotation
  const rotateX = useSpring(0, { stiffness: 50, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 50, damping: 15 });

  useEffect(() => {
    if (reducedMotion) return;
    
    let isMounted = true;
    const unsubscribeX = mouseX.on("change", (mx: number) => {
      if (!isMounted || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = mx - centerX;
      const dy = mouseY.get() - centerY;
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      
      // Repulsion logic
      const radius = 300;
      if (distance < radius) {
        const force = (radius - distance) / radius;
        const pushX = (dx / distance) * force * 150;
        const pushY = (dy / distance) * force * 150;
        
        x.set(pushX);
        y.set(pushY);
        rotateX.set(-pushY * 0.2);
        rotateY.set(pushX * 0.2);
      } else {
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeX();
    };
  }, [mouseX, mouseY, x, y, rotateX, rotateY, reducedMotion]);

  // Variations of shapes
  const shapes = [
    <div className="w-32 h-32 border border-cyan-500/30 rounded-lg relative preserve-3d">
      <div className="absolute inset-0 border border-cyan-500/10 translate-z-10" />
      <div className="absolute inset-0 bg-cyan-500/5 backdrop-blur-[2px]" />
    </div>,
    <div className="w-48 h-12 bg-gradient-to-r from-purple-500/20 to-transparent border-l-2 border-purple-500/50 backdrop-blur-sm" />,
    <div className="w-24 h-24 border-2 border-pink-500/30 rounded-full shadow-[0_0_20px_rgba(255,45,149,0.2)]" />,
    <div className="w-40 h-40 grid grid-cols-4 grid-rows-4 gap-2 opacity-20">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="bg-cyan-400/40 rounded-sm" />
      ))}
    </div>
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'absolute',
        ...pos,
        x,
        y,
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      animate={reducedMotion ? {} : {
        rotateZ: [0, 5, 0]
      }}
      transition={{
        duration: 15 + index * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="pointer-events-none select-none"
    >
      {shapes[index % shapes.length]}
    </motion.div>
  );
};

export function GeometricBackground({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-purple-500/5 rounded-full blur-[150px]" />
      
      {Array.from({ length: 8 }).map((_, i) => (
        <Shape key={i} index={i} mouseX={mouseX} mouseY={mouseY} reducedMotion={reducedMotion} />
      ))}

      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}
