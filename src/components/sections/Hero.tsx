import { motion } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';
import { VisitorGreeting } from '../ui/VisitorGreeting';
import { ParallaxElement } from '../ui/ParallaxElement';
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

  const titleVariants: any = {
    hidden: { 
      opacity: 0, 
      x: reducedMotion ? 0 : -15,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: (i: number) => ({
      opacity: 1,
      x: [0, -5, 2, 0],
      scale: 1,
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
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
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
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxElement offset={120} className="absolute top-[15%] left-[5%] w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" children={null} />
        <ParallaxElement offset={80} reverse className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" children={null} />
        <ParallaxElement offset={150} className="absolute top-[40%] right-[5%] w-32 h-32 border border-white/5 rounded-full" children={null} />
        <ParallaxElement offset={100} reverse className="absolute bottom-[10%] left-[15%] w-48 h-48 border border-brand-accent/10 rounded-full" children={null} />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        <div className="z-10 w-full">
          <div className="flex justify-center mb-4">
            <VisitorGreeting />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.1em] text-brand-accent uppercase">
                {t('hero.badge')}
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
              Digital Innovation Studio
            </span>
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

          <div className="flex justify-center">
            <motion.p
              key={t('hero.subtitle')}
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + words.length * 0.08 + 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
      </div>
    </section>
  );
}
