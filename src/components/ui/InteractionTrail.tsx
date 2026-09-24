import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HistoryItem {
  id: string;
  name: string;
  timestamp: number;
}

export function InteractionTrail() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionNames: Record<string, string> = {
      'hero': t('nav.home'),
      'about': t('nav.about'),
      'services': t('nav.services'),
      'portfolio': t('nav.portfolio'),
      'motion': 'Motion',
      'techstack': 'Tech Stack',
      'process': 'Process',
      'why-nexenity': 'Why Nexenity',
      'faq': 'FAQ',
      'contact': t('nav.contact'),
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const name = sectionNames[id] || id.charAt(0).toUpperCase() + id.slice(1);
          
          setHistory(prev => {
            // Don't add if it's the same as the last one
            if (prev.length > 0 && prev[prev.length - 1].id === id) {
              return prev;
            }
            
            const newItem = { id, name, timestamp: Date.now() };
            const newHistory = [...prev, newItem].slice(-5); // Keep last 5
            return newHistory;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [t]);

  if (history.length <= 1) return null;

  return (
    <div className="fixed bottom-20 left-8 z-[1500] pointer-events-none hidden md:block">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 mb-1">
          <History size={12} className="text-brand-accent/40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Journey</span>
        </div>
        
        <div className="flex items-center gap-1">
          <AnimatePresence mode="popLayout">
            {history.map((item, index) => (
              <React.Fragment key={`${item.id}-${item.timestamp}`}>
                {index > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="text-white/10"
                  >
                    <ChevronRight size={10} />
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  layout
                  className={`
                    px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest backdrop-blur-md transition-all
                    ${index === history.length - 1 
                      ? 'bg-brand-accent/20 border-brand-accent/40 text-brand-accent' 
                      : 'bg-white/5 border-white/10 text-white/30'}
                  `}
                >
                  {item.name}
                </motion.div>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
