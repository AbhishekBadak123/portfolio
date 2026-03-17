import React, { useEffect, useState } from 'react';
import About from './components/About';
import BackgroundEffects from './components/BackgroundEffects';
import Contact from './components/Contact';
import Header from './components/Header';
import Hero from './components/Hero';
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
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            'radial-gradient(800px 600px at 20% 20%, rgba(255,72,185,0.15), transparent 60%), radial-gradient(900px 700px at 80% 0%, rgba(18,206,106,0.12), transparent 60%), linear-gradient(180deg, #12071F 0%, #0B0615 100%)',
        }}
      >
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-candy-pink mb-4"></div>
          <div className="font-rajdhani text-xl text-offwhite">Initializing Portfolio...</div>
          <div className="mt-2 font-fira-code text-sm text-candy-pink">Loading Neon Candy...</div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div
        className="min-h-screen overflow-x-hidden text-white"
        style={{
          background:
            'radial-gradient(1200px 800px at 10% 0%, rgba(255,72,185,0.15), transparent 60%), radial-gradient(1000px 700px at 90% -10%, rgba(18,206,106,0.10), transparent 60%), linear-gradient(180deg, #12071F 0%, #0B0615 100%)',
        }}
      >
        <BackgroundEffects />
        <Header />
        <main className="relative z-10">
          <Hero />
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
