import { useEffect, useRef } from 'react';

interface SparklingBackgroundProps {
  density?: number;
  speed?: number;
  size?: number;
  color?: string;
}

export function SparklingBackground({ 
  density = 50, 
  speed = 0.5, 
  size = 2,
  color = '255, 255, 255'
}: SparklingBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeSpeed: number;
      growing: boolean;
      rotation: number;
      rotationSpeed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * size;
        this.opacity = Math.random();
        this.fadeSpeed = (Math.random() * 0.01 + 0.005) * speed;
        this.growing = Math.random() > 0.5;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.rotation += this.rotationSpeed;
        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 1) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) {
            this.opacity = 0;
            this.growing = true;
            // Reposition to a new random spot when it burns out
            this.x = Math.random() * canvas!.width;
            this.y = Math.random() * canvas!.height;
          }
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        
        // Occasionally draw a 4-pointed star for a "sparkle" effect
        if (this.size > size * 0.7) {
          for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 2);
            ctx.lineTo(this.size * 2, 0);
            ctx.lineTo(0, this.size * 0.2);
          }
        } else {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        }
        
        ctx.fillStyle = `rgba(${color}, ${this.opacity * 0.4})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      
      particles = [];
      const count = Math.floor((w * h) / 10000) * (density / 10);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [density, speed, size, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
