import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock, Milestone } from 'lucide-react';
import { ROADMAP } from '../../constants';
import { cn } from '../../lib/utils';

export function Roadmap() {
  return (
    <div className="mt-40 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6"
          >
            Evolution & Strategy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            OUR ROADMAP.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/10 md:hidden" />

          <div className="space-y-12 md:space-y-24">
            {ROADMAP.map((step, i) => (
              <motion.div
                key={step.date}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-start md:items-center gap-8",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Connector Point */}
                <div className={cn(
                  "absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 z-10 transition-colors duration-500",
                  step.status === 'completed' ? "bg-brand-accent shadow-[0_0_10px_rgba(0,243,255,0.5)]" : 
                  step.status === 'in-progress' ? "bg-white animate-pulse" : "bg-white/20"
                )} />

                {/* Date Label */}
                <div className={cn(
                  "md:w-1/2 flex",
                  i % 2 === 0 ? "md:justify-start pl-12 md:pl-0 md:pr-12" : "md:justify-end pl-12 md:pl-12"
                )}>
                  <div className={cn(
                    "flex flex-col",
                    i % 2 === 0 ? "md:items-start" : "md:items-end text-left md:text-right"
                  )}>
                    <span className="text-3xl md:text-5xl font-black text-white/5 tracking-tighter mb-2">
                      {step.date}
                    </span>
                    <div className={cn(
                      "flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest",
                      step.status === 'completed' ? "border-brand-accent/30 text-brand-accent bg-brand-accent/5" :
                      step.status === 'in-progress' ? "border-white/30 text-white bg-white/5" :
                      "border-white/10 text-white/30"
                    )}>
                      {step.status === 'completed' && <CheckCircle2 size={10} />}
                      {step.status === 'in-progress' && <Clock size={10} />}
                      {step.status === 'upcoming' && <Circle size={10} />}
                      {step.status.replace('-', ' ')}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2 pl-12 md:pl-0">
                  <div className={cn(
                    "p-8 rounded-3xl border transition-all duration-500 bg-white/[0.02]",
                    step.status === 'completed' ? "border-white/10" : 
                    step.status === 'in-progress' ? "border-brand-accent/30 bg-brand-accent/[0.03]" : 
                    "border-white/5"
                  )}>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3">
                      {step.milestones.map((milestone, mi) => (
                        <div key={mi} className="flex items-center gap-3 text-xs font-medium text-white/60">
                          <Milestone size={12} className={cn(
                            step.status === 'completed' ? "text-brand-accent" : "text-white/20"
                          )} />
                          <span>{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
