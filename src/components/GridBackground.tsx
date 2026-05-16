'use client';

import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        gridRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        gridRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        // Initialize mask off-screen or center before first move
        maskImage: 'radial-gradient(circle 400px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle 400px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 100%)',
      }}
    />
  );
}
