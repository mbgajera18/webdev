import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
