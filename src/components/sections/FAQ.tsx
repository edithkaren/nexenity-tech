import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Nexenity integrate AI into digital products?",
    answer: "We utilize advanced Large Language Models and custom neural architectures to create intuitive, predictive user experiences. Whether it's automated content generation, intelligent search, or personalized user journeys, we weave AI into the very fabric of your product's UI and logic."
  },
  {
    question: "What is the typical timeline for a custom project?",
    answer: "Timelines vary based on complexity, but most high-fidelity digital experiences range from 8 to 16 weeks. We operate in agile sprints, ensuring you have a functional, testable prototype within the first 4 weeks of development."
  },
  {
    question: "Do you work with existing legacy systems?",
    answer: "Absolutely. Our engineering team specializes in creating 'bridge architectures'—modernizing your frontend and AI capabilities while securely interfacing with your existing backends, databases, and APIs."
  },
  {
    question: "What makes Nexenity different from a traditional agency?",
    answer: "We aren't just designers; we are architects of the future. While others focus on static aesthetics, we focus on dynamic intelligence. Every project at Nexenity is built with a 'Machine Learning First' mindset, ensuring your platform grows smarter with every user interaction."
  },
  {
    question: "Do you offer post-launch maintenance and optimization?",
    answer: "Yes. The launch is just the beginning. We provide continuous monitoring, AI model retraining, and performance optimization to ensure your platform remains at the cutting edge as technology and user expectations evolve."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 bg-transparent relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pink-500 font-mono text-sm tracking-widest uppercase mb-4 block"
          >
            Insights & Clarity
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Questions</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about our process, technology, and how we build the future together.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              className={`group border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'bg-white/5 border-cyan-500/30' : 'bg-transparent hover:bg-white/5'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
              >
                <span className={`text-xl font-medium transition-colors ${
                  openIndex === index ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 ml-4 p-1 rounded-full transition-all duration-300 ${
                  openIndex === index ? 'bg-cyan-500 text-black rotate-180' : 'bg-white/10 text-white group-hover:bg-cyan-500/20 group-hover:text-cyan-400'
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-gray-400 leading-relaxed text-lg border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}
