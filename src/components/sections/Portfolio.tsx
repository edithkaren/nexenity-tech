import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Clock } from 'lucide-react';
import { DataStream } from '../ui/DataStream';
import { PROJECTS } from '../../constants';
import { cn } from '../../lib/utils';
import { formatLocalizedDate, formatRelativeTime } from '../../lib/dateUtils';
import { useLanguage } from '../../contexts/LanguageContext';

export function Portfolio() {
  const { t } = useLanguage();
  const categories = ['Websites', 'AI Products', 'SaaS', 'UI/UX', 'Branding', 'Motion', 'Marketing', 'Automation'];

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-transparent overflow-hidden relative">
      <DataStream />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-none"
            >
              PROVING THE FUTURE.
            </motion.h2>
          </div>
          
          <div className="flex flex-wrap gap-2 md:max-w-md">
            {categories.map(cat => (
              <span key={cat} className="text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 px-4 border border-white/10 rounded-full text-white/40 hover:text-white hover:border-white transition-all cursor-pointer">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid - Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={cn(
                "relative group",
                i === 0 ? "md:col-span-8" : "md:col-span-4",
                i === 2 ? "md:col-span-5" : "",
                i === 3 ? "md:col-span-7" : "",
              )}
            >
              <div className="relative aspect-[16/9] md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden mb-8">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Hover overlay info */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="flex gap-2 mb-4">
                    {project.technologies.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md py-1 px-3 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-brand-accent transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-white/20 font-bold">{project.year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-widest text-brand-accent uppercase">
                    {project.category}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-brand-accent/30 transition-colors" />
                </div>
                <p className="text-white/40 mt-4 text-sm max-w-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                {project.lastUpdate && (
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-white/20">
                    <Clock size={12} className="text-brand-accent" />
                    <span>{t('common.updated')} {formatLocalizedDate(project.lastUpdate)}</span>
                    <span className="opacity-50">({formatRelativeTime(project.lastUpdate)})</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
          <button className="text-white font-bold tracking-widest uppercase text-xs flex items-center gap-4 group">
            <span className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowRight size={20} />
            </span>
            {t('common.viewAll')}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
