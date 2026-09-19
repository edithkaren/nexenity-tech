import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../ui/Toast';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      showToast('Message sent successfully! Our team will get back to you soon.', 'success');
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
            >
              HAVE AN IDEA?<br />
              <span className="liquid-text">LET'S BUILD IT.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mb-12"
            >
              Tell us what you're building, what you're trying to solve, or where you want to go next. 
              Let's turn the idea into something real.
            </motion.p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/40">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                  <ArrowRight className="-rotate-45" size={20} />
                </div>
                <span className="text-lg">hello@nexenity.tech</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-brand-accent" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Your idea is now in motion.</h3>
                  <p className="text-white/40 mb-8">We've received your message and will get back to you shortly.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-white font-bold uppercase tracking-widest text-xs py-3 px-8 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-accent focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-accent focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Company</label>
                      <input 
                        type="text" 
                        placeholder="Your Company"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-accent focus:bg-white/10 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Project Type</label>
                      <select 
                        required
                        defaultValue=""
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-accent focus:bg-white/10 outline-none transition-all appearance-none"
                      >
                        <option value="" disabled>Select an option</option>
                        <option>Website</option>
                        <option>Web Application</option>
                        <option>AI Product</option>
                        <option>SaaS</option>
                        <option>AI Automation</option>
                        <option>Chatbot / AI Agent</option>
                        <option>UI/UX</option>
                        <option>Branding</option>
                        <option>Motion Graphics</option>
                        <option>Video</option>
                        <option>Digital Marketing</option>
                        <option>Social Media</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your vision..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-brand-accent focus:bg-white/10 outline-none transition-all resize-none"
                    />
                  </div>

                  <button 
                    disabled={formState === 'loading'}
                    className="w-full bg-white text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent hover:text-white transition-all group disabled:opacity-50"
                  >
                    {formState === 'loading' ? (
                      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent" />
                    ) : (
                      <>
                        Start Building <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
