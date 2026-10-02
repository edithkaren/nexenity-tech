import { motion } from 'motion/react';
import { Twitter, Instagram, Linkedin, Github, Send, ArrowUpRight, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../ui/Toast';
import { Magnetic } from '../ui/Magnetic';

const MOCK_UPDATES = [
  { id: 1, platform: 'Twitter', text: 'Just launched our new AI-driven motion engine for Nexenity. Experience real-time kinetic UI.', time: '2h ago' },
  { id: 2, platform: 'LinkedIn', text: 'Honored to be named one of the top 10 future-tech agencies for 2026. Innovation never stops.', time: '5h ago' },
  { id: 3, platform: 'Instagram', text: 'Behind the scenes: Crafting the digital DNA for our latest immersive project. #Cyberpunk #Design', time: '1d ago' },
];

export function Footer() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Nexenity Technologies',
      text: t('common.shareDescription'),
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin);
        showToast('Agency link copied to clipboard', 'success');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <footer className="bg-black pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        {/* Brand Column */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-8 group cursor-default">
            <img 
              src="/src/assets/images/nexenity_logo_futuristic_1790406574983.jpg" 
              alt="Nexenity Logo" 
              className="w-10 h-10 rounded-full object-cover group-hover:rotate-12 transition-transform"
            />
            <span className="text-2xl font-black tracking-tighter uppercase tracking-widest brand-logo-text">Nexenity</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
            Pioneering the intersection of artificial intelligence, high-end motion design, and futuristic brand identities.
          </p>
          <div className="flex gap-4">
            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
              <Magnetic key={i} strength={0.4}>
                <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-brand-accent hover:border-brand-accent transition-all">
                  <Icon size={18} />
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.4}>
              <button 
                onClick={handleShare}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-brand-accent hover:border-brand-accent transition-all"
                title={t('common.share')}
              >
                <Share2 size={18} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/20">Studio</h4>
          <ul className="space-y-4">
            {['About', 'Services', 'Portfolio', 'Process', 'Careers'].map(link => (
              <li key={link}>
                <Magnetic strength={0.2}>
                  <Link to={`/#${link.toLowerCase()}`} className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                    {link}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>

        {/* Live Updates Feed */}
        <div className="md:col-span-6">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-white/20">Live Stream Updates</h4>
          <div className="space-y-4">
            {MOCK_UPDATES.map((update, i) => (
              <motion.div 
                key={update.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">{update.platform}</span>
                  <span className="text-[10px] text-white/20 font-mono">{update.time}</span>
                </div>
                <p className="text-sm text-white/60 group-hover:text-white transition-colors">
                  {update.text}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <button className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-brand-accent transition-colors flex items-center gap-2">
              Follow Stream <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <span>© 2026 Nexenity Technologies</span>
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}
