import type { ReactNode } from 'react';
import { m as motion, useReducedMotion } from 'motion/react';

export function Reveal({ children, className, id, labelledBy }: {
  children: ReactNode;
  className: string;
  id?: string;
  labelledBy?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      aria-labelledby={labelledBy}
      initial={false}
      whileInView={reduced ? undefined : { opacity: [0.92, 1], y: [8, 0] }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
    >{children}</motion.section>
  );
}
