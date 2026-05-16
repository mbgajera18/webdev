'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<'idle' | 'compiling' | 'success'>('idle');

  useGSAP(
    () => {
      if (!formRef.current) return;
      
      const formGroups = gsap.utils.toArray('.form-group') as HTMLElement[];

      gsap.fromTo(
        formGroups,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );


    },
    { scope: container }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('compiling');
    
    // Simulate server action
    setTimeout(() => {
      setSubmitState('success');
      
      // Optional: Reset form after success
      setTimeout(() => {
        setSubmitState('idle');
        if (formRef.current) formRef.current.reset();
      }, 3000);
    }, 1500);
  };

  return (
    <section ref={container} className="relative w-full min-h-screen flex items-center py-32 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Typography */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-white/30"></div>
            <span className="font-mono text-sm tracking-[0.2em] uppercase text-white/50">Terminal</span>
          </div>
          <h2 className="text-7xl md:text-9xl font-bold font-grotesk tracking-[-0.05em] leading-[0.9] text-white mb-8">
            Initiate.
          </h2>
          <p className="text-neutral-400 font-sans leading-relaxed text-lg max-w-md">
            This terminal connects directly to a secure PostgreSQL ledger. 
            Initialize a new connection protocol to discuss architecture, infrastructure, or full-stack monolithic development.
          </p>
        </div>

        {/* Right Column: The Ledger Form */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10 relative z-10">
            
            {/* Name Input */}
            <div className="form-group flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Identifier</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white font-sans text-lg transition-colors duration-300 focus:border-white focus:outline-none placeholder-white/10"
                placeholder="Jane Doe"
              />
            </div>

            {/* Details Input */}
            <div className="form-group flex flex-col gap-2">
              <label htmlFor="details" className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Architecture / Project Details</label>
              <textarea 
                id="details" 
                rows={3}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white font-sans text-lg transition-colors duration-300 focus:border-white focus:outline-none placeholder-white/10 resize-none"
                placeholder="Describe the system requirements..."
              />
            </div>

            {/* Budget Radio Group */}
            <div className="form-group flex flex-col gap-4">
              <label className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Estimated Scope</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'].map((budget) => (
                  <label key={budget} className="cursor-pointer group relative">
                    <input type="radio" name="budget" value={budget} className="peer sr-only" required />
                    <div className="text-center py-3 px-2 md:px-4 rounded-lg border border-white/10 bg-black/40 font-mono text-xs text-white/60 transition-all duration-300 peer-checked:bg-white peer-checked:text-black peer-checked:border-white peer-hover:border-white/40">
                      {budget}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-group mt-2">
              <button 
                type="submit" 
                disabled={submitState !== 'idle'}
                className={`w-full py-5 px-8 rounded-xl font-mono text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 border ${
                  submitState === 'idle' 
                    ? 'bg-white text-black border-white hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]' 
                    : submitState === 'compiling'
                      ? 'bg-transparent text-white/50 border-white/20 cursor-wait'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {submitState === 'idle' && 'Commit to Ledger'}
                {submitState === 'compiling' && (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Compiling Request...
                  </>
                )}
                {submitState === 'success' && 'Ledger Updated'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
