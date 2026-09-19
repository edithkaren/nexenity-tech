import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { LiquidSphere } from '../ui/LiquidSphere';
import { GeometricBackground } from '../ui/GeometricBackground';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroProps {
  theme: 'dark' | 'light';
  reducedMotion?: boolean;
}

export function Hero({ theme, reducedMotion = false }: HeroProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const title = t('hero.title');
  const words = title.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const sphereY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden"
    >
      <GeometricBackground reducedMotion={reducedMotion} />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-brand-accent uppercase">
              Nexenity Technologies • Digital Innovation Studio
            </span>
            <div className="h-[1px] w-12 bg-brand-accent/50" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="inline-block mr-[0.2em]"
              >
                {word === "DIGITAL" || word === "EXPERIENCES" || word === "DIGITALES" || word === "NUMÉRIQUES" || word === "デジタル体験" ? (
                  <span className="liquid-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            key={t('hero.subtitle')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className={cn(
              "px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 group transition-all duration-300",
              theme === 'dark' ? "bg-white text-black hover:bg-brand-accent hover:text-white" : "bg-black text-white hover:bg-brand-accent hover:text-white"
            )}>
              {t('nav.cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-border-base hover:border-text-base px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300">
              {t('hero.explore')} <ArrowDown size={18} />
            </button>
          </motion.div>
        </div>

        <motion.div
          style={{ y: sphereY, scale: sphereScale, opacity: sphereOpacity }}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative aspect-square lg:aspect-auto h-[400px] lg:h-[600px] flex items-center justify-center"
        >
          <div className="absolute inset-0 flex items-center justify-center">
             <LiquidSphere theme={theme} />
          </div>
          
          {/* Animated labels around sphere */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { text: "AI", pos: "top-1/4 left-10" },
              { text: "CODE", pos: "top-1/3 right-10" },
              { text: "DESIGN", pos: "bottom-1/3 left-10" },
              { text: "FUTURE", pos: "bottom-1/4 right-10" },
              { text: "AUTOMATION", pos: "bottom-10 left-1/2 -translate-x-1/2" }
            ].map((label, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3 + i, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className={cn(
                  "absolute text-[10px] font-bold tracking-widest text-text-muted uppercase",
                  label.pos
                )}
              >
                {label.text}
              </motion.div>
            ))}
          </div>

          {/* Floating fragments decor */}
          <div className="absolute inset-0 -z-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-border-base rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
