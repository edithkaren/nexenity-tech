import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Github, Twitter, Youtube, Sun, Moon, Zap, Volume2, VolumeX, Accessibility, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PWAInstallButton } from '../ui/PWAInstallButton';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

const NAV_LINKS = [
  { name: 'Home', href: '#', key: 'nav.home' },
  { name: 'About', href: '#about', key: 'nav.about' },
  { name: 'Services', href: '#services', key: 'nav.services' },
  { name: 'Portfolio', href: '#portfolio', key: 'nav.portfolio' },
  { name: 'Contact', href: '#contact', key: 'nav.contact' },
];

const SOCIALS = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'X', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  cyberAmbient: boolean;
  toggleCyberAmbient: () => void;
  hapticsEnabled: boolean;
  toggleHaptics: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

export function Navbar({ 
  theme, 
  toggleTheme, 
  cyberAmbient, 
  toggleCyberAmbient,
  hapticsEnabled,
  toggleHaptics,
  reducedMotion,
  toggleReducedMotion
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccessMenuOpen, setIsAccessMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-6',
          scrolled ? (theme === 'dark' ? 'bg-black/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md') : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <div className={cn("w-8 h-8 rounded-full", theme === 'dark' ? "bg-white" : "bg-black")} />
            NEXENITY
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-brand-accent transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
            
            <div className="flex items-center gap-2">
              <LanguageSwitcher theme={theme} />
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-border-base hover:bg-brand-accent/10 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsAccessMenuOpen(!isAccessMenuOpen)}
                  className={cn(
                    "p-2 rounded-full border transition-all duration-300",
                    isAccessMenuOpen ? "border-brand-accent bg-brand-accent/10 text-brand-accent" : "border-border-base text-text-muted hover:border-brand-accent/30 hover:text-brand-accent"
                  )}
                  title="Accessibility Settings"
                >
                  <Accessibility size={18} />
                </button>

                <AnimatePresence>
                  {isAccessMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={cn(
                        "absolute right-0 mt-3 w-64 rounded-2xl border p-4 shadow-xl backdrop-blur-xl z-[60]",
                        theme === 'dark' ? "bg-black/90 border-white/10" : "bg-white/90 border-black/10"
                      )}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Zap size={16} className={cn(cyberAmbient && "text-brand-accent")} />
                            <span className="text-sm font-medium">Ambient Effects</span>
                          </div>
                          <button
                            onClick={toggleCyberAmbient}
                            className={cn(
                              "w-10 h-5 rounded-full transition-colors relative",
                              cyberAmbient ? "bg-brand-accent" : "bg-white/10"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 w-3 h-3 bg-white rounded-full transition-transform",
                              cyberAmbient ? "left-6" : "left-1"
                            )} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Volume2 size={16} className={cn(hapticsEnabled && "text-brand-accent")} />
                            <span className="text-sm font-medium">Haptic Feedback</span>
                          </div>
                          <button
                            onClick={toggleHaptics}
                            className={cn(
                              "w-10 h-5 rounded-full transition-colors relative",
                              hapticsEnabled ? "bg-brand-accent" : "bg-white/10"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 w-3 h-3 bg-white rounded-full transition-transform",
                              hapticsEnabled ? "left-6" : "left-1"
                            )} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ShieldCheck size={16} className={cn(reducedMotion && "text-brand-accent")} />
                            <span className="text-sm font-medium">Reduced Motion</span>
                          </div>
                          <button
                            onClick={toggleReducedMotion}
                            className={cn(
                              "w-10 h-5 rounded-full transition-colors relative",
                              reducedMotion ? "bg-brand-accent" : "bg-white/10"
                            )}
                          >
                            <div className={cn(
                              "absolute top-1 w-3 h-3 bg-white rounded-full transition-transform",
                              reducedMotion ? "left-6" : "left-1"
                            )} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <PWAInstallButton theme={theme} />

            <button className={cn(
              "px-6 py-2 rounded-full text-sm font-bold transition-all",
              theme === 'dark' ? "bg-white text-black hover:bg-brand-accent hover:text-white" : "bg-black text-white hover:bg-brand-accent hover:text-white"
            )}>
              {t('nav.cta')}
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher theme={theme} />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border-base"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleCyberAmbient}
              className={cn(
                "p-2 rounded-full border transition-all",
                cyberAmbient ? "border-brand-accent text-brand-accent" : "border-border-base text-text-muted"
              )}
            >
              <Zap size={18} />
            </button>
            <button
              onClick={toggleHaptics}
              className={cn(
                "p-2 rounded-full border transition-all",
                hapticsEnabled ? "border-brand-accent text-brand-accent" : "border-border-base text-text-muted"
              )}
            >
              {hapticsEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="text-text-base p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("fixed inset-0 z-[100] flex flex-col", theme === 'dark' ? "bg-black" : "bg-white")}
          >
            <div className="p-6 md:p-12 flex justify-between items-center">
              <span className="text-xl font-bold tracking-tighter">NEXENITY</span>
              <button onClick={() => setIsOpen(false)} className="text-text-base p-2">
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-12">
              <div className="space-y-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl md:text-8xl font-bold tracking-tighter hover:text-brand-accent transition-colors"
                    >
                      {t(link.key)}
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex flex-col md:flex-row md:items-center gap-8"
              >
                <button className={cn(
                  "w-full md:w-auto px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 group",
                  theme === 'dark' ? "bg-white text-black" : "bg-black text-white"
                )}>
                  {t('nav.cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-6">
                  {SOCIALS.map((social) => (
                    <a key={social.name} href={social.href} className="text-text-muted hover:text-text-base transition-colors">
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap size={20} className={cn(cyberAmbient && "text-brand-accent")} />
                      <span className="text-lg font-medium">Ambient Effects</span>
                    </div>
                    <button
                      onClick={toggleCyberAmbient}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        cyberAmbient ? "bg-brand-accent" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                        cyberAmbient ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 size={20} className={cn(hapticsEnabled && "text-brand-accent")} />
                      <span className="text-lg font-medium">Haptic Feedback</span>
                    </div>
                    <button
                      onClick={toggleHaptics}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        hapticsEnabled ? "bg-brand-accent" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                        hapticsEnabled ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={20} className={cn(reducedMotion && "text-brand-accent")} />
                      <span className="text-lg font-medium">Reduced Motion</span>
                    </div>
                    <button
                      onClick={toggleReducedMotion}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        reducedMotion ? "bg-brand-accent" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                        reducedMotion ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
