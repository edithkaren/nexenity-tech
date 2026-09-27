import { motion } from 'motion/react';
import { ParallaxElement } from '../ui/ParallaxElement';

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
    <div className="py-12 bg-transparent border-y border-border-base overflow-hidden relative">
      {/* Very subtle background parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxElement offset={30} className="absolute top-1/2 left-[20%] w-32 h-32 bg-brand-accent/2 rounded-full blur-2xl" children={null} />
      </div>

      <div className="flex whitespace-nowrap relative z-10">
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
