import { useEffect } from 'react';
import { hapticEngine } from '../../lib/audio';

interface HapticInterfaceProps {
  enabled: boolean;
}

export function HapticInterface({ enabled }: HapticInterfaceProps) {
  useEffect(() => {
    hapticEngine.setEnabled(enabled);
  }, [enabled]);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent) => {
      try {
        const target = e.target;
        if (!(target instanceof Element)) return;
        
        const interactive = target.closest('button, a, input, textarea, [role="button"]');
        
        if (interactive) {
          // Trigger click on actual click event
          if (e.type === 'mousedown') {
            hapticEngine.playClick();
          }
          // Trigger hover on mouseenter
          else if (e.type === 'mouseover') {
            // Prevent multiple triggers for nested elements
            if (e.currentTarget === e.target || target.tagName === 'BUTTON' || target.tagName === 'A') {
               hapticEngine.playHover();
            }
          }
        }
      } catch (err) {
        // Fail silently
      }
    };

    // Use capturing phase to ensure we catch events before they are stopped
    window.addEventListener('mousedown', handleInteraction, true);
    window.addEventListener('mouseover', handleInteraction, true);

    return () => {
      window.removeEventListener('mousedown', handleInteraction, true);
      window.removeEventListener('mouseover', handleInteraction, true);
    };
  }, []);

  return null; // Purely functional component
}
