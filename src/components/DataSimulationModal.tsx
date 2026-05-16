'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface DataSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataSimulationModal({ isOpen, onClose }: DataSimulationModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScene(1);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useGSAP(() => {
    if (!isOpen) return;

    const rainFast = gsap.fromTo('.rain-layer-fast', { yPercent: -50 }, { yPercent: 0, duration: 1.5, ease: 'none', repeat: -1 });
    const rainMedium = gsap.fromTo('.rain-layer-medium', { yPercent: -50 }, { yPercent: 0, duration: 3.5, ease: 'none', repeat: -1 });
    const rainSlow = gsap.fromTo('.rain-layer-slow', { yPercent: -50 }, { yPercent: 0, duration: 8, ease: 'none', repeat: -1 });

    if (scene === 1) {
      rainFast.timeScale(0.02);
      rainMedium.timeScale(0.02);
      rainSlow.timeScale(0.02);

      gsap.to([rainFast, rainMedium, rainSlow], {
        timeScale: 1,
        duration: 4,
        ease: 'power2.inOut'
      });
    } else if (scene === 2) {
      rainFast.timeScale(1);
      rainMedium.timeScale(1);
      rainSlow.timeScale(1);

      gsap.fromTo('.tanks-scene', 
        { opacity: 0 }, 
        { opacity: 1, duration: 2, ease: 'power2.out' }
      );
    }

  }, { scope: containerRef, dependencies: [isOpen, scene] });

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-[#050505] font-sans text-white">
      
      {/* 65% Info Area (Left) */}
      <div className="w-full md:w-[65%] h-[50vh] md:h-full relative flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-black/80 backdrop-blur-2xl z-10">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-px bg-emerald-500/50"></div>
          <span className="font-mono text-sm tracking-[0.2em] uppercase text-emerald-400">
            {scene === 1 ? 'System Status' : 'Architecture Sequence'}
          </span>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-grotesk tracking-[-0.02em] text-white mb-10 leading-[1.1]">
          {scene === 1 ? (
            <>Data Architecture <br className="hidden md:block" /> Simulation</>
          ) : (
            <>Reservoir <br className="hidden md:block" /> Collection</>
          )}
        </h2>
        
        <div className="max-w-xl p-8 rounded-2xl bg-white/[0.03] border border-white/10 shadow-2xl">
          {scene === 1 ? (
            <div className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed space-y-4">
              <p><span className="text-emerald-400 mr-3">&gt; Observation:</span> Massive influx of raw, unstructured data detected.</p>
              <p><span className="text-emerald-400 mr-3">&gt; Analysis:</span> The amateur builds an umbrella to deflect the noise. The architect builds a reservoir to capture the power.</p>
              <p><span className="text-yellow-400 mr-3">&gt; Critical Alert:</span> <span className="text-white/80">Terabytes of potential are currently bleeding into the void.</span></p>
              <div className="pt-4 mt-8 flex items-center justify-between border-t border-white/10">
                <p><span className="text-emerald-400 mr-3 animate-pulse">&gt; Action:</span> Awaiting architecture sequence.</p>
                <button 
                  onClick={() => setScene(2)}
                  className="px-6 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-mono text-xs uppercase tracking-wider transition-all"
                >
                  Construct Reservoir
                </button>
              </div>
            </div>
          ) : (
            <div className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed space-y-4">
              <p><span className="text-emerald-400 mr-3">&gt; Observation:</span> Reservoir active. Data streams stabilized.</p>
              <p><span className="text-emerald-400 mr-3">&gt; Analysis:</span> We are now storing and filtering high-value datasets for downstream processing.</p>
              <p><span className="text-emerald-400 mr-3">&gt; Status:</span> <span className="text-white/80">System optimal. Ready for distribution.</span></p>
              <div className="pt-4 mt-8 flex items-center justify-between border-t border-white/10">
                <p><span className="text-emerald-400 mr-3 animate-pulse">&gt; Action:</span> Harnessing power.</p>
                <button 
                  onClick={() => setScene(1)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white/50 border border-white/10 rounded-lg font-mono text-xs uppercase tracking-wider transition-all"
                >
                  Return to Ingestion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 35% Framed Rain Simulation Area (Right) */}
      <div className="w-full md:w-[35%] h-[50vh] md:h-full relative flex flex-col items-center justify-center p-6 md:p-12 border-t md:border-t-0 md:border-l border-white/10 bg-black/40">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white font-mono text-xs md:text-sm tracking-widest transition-colors z-50"
        >
          [CLOSE]
        </button>

        {/* The Frame */}
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-neutral-800/40 via-neutral-900/50 to-black rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {scene === 1 ? (
            <>
              {/* Parallax Rain Layers (GPU Accelerated & Gapless) */}
              
              {/* Foreground (Fast): Largest drops */}
              <div className="rain-layer-fast absolute top-0 left-0 w-full opacity-90 flex flex-col">
                <img src="/element/RAIN.svg" className="w-[150%] max-w-none -ml-[25%] h-[120vh] object-cover pointer-events-none" alt="" />
                <img src="/element/RAIN.svg" className="w-[150%] max-w-none -ml-[25%] h-[120vh] object-cover pointer-events-none" alt="" />
              </div>
              
              {/* Midground (Medium) */}
              <div className="rain-layer-medium absolute top-0 left-0 w-full opacity-60 flex flex-col">
                <img src="/element/RAIN.svg" className="w-[100%] h-[100vh] object-cover pointer-events-none" alt="" />
                <img src="/element/RAIN.svg" className="w-[100%] h-[100vh] object-cover pointer-events-none" alt="" />
              </div>
              
              {/* Background (Slow) */}
              <div className="rain-layer-slow absolute top-0 left-0 w-full opacity-40 flex flex-col">
                <img src="/element/RAIN.svg" className="w-[80%] h-[80vh] object-cover pointer-events-none" alt="" />
                <img src="/element/RAIN.svg" className="w-[80%] h-[80vh] object-cover pointer-events-none" alt="" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 tanks-scene opacity-0">
              {/* Top Half: Angled Rain */}
              <div className="absolute top-0 left-0 w-full h-[55%] overflow-hidden border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] scale-50">
                  <div className="rain-layer-fast absolute top-0 left-0 w-full opacity-90 flex flex-col">
                    <img src="/element/RAIN.svg" className="w-full h-[120vh] object-cover pointer-events-none" alt="" />
                    <img src="/element/RAIN.svg" className="w-full h-[120vh] object-cover pointer-events-none" alt="" />
                  </div>
                  <div className="rain-layer-medium absolute top-0 left-0 w-full opacity-60 flex flex-col">
                    <img src="/element/RAIN.svg" className="w-full h-[100vh] object-cover pointer-events-none" alt="" />
                    <img src="/element/RAIN.svg" className="w-full h-[100vh] object-cover pointer-events-none" alt="" />
                  </div>
                  <div className="rain-layer-slow absolute top-0 left-0 w-full opacity-40 flex flex-col">
                    <img src="/element/RAIN.svg" className="w-full h-[80vh] object-cover pointer-events-none" alt="" />
                    <img src="/element/RAIN.svg" className="w-full h-[80vh] object-cover pointer-events-none" alt="" />
                  </div>
                </div>
              </div>
              
              {/* Bottom Half: Tanks */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex items-end justify-center z-10 pointer-events-none">
                <img src="/element/TANKS.svg" className="w-[200%] md:w-[250%] max-w-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" alt="Data Tanks" />
              </div>
            </div>
          )}
          
          {/* Edge blending vignette within the frame */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] pointer-events-none" />
        </div>
      </div>
      
    </div>
  );
}
