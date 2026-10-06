'use client';

import animationData from '@/../public/splash.json';
import { Lottie } from 'lottie-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

// Set before first paint by the inline script in layout.tsx, and after the
// splash finishes so client-side navigation back home doesn't replay it.
const SEEN_ATTRIBUTE = 'data-splash-seen';
const SEEN_STORAGE_KEY = 'splash-seen';

const subscribe = () => () => {};
const getSeen = () => document.documentElement.hasAttribute(SEEN_ATTRIBUTE);
const getServerSeen = () => false;

export default function SplashScreen() {
  const seen = useSyncExternalStore(subscribe, getSeen, getServerSeen);
  const [finished, setFinished] = useState(false);

  if (seen || finished) return null;

  return (
    <SplashAnimation
      onFinish={() => {
        sessionStorage.setItem(SEEN_STORAGE_KEY, '1');
        document.documentElement.setAttribute(SEEN_ATTRIBUTE, '');
        setFinished(true);
      }}
    />
  );
}

function SplashAnimation({ onFinish }: { onFinish: () => void }) {
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

  // When both are done, fade out
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
      data-splash
      className="fixed w-screen h-[100svh] inset-0 z-50 flex items-center justify-center bg-[#4E941A]/10 backdrop-blur-2xl transition-all duration-500"
    >
      <Lottie
        src={animationData}
        loop={false}
        autoplay
        subscriptions={{ complete: handleLottieComplete }}
        className="w-[80svw] md:w-[50svw] lg:w-[20svw] aspect-[9/16]"
      />
    </div>
  );
}
