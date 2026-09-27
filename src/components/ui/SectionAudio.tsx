import { useEffect, useRef } from 'react';
import { hapticEngine } from '../../lib/audio';

interface SectionAudioProps {
  activeSection: string;
}

const SECTION_ORDER = [
  'hero',
  'about',
  'services',
  'portfolio',
  'techstack',
  'process',
  'faq',
  'contact'
];

export function SectionAudio({ activeSection }: SectionAudioProps) {
  const previousSectionRef = useRef<string>(activeSection);

  useEffect(() => {
    if (previousSectionRef.current !== activeSection) {
      const prevIndex = SECTION_ORDER.indexOf(previousSectionRef.current);
      const currIndex = SECTION_ORDER.indexOf(activeSection);

      // Only play if both are main sections to avoid too much noise
      if (prevIndex !== -1 && currIndex !== -1) {
        const direction = currIndex > prevIndex ? 'down' : 'up';
        hapticEngine.playTransition(direction);
      }

      previousSectionRef.current = activeSection;
    }
  }, [activeSection]);

  return null;
}
