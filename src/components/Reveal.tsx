import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
    >{children}</motion.section>
  );
}
