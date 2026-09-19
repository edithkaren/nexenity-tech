import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { DataStream } from '../ui/DataStream';
import { SERVICES } from '../../constants';
import { Service } from '../../types';
import { cn } from '../../lib/utils';

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <DataStream />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6"
            >
              Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-none"
            >
              OUR CAPABILITIES.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-sm"
          >
            We combine high-level strategy with technical excellence to deliver products that redefine industries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedService(service)}
              className="group relative bg-black p-10 hover:bg-white/[0.02] transition-colors cursor-pointer flex flex-col h-full"
            >
              {/* Card Background Visual */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-accent rounded-full blur-[100px]" />
              </div>

              <div className="flex justify-between items-start mb-12">
                <span className="text-xs font-bold tracking-widest text-white/20 group-hover:text-brand-accent transition-colors">
                  {service.number}
                </span>
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-all">
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1">
                {service.description}
              </p>

              <div className="pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                Learn More <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedService(null)} />
            
            <motion.div
              layoutId={`service-${selectedService.id}`}
              className="relative w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/5 p-8 md:p-12 bg-black/50 border-r border-white/10 overflow-y-auto">
                <span className="text-brand-accent font-bold text-sm tracking-widest uppercase mb-4 block">
                  Service {selectedService.number}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter leading-none">
                  {selectedService.title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-10">
                  {selectedService.description}
                </p>
                
                <div className="space-y-4 mb-10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.details.technologies.map(tech => (
                      <span key={tech} className="py-1.5 px-4 bg-white/5 border border-white/10 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="bg-white text-black w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 group">
                  Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-zinc-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-6">Our Process</h4>
                    <div className="space-y-6">
                      {selectedService.details.process.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-white/20 font-bold italic">0{i+1}</span>
                          <p className="text-white/80 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-6">Deliverables</h4>
                    <div className="space-y-4">
                      {selectedService.details.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-brand-accent" />
                          <span className="text-white/60 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-6">Use Cases</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.details.useCases.map((useCase, i) => (
                      <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <p className="text-white/80 font-medium">{useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
