import { useEffect } from 'react';
import { Navigation } from '@/app/components/Navigation';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Work } from '@/app/components/Work';
import { Experience } from '@/app/components/Experience';
import { Timeline } from '@/app/components/Timeline';
import { Contact } from '@/app/components/Contact';
import { CustomCursor } from '@/app/components/CustomCursor';
import logoGMImage from 'figma:asset/b54d78974c110fef9507accf0c693c69f4db8366.png';

export default function App() {
  useEffect(() => {
    // Set page title
    document.title = 'Gabriel Melão';
    
    // Set favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = logoGMImage;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  return (
    <div className="bg-black min-h-screen cursor-none">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Timeline />
      <Contact />
    </div>
  );
}
