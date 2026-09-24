import { motion } from 'motion/react';

export function SectionDivider() {
  return (
    <div className="relative w-full h-24 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-10"
      >
        <motion.path
          d="M0,50 Q300,0 600,50 T1200,50"
          fill="none"
          stroke="url(#gradient-divider)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,70 Q300,100 600,70 T1200,70"
          fill="none"
          stroke="url(#gradient-divider)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>
      
      {/* Centered geometric accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
        <div className="absolute inset-0 border border-brand-accent rotate-45" />
        <div className="absolute inset-0 border border-cyan-400 -rotate-45" />
      </div>
    </div>
  );
}
