import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Globe3D } from '../ui/Globe3D';
import { Magnetic } from '../ui/Magnetic';
import { VisitorGreeting } from '../ui/VisitorGreeting';
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

  const titleVariants: any = {
    hidden: { 
      opacity: 0, 
      x: reducedMotion ? 0 : -15,
      skewX: reducedMotion ? 0 : -10,
      filter: 'blur(10px)'
    },
    visible: (i: number) => ({
      opacity: 1,
      x: [0, -5, 2, 0],
      skewX: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.4 + i * 0.08,
        duration: 0.4,
        ease: "easeOut",
        x: reducedMotion ? { delay: 0.4 + i * 0.08, duration: 0.5 } : {
          times: [0, 0.2, 0.5, 1],
          duration: 0.4,
          delay: 0.4 + i * 0.08
        }
      }
    })
  };

  const subtitleVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.4 + words.length * 0.08 + 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="z-10">
          <VisitorGreeting />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                custom={i}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
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
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + words.length * 0.08 + 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <button className={cn(
                "px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 group transition-all duration-300",
                theme === 'dark' ? "bg-white text-black hover:bg-brand-accent hover:text-white" : "bg-black text-white hover:bg-brand-accent hover:text-white"
              )}>
                {t('nav.cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button className="border border-border-base hover:border-text-base px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300">
                {t('hero.explore')} <ArrowDown size={18} />
              </button>
            </Magnetic>
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
             <Globe3D theme={theme} />
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
        </motion.div>
      </div>
    </section>
  );
}
