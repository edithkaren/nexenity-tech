import { motion } from 'motion/react';
import { Zap, Target, Users, Cpu, ShieldCheck, TrendingUp, FlaskConical } from 'lucide-react';
import { cn } from '../../lib/utils';

export function WhyNexenity() {
  const nodes = [
    { text: 'AI', icon: Cpu },
    { text: 'CODE', icon: Zap },
    { text: 'DESIGN', icon: Target },
    { text: 'AUTOMATION', icon: ShieldCheck },
    { text: 'CONTENT', icon: Users },
    { text: 'MARKETING', icon: TrendingUp },
    { text: 'GROWTH', icon: FlaskConical },
  ];

  return (
    <section id="why-nexenity" className="py-24 md:py-48 px-6 md:px-12 bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-none mb-8"
          >
            ONE AGENCY.<br />
            <span className="text-brand-accent">MULTIPLE CAPABILITIES.</span>
          </motion.h2>
        </div>

        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
          {/* Static connections visual */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] border border-white/5 rounded-full" />
            <div className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] border border-white/5 rounded-full" />
          </div>

          <div className="relative w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-8">
            {nodes.map((node, i) => (
              <motion.div
                key={node.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 relative">
                   <node.icon size={24} className="md:size-32" />
                   {/* Connection line placeholder */}
                   <div className="absolute top-1/2 left-full w-full h-[1px] bg-gradient-to-r from-brand-accent/50 to-transparent -translate-y-1/2 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
                  {node.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {[
            'Technology + Creativity', 'AI-first mindset', 'Founder-led execution', 'End-to-end solutions',
            'Modern development', 'Business-focused thinking', 'Continuous experimentation'
          ].map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5 flex-shrink-0" />
              <p className="text-xs md:text-sm font-medium text-white/60">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
