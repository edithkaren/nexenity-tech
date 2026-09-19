import { useEffect, useState } from 'react';

const SEO_DATA: Record<string, { title: string; description: string }> = {
  hero: {
    title: "Nexenity Technologies | Beyond Tomorrow",
    description: "Building AI-powered products, immersive digital experiences, and intelligent automation systems for the next generation of business."
  },
  about: {
    title: "About Nexenity | Our Vision for Digital Innovation",
    description: "Discover how Nexenity Technologies blends creative vision with advanced technology to build the future of the digital landscape."
  },
  services: {
    title: "AI & Digital Services | Full-Stack Solutions",
    description: "Expert AI development, full-stack web engineering, UI/UX design, and intelligent automation tailored for high-growth enterprises."
  },
  portfolio: {
    title: "Featured Work | Immersive Digital Products",
    description: "Explore our portfolio of high-performance SaaS platforms, creative campaigns, and AI integrations."
  },
  faq: {
    title: "FAQ | Common Client Inquiries Answered",
    description: "Find answers to frequently asked questions about our process, AI integration, and project timelines."
  },
  contact: {
    title: "Start a Project | Contact Nexenity Technologies",
    description: "Partner with Nexenity to bring your most ambitious digital ideas to life. Let's build something extraordinary together."
  }
};

export function SectionSEO() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'portfolio', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const data = SEO_DATA[activeSection] || SEO_DATA.hero;
    const siteName = "Nexenity Technologies";
    const fullTitle = `${data.title}`; // Using the descriptive title directly as it already includes context
    
    // Update Title
    document.title = fullTitle;
    
    // Helper to update or create meta tags
    const updateMeta = (selector: string, attr: string, value: string, isProperty = false) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isProperty ? 'property' : 'name', attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // Standard Meta
    updateMeta('meta[name="description"]', 'description', data.description);

    // Open Graph
    updateMeta('meta[property="og:title"]', 'og:title', data.title, true);
    updateMeta('meta[property="og:description"]', 'og:description', data.description, true);
    updateMeta('meta[property="og:site_name"]', 'og:site_name', siteName, true);
    updateMeta('meta[property="og:type"]', 'og:type', 'website', true);

    // Twitter
    updateMeta('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'twitter:title', data.title);
    updateMeta('meta[name="twitter:description"]', 'twitter:description', data.description);
    
  }, [activeSection]);

  return null; // This component doesn't render anything UI-wise
}
