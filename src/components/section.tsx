import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("px-6 w-screen lg:max-w-5xl mx-auto my-20 lg:my-40 scroll-mt-20", className)}>
      {children}
    </section>
  )
}
