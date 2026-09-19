import { motion } from 'motion/react';

export function Marquee() {
  const items = [
    'AI SOLUTIONS',
    'FULL-STACK DEVELOPMENT',
    'AUTOMATION',
    'UI/UX',
    'MOTION',
    'BRANDING',
    'DIGITAL MARKETING',
    'SAAS'
  ];

  return (
    <div className="py-12 bg-transparent border-y border-border-base overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-12 px-6"
        >
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-2xl md:text-4xl font-bold tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-default">
                {item}
              </span>
              <div className="w-2 h-2 bg-brand-accent rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
