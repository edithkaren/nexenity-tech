/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, MotionConfig } from 'motion/react';

import { useLanguage } from './contexts/LanguageContext';
import { useToast } from './components/ui/Toast';

// Components
import { SmoothScroll } from './components/ui/SmoothScroll';
import { HapticInterface } from './components/ui/HapticInterface';
import { useActiveSection } from './hooks/useActiveSection';

import { ReadingProgressBar } from './components/ui/ReadingProgressBar';
import { SectionSEO } from './components/ui/SectionSEO';
import { AIChatbot } from './components/ui/AIChatbot';
import { OfflineIndicator } from './components/ui/OfflineIndicator';
import { SectionDivider } from './components/ui/SectionDivider';
import { ThemeReveal } from './components/ui/ThemeReveal';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { SparklingBackground } from './components/ui/SparklingBackground';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/sections/Marquee';
import { ClientCarousel } from './components/sections/ClientCarousel';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { MotionShowcase } from './components/sections/MotionShowcase';
import { TechStack } from './components/sections/TechStack';
import { Process } from './components/sections/Process';
import { ImpactSection } from './components/sections/ImpactSection';
import { WhyNexenity } from './components/sections/WhyNexenity';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import SplashCursor from './components/ui/SplashCursor';
import { Footer } from './components/layout/Footer';
import { Reveal } from './components/ui/Reveal';

// Loading Placeholder
const SectionLoader = () => (
  <div className="w-full h-[400px] flex items-center justify-center opacity-20">
    <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

import { SideNav } from './components/layout/SideNav';
import { SectionAudio } from './components/ui/SectionAudio';

export default function App() {
  const activeSection = useActiveSection();
  const { showToast } = useToast();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme') as 'dark' | 'light';
      if (urlTheme === 'dark' || urlTheme === 'light') return urlTheme;
      return (localStorage.getItem('nexenity-theme') as 'dark' | 'light') || 'dark';
    } catch (e) { return 'dark'; }
  });

  const [hapticsEnabled, setHapticsEnabled] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('haptics')) return params.get('haptics') === 'true';
      const saved = localStorage.getItem('nexenity-haptics');
      return saved === null ? true : saved === 'true';
    } catch (e) { return true; }
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('motion')) return params.get('motion') === 'reduced';
      return localStorage.getItem('nexenity-reduced-motion') === 'true';
    } catch (e) { return false; }
  });

  const [reveal, setReveal] = useState<{ active: boolean; x: number; y: number; theme: 'dark' | 'light' }>({
    active: false,
    x: 0,
    y: 0,
    theme: theme
  });

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global Error Caught:', event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Sync with localStorage and URL
  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('nexenity-theme', theme);
      
      // Update browser theme-color meta tag
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
      }

      localStorage.setItem('nexenity-haptics', String(hapticsEnabled));
      localStorage.setItem('nexenity-reduced-motion', String(reducedMotion));

      const url = new URL(window.location.href);
      url.searchParams.set('theme', theme);
      url.searchParams.set('haptics', String(hapticsEnabled));
      url.searchParams.set('motion', reducedMotion ? 'reduced' : 'normal');
      
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, [theme, hapticsEnabled, reducedMotion]);

  const toggleTheme = (e?: React.MouseEvent | { x: number; y: number }) => {
    const targetTheme = theme === 'dark' ? 'light' : 'dark';
    const x = e && 'clientX' in e ? e.clientX : (e && 'x' in e ? e.x : window.innerWidth / 2);
    const y = e && 'clientY' in e ? e.clientY : (e && 'y' in e ? e.y : window.innerHeight / 2);

    if (reducedMotion) {
      setTheme(targetTheme);
      showToast(`${targetTheme.charAt(0).toUpperCase() + targetTheme.slice(1)} theme applied`, 'info');
      return;
    }

    setReveal({ active: true, x, y, theme: targetTheme });
    
    // Switch the actual theme after a small delay so the reveal starts first
    setTimeout(() => {
      setTheme(targetTheme);
      showToast(`${targetTheme.charAt(0).toUpperCase() + targetTheme.slice(1)} theme applied`, 'info');
      // Turn off reveal after animation finishes (duration + exit delay)
      setTimeout(() => {
        setReveal(prev => ({ ...prev, active: false }));
      }, 1200);
    }, 50);
  };

  const toggleHaptics = () => {
    setHapticsEnabled(prev => {
      const next = !prev;
      showToast(`Haptic feedback ${next ? 'enabled' : 'disabled'}`, 'info');
      return next;
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => {
      const next = !prev;
      showToast(`Reduced motion ${next ? 'enabled' : 'disabled'}`, 'info');
      return next;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Nexenity Technologies",
    "description": "Nexenity Technologies is a technology and creative agency building AI-powered products, immersive digital experiences, and intelligent automation systems.",
    "url": "https://nexenity.tech",
    "logo": "https://nexenity.tech/logo.png",
    "founder": {
      "@type": "Person",
      "name": "Rudraksh Paliwal",
      "jobTitle": "Founder & Creative Lead"
    },
    "serviceType": [
      "AI & GenAI Development",
      "Full-Stack Web Development",
      "AI Automation",
      "UI/UX Design",
      "SaaS Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    }
  };

  return (
    <>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
        <SmoothScroll>
          <div className="relative selection:bg-brand-accent selection:text-white">
          <SparklingBackground density={40} speed={0.4} size={1.5} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
          />
          <SectionSEO />
          <ThemeReveal 
            active={reveal.active} 
            theme={reveal.theme} 
            x={reveal.x} 
            y={reveal.y} 
            onComplete={() => {}} 
          />
          <ReadingProgressBar />
          <HapticInterface enabled={hapticsEnabled} />
          <SideNav activeSection={activeSection} theme={theme} />
          <SectionAudio activeSection={activeSection} />
          <Navbar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            hapticsEnabled={hapticsEnabled}
            toggleHaptics={toggleHaptics}
            reducedMotion={reducedMotion}
            toggleReducedMotion={toggleReducedMotion}
          />
          <ScrollToTop theme={theme} />
          <AIChatbot theme={theme} />
          <OfflineIndicator />
          
          <SplashCursor RAINBOW_MODE />
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Hero theme={theme} reducedMotion={reducedMotion} />
            <Reveal delay={0.1}><Marquee /></Reveal>
            <ClientCarousel theme={theme} />
            <About />
            <SectionDivider />
            <Services />
            <SectionDivider />
            <Portfolio />
            <SectionDivider />
            <MotionShowcase />
            <TechStack />
            <ImpactSection />
            <Process />
            <SectionDivider />
            <WhyNexenity />
            <FAQ />
            <SectionDivider />
            <Contact />
            <Footer />
          </motion.main>

          {/* Global SVG Definitions */}
          <svg id="global-svg-defs" style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
              
              <linearGradient id="gradient-divider" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f3ff" />
                <stop offset="50%" stopColor="#ff2d95" />
                <stop offset="100%" stopColor="#00f3ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </SmoothScroll>
    </MotionConfig>
    </>
  );
}


