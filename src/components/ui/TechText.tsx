import React, { useRef, useEffect, useState } from 'react';

interface TechTextProps {
  text: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  outlineColor?: string;
  reach?: number;
  softness?: number;
  speed?: number;
  className?: string;
}

export const TechText: React.FC<TechTextProps> = ({
  text,
  fontFamily = 'Inter, system-ui, sans-serif',
  fontSize = 120,
  color = '#ffffff',
  outlineColor = 'rgba(255, 255, 255, 0.2)',
  reach = 150,
  softness = 0.5,
  speed = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let sweepX = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      
      ctx.font = `900 ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw original text as outline
      ctx.strokeStyle = outlineColor;
      ctx.lineWidth = 1;
      ctx.strokeText(text, centerX, centerY);

      // Animation for the "sweep" if not hovering
      if (!isHovering) {
        sweepX = (sweepX + speed) % (width + reach * 2);
      }

      const activeX = isHovering ? mouse.x : sweepX - reach;

      // Create a clipping region for the "revealed" filled text
      ctx.save();
      ctx.beginPath();
      
      if (isHovering) {
        // Circular reveal around mouse
        const gradient = ctx.createRadialGradient(activeX, mouse.y, 0, activeX, mouse.y, reach);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1 - softness, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.arc(activeX, mouse.y, reach, 0, Math.PI * 2);
      } else {
        // Vertical band reveal for sweep
        ctx.rect(activeX - reach, 0, reach * 2, height);
      }
      
      ctx.clip();

      // Draw filled text inside clip
      ctx.fillStyle = color;
      ctx.fillText(text, centerX, centerY);
      
      // Add a small "glitch" or "speck" effect
      if (isHovering) {
        for (let i = 0; i < 5; i++) {
          const sx = activeX + (Math.random() - 0.5) * reach * 1.5;
          const sy = mouse.y + (Math.random() - 0.5) * reach * 1.5;
          ctx.fillStyle = color;
          ctx.fillRect(sx, sy, 2, 2);
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, fontFamily, fontSize, color, outlineColor, reach, softness, speed, mouse, isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    </div>
  );
};
