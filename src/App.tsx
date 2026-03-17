import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnimatedShaderHero from '@/components/ui/animated-shader-hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackgroundEffects from './components/BackgroundEffects';
import ThemeProvider from './contexts/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for enhanced UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mb-4"></div>
          <div className="text-white font-rajdhani text-xl">Initializing Portfolio...</div>
          <div className="text-cyan-400 font-fira-code text-sm mt-2">Loading DevOps Matrix...</div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-white overflow-x-hidden">
        <BackgroundEffects />
        <Header />
        <main className="relative z-10">
          <AnimatedShaderHero
            trustBadge={{
              text: 'Open to opportunities',
              icons: ['🚀'],
            }}
            headline={{
              line1: "Hi, I'm Abhishek",
              line2: 'DevOps & Cloud Engineer',
            }}
            subtitle="Building scalable systems with Docker, Kubernetes and cloud infrastructure."
            buttons={{
              primary: {
                text: 'Download Resume',
                onClick: () => window.open('#contact', '_self'),
              },
              secondary: {
                text: 'View GitHub',
                onClick: () => window.open('https://github.com/abhibadak', '_blank'),
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