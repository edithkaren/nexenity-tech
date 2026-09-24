import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { TechDetailModal } from '../ui/TechDetailModal';

interface Project {
  title: string;
  description: string;
}

interface TechDetail {
  name: string;
  color: string;
  description: string;
  expertise: string[];
  projects: Project[];
}

export function TechStack() {
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);

  const techs: TechDetail[] = [
    { 
      name: 'React.js', 
      color: 'bg-blue-500',
      description: 'The foundation of our high-performance, interactive user interfaces.',
      expertise: ['Hooks & Custom Context', 'Performance Optimization', 'Complex State Management'],
      projects: [
        { title: 'Nexus CRM', description: 'Enterprise-grade customer relationship dashboard.' },
        { title: 'Vortex Dashboard', description: 'Real-time financial data visualization portal.' }
      ]
    },
    { 
      name: 'Next.js', 
      color: 'bg-zinc-800',
      description: 'Our primary framework for building scalable, SEO-optimized production apps.',
      expertise: ['App Router & Server Actions', 'Static Site Generation', 'Edge Runtime Deployment'],
      projects: [
        { title: 'Nexenity Portal', description: 'Our official high-performance agency ecosystem.' },
        { title: 'Aether Commerce', description: 'Full-stack headless e-commerce storefront.' }
      ]
    },
    { 
      name: 'TypeScript', 
      color: 'bg-blue-600',
      description: 'Strict type-safety ensures our codebases are robust and maintainable.',
      expertise: ['Generic System Design', 'Advanced Type Inference', 'Interface Architecture'],
      projects: [
        { title: 'Core Framework', description: 'Standardized internal utility library for all apps.' }
      ]
    },
    { 
      name: 'Tailwind', 
      color: 'bg-cyan-500',
      description: 'Rapid, utility-first styling for perfectly responsive design systems.',
      expertise: ['Atomic CSS Architecture', 'Complex Responsive Layouts', 'Design System Integration'],
      projects: [
        { title: 'StyleGuide UI', description: 'Internal component library for design consistency.' }
      ]
    },
    { 
      name: 'Node.js', 
      color: 'bg-green-600',
      description: 'Powering our ultra-fast server-side logic and real-time processing.',
      expertise: ['Microservices Architecture', 'Real-time WebSockets', 'High-throughput APIs'],
      projects: [
        { title: 'SyncEngine', description: 'High-speed data synchronization bridge.' }
      ]
    },
    { 
      name: 'Python', 
      color: 'bg-yellow-600',
      description: 'The engine behind our AI, data processing, and automation pipelines.',
      expertise: ['AI/ML Integration', 'Data Engineering', 'System Automation Scripts'],
      projects: [
        { title: 'NeuroLog', description: 'AI-powered log analysis and prediction tool.' }
      ]
    },
    { 
      name: 'Gemini', 
      color: 'bg-brand-accent',
      description: 'Leveraging Google\'s most capable models for advanced multimodal reasoning.',
      expertise: ['Multimodal Prompting', 'Context Window Optimization', 'Integration via Vertex AI'],
      projects: [
        { title: 'Nexus Vision', description: 'Multimodal AI assistant for visual data analysis.' },
        { title: 'IntelliContent', description: 'GenAI content generation for global brands.' }
      ]
    },
    { 
      name: 'OpenAI', 
      color: 'bg-zinc-700',
      description: 'Integrating state-of-the-art LLMs for reasoning and conversation.',
      expertise: ['GPT-4 Integration', 'Fine-tuning Workflows', 'Function Calling Architectures'],
      projects: [
        { title: 'Agentic CRM', description: 'Automated sales agent using GPT-4 Reasoning.' }
      ]
    },
    { 
      name: 'n8n', 
      color: 'bg-red-500',
      description: 'Advanced workflow automation for complex business processes.',
      expertise: ['Custom Node Development', 'Self-hosted Infrastructure', 'Multi-app Orchestration'],
      projects: [
        { title: 'AutoOps', description: 'Fully automated lead generation and qualification pipeline.' }
      ]
    },
    { 
      name: 'PostgreSQL', 
      color: 'bg-indigo-600',
      description: 'Relational stability for complex data architectures.',
      expertise: ['Advanced Query Optimization', 'Relational Schema Design', 'JSONB Workflows'],
      projects: [
        { title: 'DataVault', description: 'Secure storage for enterprise compliance records.' }
      ]
    },
    { 
      name: 'Figma', 
      color: 'bg-purple-500',
      description: 'Where our creative visions and high-fidelity designs come to life.',
      expertise: ['Prototyping & Motion Design', 'Collaborative Workflows', 'Design-to-Code Systems'],
      projects: [
        { title: 'Brand Identity v2', description: 'Comprehensive design system for Nexenity.' }
      ]
    },
  ];

  return (
    <section id="techstack" className="py-24 px-6 md:px-12 bg-transparent overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-widest text-brand-accent uppercase block mb-4"
        >
          Our Tech Ecosystem
        </motion.span>

        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-12">
          CURATED FOR <span className="text-brand-accent italic">PRECISION.</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {techs.map((tech, i) => (
            <motion.button
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedTech(tech)}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer group hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <div className={cn("w-3 h-3 rounded-full transition-transform group-hover:scale-125", tech.color)} />
              <span className="text-sm md:text-base font-bold tracking-tight text-white/60 group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <TechDetailModal 
        tech={selectedTech} 
        onClose={() => setSelectedTech(null)} 
      />
    </section>
  );
}
