import { motion, useInView, useAnimation } from 'motion/react';
import { ReactNode, useEffect, useRef } from 'react';

interface StaggerRevealProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function StaggerReveal({
  children,
  delay = 0,
  staggerDelay = 0.1,
  threshold = 0.1,
  once = true,
  className = "",
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {/* We need to recursively apply itemVariants or use a specific child wrapper */}
      {/* For simplicity, we expect children to be motion components or we wrap them */}
      {/* However, a better approach for a generic stagger is to use context or just wrap children in motion.div */}
      {/* But since we want to stagger "content elements", we'll use a helper to wrap children */}
      {Array.isArray(children) ? children.map((child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      )) : (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
