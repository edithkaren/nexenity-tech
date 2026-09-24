export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tooltip?: string;
  details: {
    process: string[];
    deliverables: string[];
    technologies: string[];
    useCases: string[];
  };
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  image: string;
  featured?: boolean;
  lastUpdate?: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'automation' | 'design';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface RoadmapStep {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  milestones: string[];
}
