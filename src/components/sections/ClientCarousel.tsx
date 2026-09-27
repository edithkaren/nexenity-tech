import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ParallaxElement } from '../ui/ParallaxElement';
import { 
  Cpu, 
  Globe, 
  Zap, 
  Shield, 
  Layers, 
  Activity, 
  Box, 
  Cloud 
} from 'lucide-react';

const PARTNERS = [
  { name: 'Quantum Dynamics', icon: Cpu, color: 'text-cyan-500' },
  { name: 'Aether Systems', icon: Globe, color: 'text-purple-500' },
  { name: 'Vertex AI', icon: Zap, color: 'text-brand-accent' },
  { name: 'Sentinel Labs', icon: Shield, color: 'text-blue-500' },
  { name: 'Flux Core', icon: Layers, color: 'text-emerald-500' },
  { name: 'Nexus Health', icon: Activity, color: 'text-rose-500' },
  { name: 'Ether Grid', icon: Box, color: 'text-indigo-500' },
  { name: 'Cloud Forge', icon: Cloud, color: 'text-amber-500' },
];

export function ClientCarousel({ theme }: { theme: 'dark' | 'light' }) {
  // Triple the partners for seamless infinite scroll
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-20 relative overflow-hidden bg-background-base/50 border-y border-border-base/50">
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxElement offset={50} className="absolute top-[10%] left-[5%] w-32 h-32 border border-white/5 rounded-full" children={null} />
        <ParallaxElement offset={50} reverse className="absolute bottom-[10%] right-[5%] w-48 h-48 border border-white/5 rounded-full" children={null} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-brand-accent text-sm font-medium tracking-widest uppercase mb-3 block">
            Global Partnerships
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-base">
            Trusted by Industry Leaders
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background-base to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background-base to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-12 py-4"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className={cn(
                "flex items-center gap-4 px-8 py-4 rounded-xl border border-border-base/50",
                "bg-background-elevated/30 backdrop-blur-md",
                "hover:border-brand-accent/50 hover:bg-background-elevated/50 transition-all duration-300 group"
              )}
            >
              <partner.icon 
                size={24} 
                className={cn(
                  "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12",
                  partner.color
                )} 
              />
              <span className="text-xl font-display font-semibold text-text-base tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[100px] bg-brand-accent/5 blur-[100px] pointer-events-none" />
    </section>
  );
}
