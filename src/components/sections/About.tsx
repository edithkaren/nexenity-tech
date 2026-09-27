import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import { VALUES } from '../../constants';
import { ParallaxElement } from '../ui/ParallaxElement';

import { Reveal } from '../ui/Reveal';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden flex flex-col justify-center">
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxElement offset={100} className="absolute top-[20%] right-[10%] w-80 h-80 bg-purple-500/5 rounded-full blur-[100px]" children={null} />
        <ParallaxElement offset={150} reverse className="absolute bottom-[30%] left-[5%] w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px]" children={null} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <Reveal>
              <span className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6">
                The Nexenity Vision
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                WE DON'T JUST BUILD DIGITAL PRODUCTS.<br />
                <span className="text-white/40">WE BUILD WHAT COMES NEXT.</span>
              </h2>
            </Reveal>
          </div>
          <div className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed pt-2">
            <Reveal delay={0.2}>
              <p>
                Nexenity Technologies is a founder-led digital technology and creative agency focused on 
                combining software engineering, artificial intelligence, automation, design, and digital 
                marketing to create modern business solutions.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Founded by Rudraksh Paliwal, Nexenity Technologies brings together technology and creativity 
                to help businesses transform ideas into digital products, experiences, and growth systems.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-32">
          <Reveal threshold={0.2} yOffset={50}>
            <div className="bg-white/5 rounded-3xl p-8 md:p-16 border border-white/10 flex flex-col lg:flex-row items-center gap-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-accent/20 rounded-2xl blur-3xl group-hover:bg-brand-accent/40 transition-colors duration-500" />
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" 
                    alt="Rudraksh Paliwal"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                {/* Liquid glow frame */}
                <div className="absolute -inset-4 border border-white/5 rounded-3xl -z-10 group-hover:border-brand-accent/30 transition-colors duration-500" />
              </div>

              <div className="flex-1">
                <span className="text-brand-accent font-bold text-sm tracking-widest uppercase mb-2 block">Founder</span>
                <h3 className="text-4xl md:text-5xl font-bold mb-2">Rudraksh Paliwal</h3>
                <p className="text-white/40 text-lg mb-8 uppercase tracking-wider font-medium">Founder & Technology / Creative Lead</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {[
                    'AI & GenAI', 'Full-Stack', 'Automation', 'UI/UX', 
                    'Digital Products', 'Marketing', 'Content', 'Creative Tech'
                  ].map((area) => (
                    <div key={area} className="text-xs md:text-sm py-2 px-4 bg-white/5 border border-white/10 rounded-full text-center">
                      {area}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 group w-full sm:w-auto justify-center">
                    Connect With the Founder <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex gap-6">
                    <Linkedin className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                    <Github className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                    <Twitter className="text-white/40 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1} threshold={0.2}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all group h-full"
              >
                <div className="w-12 h-12 bg-brand-accent/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{value.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
