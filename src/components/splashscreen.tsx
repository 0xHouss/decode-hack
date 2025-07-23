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
      splashRef.current?.classList.add('opacity-0');
      setTimeout(() => {
        onFinish(); // Tell parent to hide
      }, 500); // Matches transition duration
    }
  }, [animationDone, resourcesLoaded, onFinish]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-2xl transition-all duration-500"
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
