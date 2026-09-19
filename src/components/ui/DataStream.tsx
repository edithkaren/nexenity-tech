import { useEffect, useRef } from 'react';
import { useScroll, useSpring, useTransform } from 'motion/react';

interface Bit {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  color: string;
}

export function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bits = useRef<Bit[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initBits();
    };

    const initBits = () => {
      const count = Math.floor(canvas.width / 15);
      bits.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 3,
        length: 10 + Math.random() * 40,
        opacity: 0.1 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? '#00f3ff' : '#ff2d95'
      }));
    };

    let animationId: number | null = null;
    let isRunning = false;
    let isMounted = true;
    const animate = () => {
      if (!isMounted || !ctx || !canvas) return;
      isRunning = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate speed boost based on scroll (simulated velocity)
      const velocityBoost = Math.abs(scrollVelocity.get()) * 5;

      bits.current.forEach(bit => {
        bit.y += bit.speed + velocityBoost;
        if (bit.y > canvas.height) {
          bit.y = -bit.length;
          bit.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        const grad = ctx.createLinearGradient(bit.x, bit.y, bit.x, bit.y + bit.length);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, bit.color);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.globalAlpha = bit.opacity;
        ctx.moveTo(bit.x, bit.y);
        ctx.lineTo(bit.x, bit.y + bit.length);
        ctx.stroke();

        // Add a tiny glowing "head" to the stream
        ctx.beginPath();
        ctx.fillStyle = bit.color;
        ctx.globalAlpha = bit.opacity * 2;
        ctx.arc(bit.x, bit.y + bit.length, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      if (!isMounted) return;
      if (entries[0].isIntersecting) {
        if (!isRunning) animate();
      } else {
        if (animationId !== null) cancelAnimationFrame(animationId);
        isRunning = false;
      }
    }, { threshold: 0 });

    observer.observe(canvas);
    window.addEventListener('resize', resize);
    resize();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resize);
      if (animationId !== null) cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}
