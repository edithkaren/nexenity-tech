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

import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './components/ui/Toast';

// Components
import { SmoothScroll } from './components/ui/SmoothScroll';
import { CursorTrail } from './components/ui/CursorTrail';
import { HapticInterface } from './components/ui/HapticInterface';
import { useActiveSection } from './hooks/useActiveSection';

function SectionTracker() {
  useActiveSection();
  return null;
}
import { GlitchOverlay } from './components/ui/GlitchOverlay';
import { AutonomousAgent } from './components/ui/AutonomousAgent';
import { AmbientGlow } from './components/ui/AmbientGlow';
import { ReadingProgressBar } from './components/ui/ReadingProgressBar';
import { SectionSEO } from './components/ui/SectionSEO';
import { LiveBackground } from './components/ui/LiveBackground';
import { AIChatbot } from './components/ui/AIChatbot';
import { OfflineIndicator } from './components/ui/OfflineIndicator';
import { SectionDivider } from './components/ui/SectionDivider';
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
import { WhyNexenity } from './components/sections/WhyNexenity';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

// Loading Placeholder
const SectionLoader = () => (
  <div className="w-full h-[400px] flex items-center justify-center opacity-20">
    <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [cyberAmbient, setCyberAmbient] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global Error Caught:', event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('nexenity-theme') as 'dark' | 'light' | null;
      if (savedTheme) setTheme(savedTheme);
      
      const savedAmbient = localStorage.getItem('nexenity-ambient') === 'true';
      setCyberAmbient(savedAmbient);

      const savedHaptics = localStorage.getItem('nexenity-haptics');
      if (savedHaptics !== null) setHapticsEnabled(savedHaptics === 'true');

      const savedReducedMotion = localStorage.getItem('nexenity-reduced-motion') === 'true';
      setReducedMotion(savedReducedMotion);
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('nexenity-theme', theme);
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('nexenity-ambient', String(cyberAmbient));
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, [cyberAmbient]);

  useEffect(() => {
    try {
      localStorage.setItem('nexenity-haptics', String(hapticsEnabled));
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, [hapticsEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('nexenity-reduced-motion', String(reducedMotion));
    } catch (e) {
      console.warn('Persistence error:', e);
    }
  }, [reducedMotion]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleCyberAmbient = () => {
    setCyberAmbient(prev => !prev);
  };

  const toggleHaptics = () => {
    setHapticsEnabled(prev => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
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
    <LanguageProvider>
      <SectionTracker />
      <ToastProvider>
        <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
          <SmoothScroll>
            <div className="relative selection:bg-brand-accent selection:text-white">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <SectionSEO />
            <AmbientGlow active={cyberAmbient} />
            <LiveBackground theme={theme} reducedMotion={reducedMotion} />
            <ReadingProgressBar />
            <CursorTrail theme={theme} reducedMotion={reducedMotion} />
            <AutonomousAgent />
            <HapticInterface enabled={hapticsEnabled} />
            <GlitchOverlay />
            <Navbar 
              theme={theme} 
              toggleTheme={toggleTheme} 
              cyberAmbient={cyberAmbient}
              toggleCyberAmbient={toggleCyberAmbient}
              hapticsEnabled={hapticsEnabled}
              toggleHaptics={toggleHaptics}
              reducedMotion={reducedMotion}
              toggleReducedMotion={toggleReducedMotion}
            />
            <AIChatbot theme={theme} />
            <OfflineIndicator />
            
            <motion.main
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={sectionVariants}><Hero theme={theme} reducedMotion={reducedMotion} /></motion.div>
              <motion.div variants={sectionVariants}><Marquee /></motion.div>
              <motion.div variants={sectionVariants}><ClientCarousel theme={theme} /></motion.div>
              <motion.div variants={sectionVariants}><About /></motion.div>
              <motion.div variants={sectionVariants}><SectionDivider /></motion.div>
              <motion.div variants={sectionVariants}><Services /></motion.div>
              <motion.div variants={sectionVariants}><SectionDivider /></motion.div>
              <motion.div variants={sectionVariants}><Portfolio /></motion.div>
              <motion.div variants={sectionVariants}><SectionDivider /></motion.div>
              <motion.div variants={sectionVariants}><MotionShowcase /></motion.div>
              <motion.div variants={sectionVariants}><TechStack /></motion.div>
              <motion.div variants={sectionVariants}><Process /></motion.div>
              <motion.div variants={sectionVariants}><SectionDivider /></motion.div>
              <motion.div variants={sectionVariants}><WhyNexenity /></motion.div>
              <motion.div variants={sectionVariants}><FAQ /></motion.div>
              <motion.div variants={sectionVariants}><SectionDivider /></motion.div>
              <motion.div variants={sectionVariants}><Contact /></motion.div>
              <motion.div variants={sectionVariants}><Footer /></motion.div>
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
      </ToastProvider>
    </LanguageProvider>
  );
}

