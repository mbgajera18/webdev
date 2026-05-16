'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    // Wait for everything (images, SVG, fonts) to be ready before removing the loader
    const handleLoad = () => {
      // Artificial delay to allow GSAP models and DOM to settle and give a premium feel
      setTimeout(() => {
        gsap.to('.initial-loader', {
          yPercent: -100, // Slide up to reveal site
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = '';
          }
        });
      }, 1800); // 1.8s delay to simulate system initialization
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="initial-loader fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center border-b border-emerald-500/20">
      <div className="relative flex flex-col items-center w-full max-w-xs px-8">
        {/* Animated Bracket Box */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-8">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
          
          <div className="w-8 h-8 border border-white/20 border-t-emerald-400 rounded-full animate-spin"></div>
        </div>
        
        {/* Text Details */}
        <div className="font-mono text-emerald-400 tracking-[0.3em] uppercase text-xs text-center w-full relative">
          <span className="animate-pulse">System Boot Sequence</span>
          <div className="mt-4 flex items-center justify-between text-[9px] text-white/40 tracking-wider">
            <span>MEM: OPTIMAL</span>
            <span>DATA: CACHED</span>
          </div>
        </div>
        
        {/* Progress Line */}
        <div className="mt-4 w-full h-px bg-white/10 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-emerald-500 w-full translate-x-[-100%] animate-[loader-progress_1.8s_ease-out_forwards]"></div>
        </div>
      </div>
    </div>
  );
}
