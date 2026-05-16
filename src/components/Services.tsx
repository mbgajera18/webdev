'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DataSimulationModal from './DataSimulationModal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  useGSAP(
    () => {
      const boxes = boxesRef.current.filter(Boolean);

      gsap.fromTo(
        boxes,
        { 
          scale: 0.8, 
          opacity: 0, 
          y: 60,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          duration: 0.8,
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );


      gsap.to('.corner-accent', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      const coins = gsap.utils.toArray('.coin-element');
      coins.forEach((coin: any, index) => {
        if (boxes[index]) {
          gsap.fromTo(coin, 
            { y: 200 },
            {
              y: -200,
              ease: 'none',
              scrollTrigger: {
                trigger: boxes[index], // Trigger animation specifically when this card enters
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative w-full py-32 md:py-48 z-10 overflow-hidden -mt-[10vh] md:-mt-[20vh]">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-white/30"></div>
          <span className="font-mono text-sm tracking-[0.2em] uppercase text-white/50">Capabilities</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold font-grotesk tracking-[-0.04em] leading-[1.1] text-white">
          Engineering <br />
          <span className="text-white/40">Arsenal.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 max-w-7xl mx-auto px-6">
        {/* Block 1 (Large - Span 2 cols, 2 rows) */}
        <div 
          ref={(el) => { boxesRef.current[0] = el; }}
          className="glass-panel rounded-3xl p-8 md:p-12 md:col-span-2 md:row-span-2 flex flex-col justify-end min-h-[300px] md:min-h-[400px] relative overflow-hidden group"
        >
          {/* Corner Accent */}
          <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

          {/* Floating Coin Element */}
          <div className="absolute top-[10%] right-[10%] w-32 h-32 md:w-48 md:h-48 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <img src="/element/COIN.svg" className="w-full h-full object-contain coin-element" alt="Coin" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-4 block">Architecture</span>
            <h3 className="text-3xl md:text-4xl font-bold font-grotesk tracking-tight text-white mb-4">
              Monolithic Edge Topologies.
            </h3>
            <p className="text-white/50 font-sans leading-relaxed text-base md:text-lg">
              Architecting unified Next.js environments. Balancing heavy server-side logic with optimized static delivery to eliminate latency in complex application states.
            </p>
          </div>
        </div>

        {/* Block 2 (Medium - Span 2 cols, 1 row) */}
        <div 
          ref={(el) => { boxesRef.current[1] = el; }}
          className="glass-panel rounded-3xl p-8 md:p-10 md:col-span-2 md:row-span-1 flex flex-col justify-center relative overflow-hidden group"
        >
          {/* Corner Accent */}
          <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

          {/* Floating Coin Element */}
          <div className="absolute top-[10%] right-[10%] w-32 h-32 md:w-48 md:h-48 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <img src="/element/COIN.svg" className="w-full h-full object-contain coin-element" alt="Coin" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
             <span className="font-mono text-xs uppercase tracking-[0.2em] text-blue-400/80 mb-3 block">Database</span>
             <h3 className="text-2xl font-bold font-grotesk tracking-tight text-white mb-2">
               Immutable Ledger Schemas.
             </h3>
             <p className="text-white/50 font-sans leading-relaxed text-sm md:text-base">
               Designing strict, high-concurrency PostgreSQL databases. Built specifically for financial transactions, rigid order tracking, and zero-fault data integrity.
             </p>
             <div className="mt-8 pt-4 border-t border-white/5">
               <button onClick={() => setIsDataModalOpen(true)} className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                 Simulate Data Architecture
                 <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </button>
             </div>
          </div>
        </div>

        {/* Block 3 (Medium - Span 2 cols, 1 row) */}
        <div 
          ref={(el) => { boxesRef.current[2] = el; }}
          className="glass-panel rounded-3xl p-8 md:p-10 md:col-span-2 md:row-span-1 flex flex-col justify-center relative overflow-hidden group"
        >
          {/* Corner Accent */}
          <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

          {/* Floating Coin Element */}
          <div className="absolute top-[10%] right-[10%] w-32 h-32 md:w-48 md:h-48 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <img src="/element/COIN.svg" className="w-full h-full object-contain coin-element" alt="Coin" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400/80 mb-3 block">Systems</span>
            <h3 className="text-2xl font-bold font-grotesk tracking-tight text-white mb-2">
              Low-Level Protocol Bridging.
            </h3>
            <p className="text-white/50 font-sans leading-relaxed text-sm md:text-base">
              Bypassing standard browser limitations. Developing offline-first local servers and utilizing native Electron layers for direct ESC/POS thermal printing communication.
            </p>
          </div>
        </div>

        {/* Block 4 (Wide - Span 4 cols, 1 row) */}
        <div 
          ref={(el) => { boxesRef.current[3] = el; }}
          className="glass-panel rounded-3xl p-8 md:p-12 md:col-span-4 md:row-span-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden group"
        >
          {/* Corner Accent */}
          <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

          {/* Floating Coin Element */}
          <div className="absolute top-[10%] right-[10%] w-32 h-32 md:w-48 md:h-48 z-0 pointer-events-none opacity-40 mix-blend-screen">
            <img src="/element/COIN.svg" className="w-full h-full object-contain coin-element" alt="Coin" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 max-w-3xl">
             <span className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400/80 mb-3 block">Frontend</span>
             <h3 className="text-2xl md:text-3xl font-bold font-grotesk tracking-tight text-white mb-3">
               Hardware-Accelerated Sequencing.
             </h3>
             <p className="text-white/50 font-sans leading-relaxed text-base">
               Achieving cinematic interface physics without the overhead of WebGL. Strictly utilizing pure DOM manipulation, CSS refractions, and complex GSAP timelines.
             </p>
             <div className="mt-8 pt-4 border-t border-white/5">
               <button className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                 Simulate UX Physics
                 <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </button>
             </div>
          </div>
          <div className="relative z-10 flex gap-3 flex-wrap">
            <span className="px-4 py-2 rounded-full border border-white/10 bg-black/40 font-mono text-xs text-white/80">GSAP</span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-black/40 font-mono text-xs text-white/80">ScrollTrigger</span>
            <span className="px-4 py-2 rounded-full border border-white/10 bg-black/40 font-mono text-xs text-white/80">Tailwind CSS</span>
          </div>
        </div>

      </div>

      <DataSimulationModal isOpen={isDataModalOpen} onClose={() => setIsDataModalOpen(false)} />
    </section>
  );
}
