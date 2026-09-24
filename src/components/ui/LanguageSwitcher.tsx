import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Check } from 'lucide-react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import { useToast } from './Toast';
import { Magnetic } from './Magnetic';
import { cn } from '../../lib/utils';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

interface LanguageSwitcherProps {
  theme: 'dark' | 'light';
}

export function LanguageSwitcher({ theme }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative">
      <Magnetic strength={0.3}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 p-2 rounded-full border transition-all duration-300",
            theme === 'dark' 
              ? "border-white/10 hover:border-white/30 text-white/70" 
              : "border-black/10 hover:border-black/30 text-black/70",
            isOpen && (theme === 'dark' ? "bg-white/10" : "bg-black/5")
          )}
          title="Switch Language"
        >
          <Languages size={18} />
          <span className="text-xs font-bold uppercase tracking-widest hidden lg:inline">{currentLang.code}</span>
        </button>
      </Magnetic>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={cn(
                "absolute right-0 mt-2 w-48 rounded-2xl border z-20 overflow-hidden shadow-xl backdrop-blur-xl",
                theme === 'dark' ? "bg-black/90 border-white/10" : "bg-white/90 border-black/10"
              )}
            >
              <div className="p-2 space-y-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                      showToast(`Language set to ${lang.label}`, 'success');
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm transition-all",
                      language === lang.code
                        ? (theme === 'dark' ? "bg-white text-black" : "bg-black text-white")
                        : (theme === 'dark' ? "text-white/60 hover:bg-white/10" : "text-black/60 hover:bg-black/5")
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </div>
                    {language === lang.code && <Check size={14} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
