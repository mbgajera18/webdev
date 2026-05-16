'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  id: number;
  title: string;
  subtitle: string;
  tech: string[];
  focus: string;
  color: string;
  details: React.ReactNode;
  infographic?: React.ReactNode;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'GetPills',
    subtitle: 'On-Demand Medicine Delivery Platform',
    tech: ['Vite', 'TypeScript', 'PostgreSQL', 'Prisma', 'Razorpay', 'Firebase'],
    focus: 'Hyper-local search, real-time price comparison, and seamless order management.',
    color: 'from-emerald-500/20 to-transparent',
    details: 'GetPills is an on-demand medicine delivery platform that operates similarly to Zomato or Swiggy, specifically for pharmaceutical products. Customers can submit medicine requests, instantly compare prices across nearby medical stores, and place orders. The platform incorporates Firebase for secure mobile OTP and email verification. It features Razorpay payment integration to support a subscription-based model. It also introduces an innovative QR billing system: when a medical agency generates a bill, the local medical store can quick-scan the QR code to automatically parse items and instantly update their local inventory stock. The frontend is built with vanilla Vite and TypeScript, while the backend relies heavily on PostgreSQL and Prisma for rapid, location-based queries and real-time order processing.',
    infographic: (
      <div className="mt-8">
        <h4 className="font-mono text-xl uppercase tracking-[0.1em] text-white/80 mb-6 font-bold">Frameworks & Libraries</h4>
        <div className="flex flex-wrap gap-4 md:gap-6 mb-12">
          {[
            { id: 'vite', name: 'Vite' },
            { id: 'typescript', name: 'TypeScript' },
            { id: 'postgresql', name: 'PostgreSQL' },
            { id: 'prisma', name: 'Prisma' },
            { id: 'razorpay', name: 'Razorpay' },
            { id: 'firebase', name: 'Firebase' },
            { id: 'tailwindcss', name: 'Tailwind' }
          ].map(icon => (
            <div key={icon.id} className="group relative flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                <img src={`https://cdn.simpleicons.org/${icon.id}/white`} alt={icon.name} className="w-7 h-7 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-emerald-400 transition-colors">
                {icon.name}
              </span>
            </div>
          ))}
        </div>

        <h4 className="font-mono text-xl uppercase tracking-[0.1em] text-white/80 mb-6 font-bold">What is GetPills</h4>
        <div style={{ position: 'relative', width: '100%', height: 0, paddingTop: '250.0000%', paddingBottom: 0, boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', borderRadius: '8px', willChange: 'transform' }}>
          <iframe loading="lazy" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
            src="https://www.canva.com/design/DAHJngima3Y/X-Ql8ypyY-ZfvobBQLSvHg/view?embed" allowFullScreen allow="fullscreen">
          </iframe>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'rbilling',
    subtitle: 'Local Point-of-Sale (POS) System',
    tech: ['Electron', 'Node.js', 'React + Vite', 'TypeScript', 'PostgreSQL', 'Python', 'Android Studio', 'AWS', 'Firebase', 'Razorpay'],
    focus: 'Low-level hardware integration, ESC/POS thermal printing logic, and offline-first local server capabilities.',
    color: 'from-blue-500/20 to-transparent',
    details: (
      <div className="space-y-4">
        <p>rbilling is a specialized Point-of-Sale solution built to operate seamlessly without internet dependency. Utilizing Electron and Node.js, it acts as a local server that handles direct communication with peripheral hardware, including barcode scanners and thermal receipt printers via raw ESC/POS commands. The React frontend provides a lightning-fast, intuitive interface for cashiers, ensuring maximum throughput during peak hours.</p>
        <ul className="list-disc pl-5 space-y-2 mt-4 text-white/80">
          <li>Engineered a system that runs completely offline.</li>
          <li>0 errors while taking orders.</li>
          <li>Achieved very low maintenance cost of server.</li>
          <li>Utilized Python FastAPI for high-performance server APIs.</li>
          <li>Implemented a request pool architecture for optimized performance.</li>
        </ul>
      </div>
    ),
    infographic: (
      <div className="mt-8">
        <div className="flex flex-wrap gap-4 md:gap-6 mb-12">
          {[
            { id: 'electron', name: 'Electron' },
            { id: 'nodedotjs', name: 'Node.js' },
            { id: 'react', name: 'React' },
            { id: 'vite', name: 'Vite' },
            { id: 'typescript', name: 'TypeScript' },
            { id: 'postgresql', name: 'PostgreSQL' },
            { id: 'python', name: 'Python' },
            { id: 'androidstudio', name: 'Android Studio' },
            { id: 'aws', name: 'AWS' },
            { id: 'firebase', name: 'Firebase' },
            { id: 'razorpay', name: 'Razorpay' }
          ].map(icon => (
            <div key={icon.id} className="group relative flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                {icon.id === 'aws' ? (
                  <span className="font-bold text-white/80 text-sm tracking-wider group-hover:text-white transition-colors">AWS</span>
                ) : (
                  <img src={`https://cdn.simpleicons.org/${icon.id}/white`} alt={icon.name} className="w-7 h-7 md:w-8 md:h-8 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-blue-400 transition-colors">
                {icon.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-4 rounded-lg overflow-hidden shadow-lg border border-white/10">
          <img 
            src="/element/Rbilling/restorentSvg.svg" 
            alt="System Architecture & Outline" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Logicwave Infotech',
    subtitle: 'High-End Agency Platform',
    tech: ['React', 'GSAP', 'Tailwind'],
    focus: 'High-performance front-end architecture and fluid UX.',
    color: 'from-purple-500/20 to-transparent',
    details: 'This project represents the digital storefront for Logicwave Infotech, a premium development agency. The core focus was on creating a memorable, cinematic user experience. By leveraging GSAP for complex timeline animations and Tailwind CSS for rapid, scalable styling, the platform delivers fluid transitions and micro-interactions that communicate technical excellence and high-end brand positioning.'
  },
  {
    id: 4,
    title: 'Project Alpha',
    subtitle: 'Enterprise Resource Planning (ERP)',
    tech: ['Next.js', 'Tailwind', 'PostgreSQL'],
    focus: 'Scalable cloud infrastructure and complex state management.',
    color: 'from-orange-500/20 to-transparent',
    details: 'Project Alpha is a custom ERP system built for manufacturing workflows. It features a highly modular architecture that allows different departments (HR, Inventory, Finance) to operate within unified data silos. The focus was on creating a deeply scalable cloud infrastructure capable of processing thousands of concurrent transactions without UI latency.'
  },
  {
    id: 5,
    title: 'Nexus Data Stream',
    subtitle: 'Real-Time Analytics Dashboard',
    tech: ['React', 'WebSockets', 'D3.js'],
    focus: 'High-frequency data processing and dynamic visualizations.',
    color: 'from-cyan-500/20 to-transparent',
    details: 'Nexus Data Stream ingests high-frequency data via WebSockets and visualizes it in real-time. Designed for financial analysts, it utilizes D3.js and WebGL to render complex charts at 60fps. The frontend state management is hyper-optimized to prevent unnecessary re-renders when parsing massive incoming data streams.'
  },
  {
    id: 6,
    title: 'Quantum Ledger',
    subtitle: 'Decentralized Finance Tracker',
    tech: ['Next.js', 'Ethers.js', 'Tailwind'],
    focus: 'Blockchain integration and secure cryptographic verification.',
    color: 'from-rose-500/20 to-transparent',
    details: 'Quantum Ledger provides users with a comprehensive overview of their decentralized assets across multiple chains. It integrates deeply with Web3 protocols using Ethers.js, focusing heavily on secure cryptographic verification, robust error handling for failed transactions, and an uncompromising approach to user data privacy.'
  },
  {
    id: 7,
    title: 'AeroSync',
    subtitle: 'Logistics Management Fleet',
    tech: ['React Native', 'Node.js', 'MongoDB'],
    focus: 'Geolocation tracking and offline mobile synchronization.',
    color: 'from-yellow-500/20 to-transparent',
    details: 'AeroSync is a cross-platform mobile application utilized by delivery fleets. Its primary feature is an offline-first synchronization engine that caches geolocation routes and delivery signatures locally, reconciling them with the central MongoDB server once connectivity is restored, ensuring zero data loss in low-signal areas.'
  }
];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const shipPos = useRef({ x: -1000, y: -1000 });

  useGSAP(
    () => {
      // Stacking effect for cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top 40%',
          end: 'bottom 40%',
          onEnter: () => setActiveCardIndex(index),
          onEnterBack: () => setActiveCardIndex(index),
        });

        // We don't scale the last card
        if (index === cardsRef.current.length - 1) return;

        gsap.to(card, {
          scale: 0.95,
          opacity: 0.5,
          scrollTrigger: {
            trigger: card,
            start: 'top 15%',
            end: 'bottom 15%',
            scrub: true,
          },
        });
      });

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

      // Continuous circular floating effect for the hand
      // Anchors the fingertip (left center) while the wrist moves in a circle
      gsap.to('.spaceship-fly', {
        rotation: 360,
        duration: 6,
        repeat: -1,
        ease: 'linear',
        transformOrigin: '15% 30%' // Assuming fingertip is top-leftish
      });

    },
    { scope: container }
  );

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Overscreen Spaceship Tracking Logic
  useEffect(() => {
    let rafId: number;

    const updatePosition = () => {
      const activeButton = document.getElementById(`project-btn-${activeCardIndex}`);
      const shipContainer = document.getElementById('global-spaceship-container');
      
      if (activeButton && shipContainer) {
        const rect = activeButton.getBoundingClientRect();
        const targetX = rect.right + 40; // Offset to the right of the button
        const targetY = rect.top + rect.height / 2;

        // Snap on first frame
        if (shipPos.current.x === -1000) {
          shipPos.current.x = targetX;
          shipPos.current.y = targetY;
        }

        // Smooth lerping to target
        shipPos.current.x += (targetX - shipPos.current.x) * 0.15;
        shipPos.current.y += (targetY - shipPos.current.y) * 0.15;

        shipContainer.style.transform = `translate(${shipPos.current.x}px, ${shipPos.current.y}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();
    return () => cancelAnimationFrame(rafId);
  }, [activeCardIndex]);

  // Modal Animation Logic
  useGSAP(() => {
    if (selectedProject) {
      gsap.fromTo('.modal-content', 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo('.modal-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [selectedProject]);

  const closeModal = () => {
    gsap.to('.modal-content', { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in' });
    gsap.to('.modal-overlay', { opacity: 0, duration: 0.3, onComplete: () => setSelectedProject(null) });
  };

  return (
    <>
      <section id="projects" ref={container} className="relative w-full max-w-7xl mx-auto px-6 py-32 md:py-48 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start relative">
          
          {/* Left Column: Pinned Title */}
          <div className="col-span-1 lg:sticky lg:top-[15vh] z-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-white/30"></div>
                <span className="font-mono text-sm tracking-[0.2em] uppercase text-white/50">Case Studies</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold font-grotesk tracking-[-0.04em] leading-[1.1] text-white">
                Deployed <br />
                <span className="text-white/40">Architecture.</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Stacking Cards */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-[10vh] pb-[10vh]">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="glass-panel rounded-3xl p-8 md:p-12 sticky top-[15vh] transform-origin-top shadow-2xl relative overflow-hidden flex flex-col"
                style={{ zIndex: idx }}
              >
                {/* Corner Accent Image */}
                <img src="/element/caedCornerTopLeft.png" className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-48 h-48 corner-accent pointer-events-none z-0 opacity-40 mix-blend-screen" alt="Corner" />
                
                {/* Background Gradient Glow */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.color} opacity-30 pointer-events-none`}></div>
                
                <div className="relative z-10 flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold font-grotesk tracking-tight text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-neutral-400 mb-8 tracking-tight text-sm md:text-base">
                    {project.subtitle}
                  </p>

                  <div className="mb-8">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Core Tech Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="px-4 py-2 rounded-full border border-white/10 bg-black/40 font-mono text-xs text-white/80 tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Execution Focus</h4>
                    <p className="text-neutral-300 font-sans leading-relaxed">
                      {project.focus}
                    </p>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
                  <button 
                    id={`project-btn-${idx}`}
                    onClick={() => setSelectedProject(project)}
                    className="group relative inline-flex items-center gap-3 text-white font-mono text-sm tracking-[0.1em] uppercase hover:text-emerald-400 transition-colors"
                  >
                    <span className="w-8 h-px bg-white/30 group-hover:bg-emerald-400 group-hover:w-12 transition-all duration-300"></span>
                    <span>View Full Brief</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Overscreen Spaceship/Hand */}
      <div 
        id="global-spaceship-container"
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-50 transition-opacity duration-500"
        style={{ opacity: shipPos.current.x === -1000 ? 0 : 1 }}
      >
        <img src="/element/HAND.svg" className="w-full h-full object-contain spaceship-fly mix-blend-screen" alt="Hand" />
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm modal-overlay"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-3xl glass-panel rounded-3xl p-8 md:p-12 overflow-y-auto overflow-x-hidden max-h-[90vh] shadow-2xl modal-content border border-white/10 bg-[#0a0a0a]/90"
            data-lenis-prevent
          >
            {/* Dynamic Glow Based on Project Color */}
            <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${selectedProject.color} rounded-full blur-[100px] opacity-40 pointer-events-none`}></div>
            
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-20"
            >
              ✕
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-white/30"></div>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">Project Brief</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold font-grotesk tracking-tight text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-emerald-400 mb-8 tracking-tight text-sm md:text-base">
                {selectedProject.subtitle}
              </p>

              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Core Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 font-mono text-xs text-white/80 tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Execution Focus</h4>
                  <p className="text-white/90 font-sans leading-relaxed text-lg">
                    {selectedProject.focus}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Architecture & Details</h4>
                  <div className="text-neutral-400 font-sans leading-relaxed text-base md:text-lg">
                    {selectedProject.details}
                  </div>
                </div>
                {selectedProject.infographic && (
                  <div>
                    {selectedProject.infographic}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
