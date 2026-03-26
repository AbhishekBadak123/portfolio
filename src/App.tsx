import React, { useEffect, useState } from 'react';
import AnimatedShaderHero, { ShaderBackgroundCanvas } from '@/components/ui/animated-shader-hero';
import profileImg from './assets/profile.jpg';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ThemeProvider from './contexts/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-black"
      >
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-orange-400 mb-4"></div>
          <div className="font-rajdhani text-xl text-offwhite">Initializing Portfolio...</div>
          <div className="mt-2 font-fira-code text-sm text-orange-400">Loading Systems...</div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden text-white bg-black">
        <div className="fixed inset-0 z-0">
          <ShaderBackgroundCanvas />
        </div>
        <Header />
        <main className="relative z-10">
          <AnimatedShaderHero
            className="bg-transparent"
            profileImage={profileImg}
            trustBadge={{
              text: 'Open to opportunities',
              icons: ['🚀'],
            }}
            headline={{
              line1: "Hi, I'm Abhishek",
              line2: 'DevOps & Cloud Engineer',
            }}
            subtitle="Building scalable systems with Docker, Kubernetes, CI/CD, and cloud infrastructure that can grow with modern teams."
            buttons={{
              primary: {
                text: 'Contact Me',
                onClick: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
              },
              secondary: {
                text: 'View GitHub',
                onClick: () => window.open('https://github.com/abhibadak', '_blank', 'noopener,noreferrer'),
              },
            }}
          />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
