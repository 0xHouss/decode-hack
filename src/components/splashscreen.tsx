'use client';

import animationData from '@/../public/splash.json';
import { cn } from '@/lib/utils';
import { Lottie } from 'lottie-react';
import { useEffect, useState, useSyncExternalStore } from 'react';

// Set before first paint by the inline script in layout.tsx, and after the
// splash finishes so client-side navigation back home doesn't replay it.
const SEEN_ATTRIBUTE = 'data-splash-seen';
const SEEN_STORAGE_KEY = 'splash-seen';

const subscribe = () => () => {};
const getSeen = () => document.documentElement.hasAttribute(SEEN_ATTRIBUTE);
const getServerSeen = () => false;

const subscribeToLoad = (onLoad: () => void) => {
  window.addEventListener('load', onLoad);
  return () => window.removeEventListener('load', onLoad);
};
const getLoaded = () => document.readyState === 'complete';
const getServerLoaded = () => false;

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
  const resourcesLoaded = useSyncExternalStore(subscribeToLoad, getLoaded, getServerLoaded);

  // Fade out once the animation has played and the page has loaded. The page's
  // entrance animations start at the same time (see globals.css), so they play
  // underneath the fade instead of after it.
  const leaving = animationDone && resourcesLoaded;

  useEffect(() => {
    if (!leaving) return;
    const timeout = setTimeout(onFinish, 500); // Matches the fade's duration
    return () => clearTimeout(timeout);
  }, [leaving, onFinish]);

  return (
    <div
      data-splash
      data-leaving={leaving || undefined}
      className={cn(
        'fixed w-screen h-[100svh] inset-0 z-50 flex items-center justify-center bg-leaf/10 backdrop-blur-2xl transition-all duration-500',
        leaving && 'opacity-0',
      )}
    >
      <Lottie
        src={animationData}
        loop={false}
        autoplay
        subscriptions={{ complete: () => setAnimationDone(true) }}
        className="w-[80svw] md:w-[50svw] lg:w-[20svw] aspect-[9/16]"
      />
    </div>
  );
}
