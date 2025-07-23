'use client';

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/../public/splash.json'; // adjust path

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [animationDone, setAnimationDone] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const splashRef = useRef<HTMLDivElement>(null);

  // Wait for animation complete
  const handleLottieComplete = () => {
    setAnimationDone(true);
  };

  // Wait for page load
  useEffect(() => {
    if (document.readyState === 'complete') {
      setResourcesLoaded(true);
    } else {
      window.addEventListener('load', () => setResourcesLoaded(true));
    }
  }, []);

  // When both are done, slide up
  useEffect(() => {
    if (animationDone && resourcesLoaded) {
      splashRef.current?.classList.add('-translate-y-full');
      setTimeout(() => {
        onFinish(); // Tell parent to hide
      }, 1000); // Matches transition duration
    }
  }, [animationDone, resourcesLoaded, onFinish]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 bg-[radial-gradient(#030B01,#051600)] bg-background z-50 flex items-center justify-center transition-transform duration-1000"
    >
      <Lottie
        animationData={animationData}
        loop={false}
        autoplay
        onComplete={handleLottieComplete}
        className="w-[80svw] md:w-[50svw] lg:w-[20svw]"
        height={500}
        width={500}
      />
    </div>
  );
}
