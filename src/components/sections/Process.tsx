import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { PROCESS } from '../../constants';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-48 px-6 md:px-12 bg-transparent overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mb-32"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.3em] text-brand-accent uppercase block mb-6"
        >
          Operational Intelligence
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-bold tracking-tighter leading-none"
        >
          THE WORKFLOW.
        </motion.h2>
      </motion.div>

      <div className="relative max-w-7xl mx-auto pt-20">
        {/* Horizontal Progress Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 hidden md:block">
          <motion.div 
            style={{ scaleX }}
            className="absolute inset-0 bg-gradient-to-r from-brand-accent via-purple-500 to-cyan-400 origin-left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-16 md:gap-x-0 relative">
          {PROCESS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative md:px-4 group"
            >
              {/* Timeline Node & Aura */}
              <div className="absolute -top-[5px] left-0 md:left-4 w-2 h-2 hidden md:block">
                <div className="absolute inset-0 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(255,45,149,0.8)]" />
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-brand-accent rounded-full" 
                />
              </div>

              <div className="pt-0 md:pt-12 cursor-default">
                <span className="text-4xl font-black text-white/5 group-hover:text-brand-accent/20 transition-colors duration-500 block mb-2 font-mono">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-brand-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-xs md:max-w-[180px] group-hover:text-white/60 transition-colors">
                  {step.description}
                </p>
                
                {/* Decorative scanning line */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  viewport={{ once: true }}
                  className="h-[1px] bg-brand-accent mt-6 hidden md:block"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Data Decals */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none hidden lg:block">
        <span className="text-[12rem] font-black tracking-tighter leading-none whitespace-nowrap">
          SYSTEM_LOG: PROCESS_READY
        </span>
      </div>
    </section>
  );
}
