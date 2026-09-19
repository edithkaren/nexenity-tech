import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export function TechStack() {
  const techs = [
    { name: 'React.js', color: 'bg-blue-500' },
    { name: 'Next.js', color: 'bg-zinc-800' },
    { name: 'TypeScript', color: 'bg-blue-600' },
    { name: 'Tailwind', color: 'bg-cyan-500' },
    { name: 'Node.js', color: 'bg-green-600' },
    { name: 'Python', color: 'bg-yellow-600' },
    { name: 'FastAPI', color: 'bg-teal-500' },
    { name: 'PostgreSQL', color: 'bg-indigo-600' },
    { name: 'Supabase', color: 'bg-emerald-600' },
    { name: 'Gemini', color: 'bg-brand-accent' },
    { name: 'OpenAI', color: 'bg-zinc-700' },
    { name: 'Claude', color: 'bg-orange-600' },
    { name: 'n8n', color: 'bg-red-500' },
    { name: 'Figma', color: 'bg-purple-500' },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-12"
        >
          Our Tech Ecosystem
        </motion.span>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl cursor-default group"
            >
              <div className={cn("w-2 h-2 rounded-full", tech.color)} />
              <span className="text-sm md:text-lg font-bold tracking-tight text-white/60 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
