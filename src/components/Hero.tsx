'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CanvaName = () => {
  const name = "MEET GAJERA";
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 mt-2 relative z-20">
      {name.split(' ').map((word, i) => (
        <div key={i} className="flex gap-[2px]">
          {word.split('').map((char, j) => (
            <span 
              key={j} 
              className="canva-3d-text text-5xl md:text-6xl" 
              data-text={char}
              style={{ zIndex: 50 - (i * 10 + j) }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Phase 2: The "Compile" Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Fade up badge and animate typography clip-path
      tl.to(badge.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      })
      .to(
        title.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'power4.inOut',
        },
        '-=0.6'
      )
      .to(
        subtitle.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.8'
      )
      .to(
        bgImageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.6'
      );

      // 2. Animate cards (Wireframe to Reality)
      tl.to(
        cardsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        '-=0.4'
      ).to(
        cardsRef.current,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderStyle: 'solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          duration: 1.5,
          stagger: 0.1,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );

      // Pulse animation for the badge dot
      gsap.to('.status-dot', {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Signature Movement & Rotation on Scroll
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          rotation: 360,
          y: 150, // Move down 150px
          x: 50,  // Drift slightly right 50px
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

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
    },
    { scope: container }
  );

  // Phase 3: The Interaction (3D Mouse Parallax)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      // Tilt the glass panels
      gsap.to(cardsRef.current, {
        rotationX: -y * 5,
        rotationY: x * 5,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center center',
      });

      // Offset main typography
      gsap.to([title.current, subtitle.current], {
        x: x * 15,
        y: y * 15,
        duration: 1,
        ease: 'power2.out',
      });
      
      // Slight offset for badge
      gsap.to(badge.current, {
        x: x * 5,
        y: y * 5,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={container} 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10 perspective-[1000px] w-full"
    >
      {/* Badge */}
      <div 
        ref={badge}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 opacity-0 translate-y-4"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 status-dot shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-xs font-mono text-emerald-400 tracking-[0.2em] uppercase font-semibold">SYSTEMS ONLINE</span>
      </div>

      {/* Main Typography */}
      <div className="max-w-4xl text-center z-10 relative pointer-events-none">
        <h1 
          ref={title}
          className="text-5xl md:text-7xl font-bold font-grotesk leading-[1.1] tracking-[-0.04em] mb-6"
          style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}
        >
          <span className="text-white/40">Great projects</span> <br className="hidden md:block" />
          <span className="text-white">
            come with great experience.
          </span>
        </h1>
        <p 
          ref={subtitle}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto opacity-0 translate-y-4"
        >
          Transforming complex wireframes into high-performance, cinematic realities. Engineering full-stack solutions that scale effortlessly.
        </p>
      </div>

      {/* Scroll Rotating & Moving Element */}
      <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 perspective-[1000px] z-0 pointer-events-none">
        <img 
          ref={bgImageRef}
          src="/element/Purple%20Modern%20Social%20Media%20Manager%20Email%20Signature.png"
          alt="Signature Element"
          className="w-48 md:w-64 h-auto pointer-events-none opacity-0 translate-y-4 origin-center"
        />
      </div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-20 z-20">
        
        {/* Card 1: About Me (Span 2) */}
        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="p-8 md:p-10 rounded-3xl flex flex-col items-start gap-6 transform-gpu opacity-0 translate-y-8 md:col-span-2 relative overflow-hidden group"
          style={{
            backgroundColor: 'transparent',
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
            borderWidth: '1px',
            borderStyle: 'dashed',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Corner Accent */}
          <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-white/30"></div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">Identify</span>
          </div>

          <CanvaName />

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-grotesk leading-tight">
            Engineering digital experiences through <br className="hidden md:block" /> precise full-stack architecture.
          </h3>
          
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-mono max-w-xl">
            I bridge the gap between complex backend logic and fluid, high-performance interfaces. Focused on scalable systems and cinematic user interactions.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-auto pt-4 w-full">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-[0.1em] font-semibold hover:bg-neutral-200 transition-colors"
            >
              Explore Project
            </a>
            <a 
              href="/" 
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-[0.1em] hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://google.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-[0.1em] hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <span>Mail</span>
            </a>
          </div>
        </div>

        {/* Column for Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:col-span-1">
          {/* Card 2: Experience */}
          <div
            ref={(el) => { cardsRef.current[1] = el; }}
            className="p-8 rounded-3xl flex flex-col justify-center items-center text-center gap-2 transform-gpu opacity-0 translate-y-8 relative overflow-hidden group"
            style={{
              backgroundColor: 'transparent',
              backdropFilter: 'blur(0px)',
              WebkitBackdropFilter: 'blur(0px)',
              borderWidth: '1px',
              borderStyle: 'dashed',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Corner Accent */}
            <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <h4 className="text-5xl font-bold text-white font-grotesk tracking-tighter">2</h4>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">Years Experience</span>
          </div>

          {/* Card 3: Projects */}
          <div
            ref={(el) => { cardsRef.current[2] = el; }}
            className="p-8 rounded-3xl flex flex-col justify-center items-center text-center gap-2 transform-gpu opacity-0 translate-y-8 relative overflow-hidden group"
            style={{
              backgroundColor: 'transparent',
              backdropFilter: 'blur(0px)',
              WebkitBackdropFilter: 'blur(0px)',
              borderWidth: '1px',
              borderStyle: 'dashed',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Corner Accent */}
            <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-30 mix-blend-screen" alt="Corner" />

            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <h4 className="text-5xl font-bold text-white font-grotesk tracking-tighter">7</h4>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">Projects Delivered</span>
          </div>
        </div>

      </div>
    </section>
  );
}
