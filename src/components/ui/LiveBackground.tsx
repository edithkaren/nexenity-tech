import React, { useEffect, useRef } from 'react';

interface CityHub {
  x: number;
  y: number;
  name: string;
  pulse: number;
}

interface DataPacket {
  start: CityHub;
  end: CityHub;
  progress: number;
  speed: number;
  color: string;
}

export const LiveBackground: React.FC<{ theme?: 'dark' | 'light', reducedMotion?: boolean }> = ({ theme = 'dark', reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isMounted = true;
    let hubs: CityHub[] = [];
    let packets: DataPacket[] = [];
    
    const colors = theme === 'dark' 
      ? ['#00f3ff', '#ff2d95', '#9d00ff'] 
      : ['#3b82f6', '#ec4899', '#8b5cf6'];

    const resize = () => {
      if (!isMounted) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMap();
      if (reducedMotion) {
        drawStatic();
      }
    };

    const initMap = () => {
      // Approximate world city coordinates (scaled 0-1)
      const cities = [
        { name: 'San Francisco', x: 0.12, y: 0.35 },
        { name: 'New York', x: 0.25, y: 0.32 },
        { name: 'London', x: 0.48, y: 0.25 },
        { name: 'Paris', x: 0.51, y: 0.28 },
        { name: 'Tokyo', x: 0.88, y: 0.35 },
        { name: 'Sydney', x: 0.90, y: 0.80 },
        { name: 'Dubai', x: 0.62, y: 0.45 },
        { name: 'Singapore', x: 0.82, y: 0.60 },
        { name: 'Berlin', x: 0.53, y: 0.25 },
        { name: 'Sao Paulo', x: 0.32, y: 0.75 }
      ];

      hubs = cities.map(c => ({
        ...c,
        x: c.x * canvas.width,
        y: c.y * canvas.height,
        pulse: Math.random() * Math.PI * 2
      }));

      packets = [];
      if (!reducedMotion) {
        for (let i = 0; i < 15; i++) {
          spawnPacket();
        }
      }
    };

    const spawnPacket = () => {
      if (reducedMotion || hubs.length < 2) return;
      const start = hubs[Math.floor(Math.random() * hubs.length)];
      let end = hubs[Math.floor(Math.random() * hubs.length)];
      while (end === start) {
        end = hubs[Math.floor(Math.random() * hubs.length)];
      }

      packets.push({
        start,
        end,
        progress: 0,
        speed: Math.random() * 0.005 + 0.002,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const drawWorldMap = () => {
      // Simple dotted world map representation
      ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      const dotSize = 2;
      const spacing = 15;
      
      // We'll use a simple "noisy" map pattern to simulate continents
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // This is a very simplified continent logic
          const isLand = (
            (x > canvas.width * 0.1 && x < canvas.width * 0.3 && y > canvas.height * 0.2 && y < canvas.height * 0.8) || // Americas
            (x > canvas.width * 0.45 && x < canvas.width * 0.65 && y > canvas.height * 0.15 && y < canvas.height * 0.5) || // EMEA
            (x > canvas.width * 0.7 && x < canvas.width * 0.95 && y > canvas.height * 0.2 && y < canvas.height * 0.9) // APAC
          );
          
          if (isLand) {
            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const drawStatic = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = theme === 'dark' ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawWorldMap();
      
      hubs.forEach(hub => {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? '#00f3ff' : '#3b82f6';
        ctx.fill();
      });
    };

    const draw = () => {
      if (!isMounted || !ctx || !canvas || reducedMotion) return;
      ctx.fillStyle = theme === 'dark' ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawWorldMap();

      // Update and draw hubs
      hubs.forEach(hub => {
        hub.pulse += 0.03;
        const pulseSize = Math.max(0.1, Math.sin(hub.pulse) * 10 + 5);
        
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = theme === 'dark' ? 'rgba(0, 243, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(hub.x, hub.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? '#00f3ff' : '#3b82f6';
        ctx.fill();
      });

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(i, 1);
          spawnPacket();
          continue;
        }

        const x = p.start.x + (p.end.x - p.start.x) * p.progress;
        const y = p.start.y + (p.end.y - p.start.y) * p.progress;
        
        // Add a slight arc to the path
        const arcHeight = -50 * Math.sin(p.progress * Math.PI);
        const arcY = y + arcHeight;

        ctx.beginPath();
        ctx.arc(x, arcY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw faint path line
        ctx.beginPath();
        ctx.moveTo(p.start.x, p.start.y);
        ctx.quadraticCurveTo(
          (p.start.x + p.end.x) / 2,
          (p.start.y + p.end.y) / 2 - 100,
          p.end.x, p.end.y
        );
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = 0.05;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    if (!reducedMotion) {
      draw();
    }

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resize);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [theme, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
    />
  );
};
