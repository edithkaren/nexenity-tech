import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

export function CursorTrail({ theme = 'dark', reducedMotion = false }: { theme?: 'dark' | 'light', reducedMotion?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const isHovering = useRef(false);
  const hoverScale = useRef(0);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const lastEmit = useRef(0);
  const lastMoveTime = useRef(Date.now());
  const hasBlasted = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawnParticle = (x: number, y: number, isBlast = false) => {
      const count = isBlast ? 20 : 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = isBlast ? (Math.random() * 5 + 3) : (Math.random() * 3 + 1);
        particles.current.push({
          x: x + (Math.random() - 0.5) * (isBlast ? 25 : 12),
          y: y + (Math.random() - 0.5) * (isBlast ? 25 : 12),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: isBlast ? (1.0 + Math.random() * 0.5) : (0.7 + Math.random() * 0.4),
          size: isBlast ? (Math.random() * 5 + 3) : (Math.random() * 3.5 + 2),
          color: Math.random() > 0.4 ? '#ff2d95' : '#00f3ff'
        });
      }
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      let x, y;
      if ('touches' in e) {
        if (e.touches && e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else if ('changedTouches' in e && e.changedTouches && e.changedTouches.length > 0) {
          x = e.changedTouches[0].clientX;
          y = e.changedTouches[0].clientY;
        } else {
          return;
        }
      } else {
        x = e.clientX;
        y = e.clientY;
      }
      
      mouse.current = { x, y, active: true };
      lastMoveTime.current = Date.now();
      hasBlasted.current = false;
      
      // Add point to trail
      points.current.push({ x, y });
      
      // Dynamic trail length based on hover
      const maxPoints = isHovering.current ? 12 : 45; // Increased trail length
      if (points.current.length > maxPoints) points.current.shift();

      const now = Date.now();
      if (now - lastEmit.current > 20) {
        spawnParticle(x, y);
        lastEmit.current = now;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest('button, a, input, textarea, [role="button"]');
      isHovering.current = !!interactive;
    };

    let rafId: number | null = null;
    let isMounted = true;
    const animate = () => {
      if (!isMounted || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly transition hover scale
      const targetScale = isHovering.current ? 1 : 0;
      hoverScale.current += (targetScale - hoverScale.current) * 0.15;

      // Draw the neon trail path
      if (points.current.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'lighter'; // Additive blending for "glow"

        // Pass 1: Wide Soft Bloom
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);
        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }
        ctx.shadowBlur = 35 * (1 - hoverScale.current * 0.5);
        ctx.shadowColor = '#00f3ff';
        ctx.strokeStyle = `rgba(0, 243, 255, ${0.15 * (1 - hoverScale.current * 0.8)})`;
        ctx.lineWidth = 15 * (1 - hoverScale.current * 0.5);
        ctx.stroke();

        // Pass 2: Secondary Neon Color Bloom
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);
        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }
        ctx.shadowBlur = 20 * (1 - hoverScale.current * 0.5);
        ctx.shadowColor = '#ff2d95';
        ctx.strokeStyle = `rgba(255, 45, 149, ${0.2 * (1 - hoverScale.current * 0.8)})`;
        ctx.lineWidth = 8 * (1 - hoverScale.current * 0.5);
        ctx.stroke();

        // Pass 3: Intense White Core
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);
        for (let i = 1; i < points.current.length; i++) {
          ctx.lineTo(points.current[i].x, points.current[i].y);
        }
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ffffff';
        const grad = ctx.createLinearGradient(
          points.current[0].x, points.current[0].y,
          points.current[points.current.length - 1].x, points.current[points.current.length - 1].y
        );
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.3, `rgba(255, 45, 149, ${0.6 * (1 - hoverScale.current)})`);
        grad.addColorStop(0.7, `rgba(157, 0, 255, ${0.8 * (1 - hoverScale.current)})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${1 - hoverScale.current * 0.5})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 * (1 - hoverScale.current * 0.5);
        ctx.stroke();

        ctx.globalCompositeOperation = 'source-over'; // Reset blending
      }

      // Draw Particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = p.life * (1 - hoverScale.current * 0.5);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Leading Core & Morphing Halo
      if (mouse.current.active) {
        const now = Date.now();
        const pulse = Math.sin(now / 200) * 5;
        const radius = 4 + (hoverScale.current * 30) + (hoverScale.current * pulse);
        
        // Main Glow Halo (Interactive)
        if (hoverScale.current > 0.01) {
          ctx.beginPath();
          ctx.arc(mouse.current.x, mouse.current.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 243, 255, 0.1)';
          ctx.strokeStyle = '#00f3ff';
          ctx.lineWidth = 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = '#00f3ff';
          ctx.fill();
          ctx.stroke();
        }

        // Inner Core
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 4 * (1 - hoverScale.current * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = '#00f3ff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f3ff';
        ctx.fill();
        
        // Orbital Ring
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 8 + (hoverScale.current * 10), 0, Math.PI * 2);
        ctx.strokeStyle = '#ff2d95';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1 - hoverScale.current * 0.5;
        ctx.stroke();
      }

      // Natural decay of trail points
      if (points.current.length > 0) {
        points.current.shift();
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('touchstart', onMouseMove);
    window.addEventListener('touchmove', onMouseMove);
    
    // Hide default cursor
    const style = document.createElement('style');
    style.id = 'hide-cursor-style';
    style.innerHTML = `
      * { cursor: none !important; }
      a, button, [role="button"] { cursor: none !important; }
    `;
    document.head.appendChild(style);
    
    resize();
    animate();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('touchstart', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      
      const existingStyle = document.getElementById('hide-cursor-style');
      if (existingStyle) existingStyle.remove();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply', cursor: 'none' }}
    />
  );
}
