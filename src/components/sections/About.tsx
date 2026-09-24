import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import { VALUES } from '../../constants';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-6"
            >
              The Nexenity Vision
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8"
            >
              WE DON'T JUST BUILD DIGITAL PRODUCTS.<br />
              <span className="text-white/40">WE BUILD WHAT COMES NEXT.</span>
            </motion.h2>
          </div>
          <div className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed pt-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Nexenity Technologies is a founder-led digital technology and creative agency focused on 
              combining software engineering, artificial intelligence, automation, design, and digital 
              marketing to create modern business solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Founded by Rudraksh Paliwal, Nexenity Technologies brings together technology and creativity 
              to help businesses transform ideas into digital products, experiences, and growth systems.
            </motion.p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-32">
          <div className="bg-white/5 rounded-3xl p-8 md:p-16 border border-white/10 flex flex-col lg:flex-row items-center gap-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-accent/20 rounded-2xl blur-3xl group-hover:bg-brand-accent/40 transition-colors duration-500" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-64 h-80 rounded-2xl overflow-hidden border border-white/20"
              >
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" 
                  alt="Rudraksh Paliwal"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </motion.div>
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
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all group"
            >
              <div className="w-12 h-12 bg-brand-accent/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-brand-accent transition-colors">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-4">{value.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
