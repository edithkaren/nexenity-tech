import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../contexts/LanguageContext';

const SECTIONS = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'portfolio', labelKey: 'nav.portfolio' },
  { id: 'contact', labelKey: 'nav.contact' },
];

interface SideNavProps {
  activeSection: string;
  theme: 'dark' | 'light';
}

export function SideNav({ activeSection, theme }: SideNavProps) {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header if necessary, but scrollIntoView is usually fine
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-[45] hidden lg:flex flex-col gap-6 items-center">
      {SECTIONS.map((section) => (
        <div key={section.id} className="relative flex items-center">
          <AnimatePresence>
            {hoveredId === section.id && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={cn(
                  "absolute right-full mr-4 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-xl",
                  theme === 'dark' ? "bg-white text-black" : "bg-black text-white"
                )}
              >
                {t(section.labelKey)}
                {/* Small arrow */}
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 rotate-45",
                  theme === 'dark' ? "bg-white" : "bg-black"
                )} />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex items-center justify-center w-4 h-4"
            aria-label={`Scroll to ${t(section.labelKey)}`}
          >
            {/* Active indicator ring */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSectionIndicator"
                className={cn(
                  "absolute -inset-1 rounded-full border border-brand-accent/50",
                  theme === 'dark' ? "bg-brand-accent/20" : "bg-brand-accent/10"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Dot */}
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:bg-brand-accent",
                activeSection === section.id
                  ? "bg-brand-accent scale-150"
                  : (theme === 'dark' ? "bg-white/20" : "bg-black/20")
              )}
            />
          </button>
        </div>
      ))}
    </nav>
  );
}
