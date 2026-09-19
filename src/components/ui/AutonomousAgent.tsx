import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export function AutonomousAgent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const agentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let isMounted = true;
    let requestID: number | null = null;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!isMounted) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Start in middle
      agentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      targetPos.current = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };
    };

    const animate = () => {
      if (!isMounted || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Autonomous Logic: Smoothly wander using noise-like motion
      angle.current += 0.02;
      
      // Calculate distance to target
      const dx = targetPos.current.x - agentPos.current.x;
      const dy = targetPos.current.y - agentPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Update target if reached
      if (distance < 50) {
        targetPos.current = { 
          x: Math.random() * (window.innerWidth - 100) + 50, 
          y: Math.random() * (window.innerHeight - 100) + 50 
        };
      }

      // Add a bit of sine wave "flutter" to the motion
      const flutterX = Math.sin(angle.current * 2) * 2;
      const flutterY = Math.cos(angle.current * 3) * 2;

      // Accelerate towards target
      velocity.current.x += (dx / 500) + flutterX * 0.1;
      velocity.current.y += (dy / 500) + flutterY * 0.1;
      
      // Apply friction
      velocity.current.x *= 0.98;
      velocity.current.y *= 0.98;

      // Update position
      agentPos.current.x += velocity.current.x;
      agentPos.current.y += velocity.current.y;

      // Record trail points
      points.current.push({ x: agentPos.current.x, y: agentPos.current.y });
      if (points.current.length > 30) points.current.shift();

      // Draw Trail
      if (points.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);
        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }
        
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#9d00ff';
        ctx.strokeStyle = `rgba(157, 0, 255, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Agent Core
      ctx.beginPath();
      ctx.arc(agentPos.current.x, agentPos.current.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ff2d95';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ff2d95';
      ctx.fill();

      // Outer Scanner Ring
      ctx.beginPath();
      ctx.arc(agentPos.current.x, agentPos.current.y, 8 + Math.sin(angle.current * 5) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      requestID = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resize);
      if (requestID !== null) cancelAnimationFrame(requestID);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[50] pointer-events-none opacity-40"
    />
  );
}
