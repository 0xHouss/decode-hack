'use client';

import { useEffect } from 'react';

// Elements that come into view together fade in this far apart, up to a limit
const STAGGER_MS = 100;
const MAX_STAGGER_STEPS = 4;

// Marks each .reveal element as revealed the first time it scrolls into view,
// which triggers its transition in globals.css.
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const element = entry.target as HTMLElement;
            element.style.setProperty('--reveal-delay', `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
            element.setAttribute('data-revealed', '');
            observer.unobserve(element);
          });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll('.reveal:not([data-revealed])').forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
