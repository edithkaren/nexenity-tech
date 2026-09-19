import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function useActiveSection() {
  const { t } = useLanguage();
  const baseTitle = "Nexenity Technologies";

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Map ID to a readable name or translation key
          const sectionNames: Record<string, string> = {
            'hero': t('nav.home'),
            'about': t('nav.about'),
            'services': t('nav.services'),
            'portfolio': t('nav.portfolio'),
            'contact': t('nav.contact'),
          };

          const sectionName = sectionNames[id] || id.charAt(0).toUpperCase() + id.slice(1);
          document.title = `${sectionName} | ${baseTitle}`;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [t]);
}
