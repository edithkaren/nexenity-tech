import { TechText } from '../ui/TechText';
import { Reveal } from '../ui/Reveal';

export function ImpactSection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full text-center z-10">
        <Reveal>
          <span className="text-xs font-bold tracking-[0.3em] text-brand-accent uppercase block mb-12 opacity-50">
            Our Vision
          </span>
        </Reveal>
        
        <div className="h-[200px] md:h-[400px] w-full mb-12">
          <TechText 
            text="BUILDING"
            fontSize={window.innerWidth < 768 ? 80 : 180}
            reach={120}
            speed={2}
          />
        </div>
        
        <div className="h-[200px] md:h-[400px] w-full -mt-24 md:-mt-48">
          <TechText 
            text="TOMORROW"
            fontSize={window.innerWidth < 768 ? 60 : 160}
            reach={150}
            speed={1.5}
            color="#ff2d95"
            outlineColor="rgba(255, 45, 149, 0.2)"
          />
        </div>

        <Reveal delay={0.4}>
          <p className="max-w-2xl mx-auto text-white/40 text-lg md:text-xl leading-relaxed mt-12">
            We don't just build products; we architect the future of digital interaction. 
            From AI-driven systems to immersive wordmarks, every pixel is precision-engineered.
          </p>
        </Reveal>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-px bg-white/5" />
    </section>
  );
}
