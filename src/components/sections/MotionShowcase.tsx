import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { ParallaxElement } from '../ui/ParallaxElement';

export function MotionShowcase() {
  const clips = [
    { title: 'Brand Motion', category: 'Creative', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2570&auto=format&fit=crop' },
    { title: 'AI Visuals', category: 'Experimental', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop' },
    { title: 'UI Animation', category: 'Product', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2560&auto=format&fit=crop' },
    { title: 'Social Content', category: 'Marketing', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop' },
  ];

  return (
    <section id="motion" className="py-24 md:py-32 bg-black overflow-hidden relative">
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxElement offset={100} className="absolute top-[10%] right-[15%] w-64 h-64 bg-white/5 rounded-full blur-[80px]" children={null} />
        <ParallaxElement offset={150} reverse className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px]" children={null} />
      </div>

      <div className="px-6 md:px-12 mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6"
        >
          Visual Dynamics
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold tracking-tighter leading-none"
        >
          MOTION IS HOW<br />
          IDEAS COME ALIVE.
        </motion.h2>
      </div>

      <div className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-12 no-scrollbar">
        {clips.map((clip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[450px] relative group cursor-pointer"
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative">
              <img 
                src={clip.img} 
                alt={clip.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Play fill="black" size={24} />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center px-2">
              <div>
                <h4 className="text-xl font-bold">{clip.title}</h4>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">{clip.category}</span>
              </div>
              <ArrowRight size={20} className="text-white/20 group-hover:text-brand-accent transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
