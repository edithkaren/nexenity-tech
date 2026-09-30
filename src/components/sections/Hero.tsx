import { motion } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
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

  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Basic check for low power or slow connection if needed
    if (reducedMotion || (typeof navigator !== 'undefined' && (navigator as any).connection && (navigator as any).connection.saveData)) {
      setIsLowPower(true);
    }
  }, [reducedMotion]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center px-4 md:px-12 pt-20 overflow-hidden"
    >
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxElement offset={120} className="absolute top-[15%] left-[5%] w-48 h-48 md:w-64 md:h-64 bg-brand-accent/5 rounded-full blur-3xl" children={null} />
        <ParallaxElement offset={80} reverse className="absolute bottom-[20%] right-[10%] w-64 h-64 md:w-96 md:h-96 bg-cyan-500/5 rounded-full blur-3xl" children={null} />
        <ParallaxElement offset={150} className="absolute top-[40%] right-[5%] w-24 h-24 md:w-32 md:h-32 border border-white/5 rounded-full" children={null} />
        <ParallaxElement offset={100} reverse className="absolute bottom-[10%] left-[15%] w-32 h-32 md:w-48 md:h-48 border border-brand-accent/10 rounded-full" children={null} />
      </div>

      {/* Background Video with Optimization */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20 md:opacity-30">
        {!isLowPower && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale contrast-125 scale-110"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_170109_f96e01a5-b0db-4274-b24d-8d97e99ec928.mp4" type="video/mp4" />
          </video>
        )}
        <div className={cn(
          "absolute inset-0",
          theme === 'dark' 
            ? "bg-gradient-to-b from-black via-black/20 to-black" 
            : "bg-gradient-to-b from-white via-white/20 to-white"
        )} />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        <div className="z-10 w-full px-2">
          <div className="flex justify-center mb-4">
            <VisitorGreeting />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8"
          >
            <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] text-brand-accent uppercase">
                {t('hero.badge')}
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
              Digital Innovation Studio
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 break-words">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                custom={i}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.15em] md:mr-[0.2em]"
              >
                {word === "DIGITAL" || word === "EXPERIENCES" || word === "DIGITALES" || word === "NUMÉRIQUES" || word === "デジタル体験" ? (
                  <span className="liquid-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <div className="flex justify-center px-4">
            <motion.p
              key={t('hero.subtitle')}
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="text-base md:text-xl text-text-muted max-w-2xl leading-relaxed mb-8 md:mb-10"
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
