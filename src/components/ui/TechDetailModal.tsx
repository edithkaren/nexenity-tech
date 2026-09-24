import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';

interface Project {
  title: string;
  description: string;
}

interface TechDetail {
  name: string;
  color: string;
  description: string;
  expertise: string[];
  projects: Project[];
}

interface TechDetailModalProps {
  tech: TechDetail | null;
  onClose: () => void;
}

export function TechDetailModal({ tech, onClose }: TechDetailModalProps) {
  if (!tech) return null;

  return (
    <AnimatePresence>
      {tech && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${tech.color} shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
                <h3 className="text-3xl font-black tracking-tighter text-white">{tech.name}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                {/* Description */}
                <section>
                  <p className="text-white/60 leading-relaxed italic">
                    "{tech.description}"
                  </p>
                </section>

                {/* Expertise */}
                <section>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent mb-4">
                    <Cpu size={14} />
                    Core Expertise
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tech.expertise.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <CheckCircle2 size={14} className="text-brand-accent shrink-0" />
                        <span className="text-sm text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent mb-4">
                    <ExternalLink size={14} />
                    Featured Projects
                  </h4>
                  <div className="space-y-3">
                    {tech.projects.map((project, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                        <h5 className="font-bold text-white mb-1">{project.title}</h5>
                        <p className="text-xs text-white/40">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-black/40 border-t border-white/5 text-center">
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
                Integrated at scale across our production ecosystem
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
