import { cn } from '@/lib/utils';
import React from 'react'

interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("px-6 w-screen lg:max-w-5xl mx-auto my-20 lg:my-40", className)}>
      {children}
    </section>
  )
}
