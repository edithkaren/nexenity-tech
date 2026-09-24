import { Service, Project, Value, TechItem, ProcessStep, RoadmapStep } from './types';

export const ROADMAP: RoadmapStep[] = [
  {
    date: 'Q1 2024',
    title: 'Foundation & AI Research',
    description: 'Establishing core AI infrastructure and researching generative models for creative workflows.',
    status: 'completed',
    milestones: ['Core Platform Launch', 'GenAI Research Phase', 'Beta Automation Tools']
  },
  {
    date: 'Q2 2024',
    title: 'Automation Engine Beta',
    description: 'Launching the first version of our AI-driven workflow automation engine for creative agencies.',
    status: 'completed',
    milestones: ['Workflow Designer', 'API Integration Suite', 'Performance Analytics']
  },
  {
    date: 'Q3 2024',
    title: 'Immersive Experiences',
    description: 'Focusing on 3D web experiences and advanced motion graphics integration.',
    status: 'completed',
    milestones: ['Three.js Lab', 'Motion Graphics Engine', 'Interactive Brand Kits']
  },
  {
    date: 'Q4 2024',
    title: 'Nexenity Agents',
    description: 'Deploying specialized autonomous AI agents for customer support and lead generation.',
    status: 'in-progress',
    milestones: ['Agent Orchestrator', 'Omni-channel Support', 'Natural Language Understanding']
  },
  {
    date: 'Q1 2025',
    title: 'Scaling & Intelligence',
    description: 'Advanced predictive analytics and cross-platform growth systems.',
    status: 'upcoming',
    milestones: ['Predictive Growth Engine', 'Self-Healing Systems', 'Global Reach Expansion']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'fullstack',
    number: '01',
    title: 'Full-Stack Development',
    description: 'Modern, scalable web applications using modern frontend and backend technologies.',
    tooltip: 'Build robust scalable architectures',
    details: {
      process: ['Architecture Design', 'Frontend Implementation', 'Backend Integration', 'QA & Deployment'],
      deliverables: ['Responsive Web App', 'API Documentation', 'Source Code', 'Deployment Pipeline'],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
      useCases: ['Enterprise Platforms', 'Consumer Web Apps', 'Dashboards'],
    }
  },
  {
    id: 'ai-genai',
    number: '02',
    title: 'AI & GenAI',
    description: 'AI-powered applications, assistants, intelligent search, and custom AI experiences.',
    tooltip: 'Leverage the power of Gemini',
    details: {
      process: ['Model Selection', 'Prompt Engineering', 'RAG Integration', 'User Interface Design'],
      deliverables: ['Custom AI Assistant', 'Integrated Search Engine', 'LLM Wrappers', 'AI Training Workflows'],
      technologies: ['Gemini', 'OpenAI', 'LangChain', 'Python', 'Pinecone'],
      useCases: ['AI Knowledge Bases', 'Creative Tools', 'Smart Search'],
    }
  },
  {
    id: 'automation',
    number: '03',
    title: 'AI Automation',
    description: 'Automate repetitive business workflows using AI agents, APIs, and workflow automation.',
    tooltip: 'Scale with intelligent workflows',
    details: {
      process: ['Workflow Audit', 'Agent Configuration', 'Tool Integration', 'Monitoring Setup'],
      deliverables: ['Automated Pipelines', 'AI Agents', 'Integration Hub', 'Performance Reports'],
      technologies: ['n8n', 'Make', 'Zapier', 'Python', 'Custom APIs'],
      useCases: ['Lead Gen Automation', 'Content Repurposing', 'Internal Operations'],
    }
  },
  {
    id: 'chatbots',
    number: '04',
    title: 'AI Chatbots & Agents',
    description: 'Intelligent conversational systems for customer support, lead generation, and sales.',
    tooltip: 'Automate customer interactions',
    details: {
      process: ['Conversation Design', 'Context Engineering', 'Integration', 'Feedback Loop'],
      deliverables: ['Custom Chatbot', 'Lead Capture Engine', 'Human-in-loop System', 'Analytics Dashboard'],
      technologies: ['Voiceflow', 'Botpress', 'Gemini API', 'Node.js'],
      useCases: ['Customer Support', 'Sales Qualifying', 'Interactive Guides'],
    }
  },
  {
    id: 'saas',
    number: '05',
    title: 'SaaS Development',
    description: 'From MVP to production-ready SaaS platforms with advanced feature sets.',
    tooltip: 'Launch your product faster',
    details: {
      process: ['MVP Scoping', 'Product Engineering', 'Subscription Logic', 'Scaling'],
      deliverables: ['SaaS Platform', 'Admin Dashboard', 'Billing Integration', 'Analytics'],
      technologies: ['Stripe', 'Clerk', 'Next.js', 'Supabase'],
      useCases: ['B2B Tools', 'Vertical SaaS', 'Marketplaces'],
    }
  },
  {
    id: 'ui-ux',
    number: '06',
    title: 'UI/UX Design',
    description: 'Modern, intuitive interfaces and digital product experiences built for humans.',
    tooltip: 'Human-centric digital design',
    details: {
      process: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      deliverables: ['High-Fidelity UI', 'Interactive Prototype', 'Design Guidelines', 'Asset Library'],
      technologies: ['Figma', 'Framer', 'Adobe CC', 'Principle'],
      useCases: ['Mobile Apps', 'Web Products', 'Complex Software'],
    }
  },
  {
    id: 'graphic-brand',
    number: '07',
    title: 'Graphic & Brand Design',
    description: 'Visual identities, social media graphics, and cohesive brand systems.',
    tooltip: 'Identity that resonates',
    details: {
      process: ['Brand Discovery', 'Visual Exploration', 'System Design', 'Asset Production'],
      deliverables: ['Brand Guidelines', 'Logo System', 'Social Assets', 'Marketing Collateral'],
      technologies: ['Illustrator', 'Photoshop', 'Indesign', 'Midjourney'],
      useCases: ['Startup Identity', 'Brand Refresh', 'Marketing Campaigns'],
    }
  },
  {
    id: 'motion',
    number: '08',
    title: 'Motion Graphics',
    description: 'Animated visuals, promotional videos, and creative campaigns that move.',
    tooltip: 'Stories in motion',
    details: {
      process: ['Storyboarding', 'Visual Design', 'Animation', 'Sound Design'],
      deliverables: ['Promotional Video', 'UI Animations', 'Logo Stings', 'Social Reels'],
      technologies: ['After Effects', 'Lottie', 'C4D', 'Spline'],
      useCases: ['Product Explainer', 'Brand Storytelling', 'High-End UI'],
    }
  },
  {
    id: 'video',
    number: '09',
    title: 'Video Creation',
    description: 'Short-form content, promotional videos, and AI-assisted video production.',
    tooltip: 'Cinematic brand impact',
    details: {
      process: ['Scripting', 'Capture/Generation', 'Editing', 'Post-Production'],
      deliverables: ['Finished Video', 'Social Media Cuts', 'AI-Generated B-Roll', 'Color Grade'],
      technologies: ['Premiere Pro', 'Runway ML', 'Luma AI', 'DaVinci'],
      useCases: ['TikTok/Reels Content', 'Brand Films', 'AI Content'],
    }
  },
  {
    id: 'marketing',
    number: '10',
    title: 'Digital Marketing',
    description: 'Content strategy, SEO, analytics, and growth systems that scale businesses.',
    tooltip: 'Data-driven growth',
    details: {
      process: ['Audit & Strategy', 'Execution', 'Optimization', 'Growth Loop'],
      deliverables: ['Growth Strategy', 'SEO Reports', 'Ad Campaign Setup', 'Analytics Setup'],
      technologies: ['Google Analytics', 'Ahrefs', 'Meta Ads', 'Hotjar'],
      useCases: ['Launch Strategy', 'Organic Growth', 'Performance Marketing'],
    }
  },
  {
    id: 'social',
    number: '11',
    title: 'Social Media',
    description: 'Content planning, creative production, and audience growth strategies.',
    tooltip: 'Build viral communities',
    details: {
      process: ['Platform Audit', 'Content Pillars', 'Production', 'Engagement'],
      deliverables: ['Content Calendar', 'Viral Assets', 'Platform Strategy', 'Growth Plan'],
      technologies: ['Later', 'Canva', 'CapCut', 'FeedHive'],
      useCases: ['Community Building', 'Personal Branding', 'Launch Hype'],
    }
  },
  {
    id: 'creative-tech',
    number: '12',
    title: 'Creative Technology',
    description: 'Experimental interactive websites and immersive digital experiences.',
    tooltip: 'Beyond standard digital',
    details: {
      process: ['Creative Concept', 'Prototyping', 'Development', 'Interaction Polish'],
      deliverables: ['Interactive Website', 'Immersive App', 'Experimental UI', 'Custom Shaders'],
      technologies: ['Three.js', 'WebGL', 'GSAP', 'GLSL'],
      useCases: ['Brand Experiences', 'Portfolio Sites', 'Creative Labs'],
    }
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'ai-navigator',
    name: 'AI Career Navigator',
    category: 'AI Products',
    description: 'AI-powered career guidance and opportunity discovery platform.',
    technologies: ['Next.js', 'Gemini API', 'Supabase'],
    year: '2025',
    lastUpdate: '2025-05-15',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'automation-hub',
    name: 'AI Automation Systems',
    category: 'Automation',
    description: 'Intelligent automation workflows for creators and modern agencies.',
    technologies: ['n8n', 'Python', 'Node.js'],
    year: '2024',
    lastUpdate: '2024-11-20',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2564&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'creator-tools',
    name: 'Creator AI Suite',
    category: 'SaaS',
    description: 'A collection of AI tools designed to improve content production efficiency.',
    technologies: ['React', 'FastAPI', 'OpenAI'],
    year: '2025',
    lastUpdate: '2025-02-10',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2560&auto=format&fit=crop',
  },
  {
    id: 'brand-exp',
    name: 'Digital Brand Lab',
    category: 'Websites',
    description: 'Interactive immersive website for a future-facing fashion label.',
    technologies: ['Three.js', 'Motion', 'Tailwind'],
    year: '2024',
    lastUpdate: '2024-08-05',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
  }
];

export const VALUES: Value[] = [
  { title: 'Innovation', description: 'Constantly exploring new technologies and creative possibilities.' },
  { title: 'Intelligence', description: 'Using AI and automation to build smarter digital systems.' },
  { title: 'Creativity', description: 'Combining design, motion, technology, and storytelling.' },
  { title: 'Impact', description: 'Building solutions that solve real problems and create measurable value.' },
  { title: 'Future-Ready', description: 'Designing products and systems prepared for tomorrow.' },
];

export const TECH_STACK: TechItem[] = [
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Supabase', category: 'database' },
  { name: 'Gemini', category: 'ai' },
  { name: 'OpenAI', category: 'ai' },
  { name: 'Claude', category: 'ai' },
  { name: 'n8n', category: 'automation' },
  { name: 'Make', category: 'automation' },
  { name: 'Figma', category: 'design' },
  { name: 'Adobe CC', category: 'design' },
];

export const PROCESS: ProcessStep[] = [
  { number: '01', title: 'DISCOVER', description: 'Understand the problem, business, audience, and goals.' },
  { number: '02', title: 'STRATEGIZE', description: 'Create the technical, creative, and growth strategy.' },
  { number: '03', title: 'DESIGN', description: 'Transform ideas into visual experiences and interfaces.' },
  { number: '04', title: 'BUILD', description: 'Develop, integrate, test, and optimize the solution.' },
  { number: '05', title: 'LAUNCH', description: 'Deploy the product and prepare it for real users.' },
  { number: '06', title: 'GROW', description: 'Improve, automate, analyze, and scale for the future.' },
];
