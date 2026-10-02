import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SparklingBackground } from '../components/ui/SparklingBackground';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
  theme: 'dark' | 'light';
  toggleTheme: (e?: React.MouseEvent) => void;
}

export function LegalPage({ title, content, theme, toggleTheme }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen relative selection:bg-brand-accent selection:text-white">
      <SparklingBackground density={30} speed={0.3} size={1} />
      
      {/* Reusing existing Navbar structure but simplified if needed or passed through App */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        hapticsEnabled={true} // Default for legal pages
        toggleHaptics={() => {}} 
        reducedMotion={false}
        toggleReducedMotion={() => {}}
      />

      <main className="pt-32 pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent mb-12 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} /> Back to Studio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16 leading-none">
              {title}.
            </h1>

            <div className="prose prose-invert prose-brand max-w-none text-white/60 leading-relaxed space-y-8 text-lg">
              {content}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
