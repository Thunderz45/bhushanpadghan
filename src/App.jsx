import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { WorkSection } from './components/WorkSection';
import { CelestialPixelPage } from './components/CelestialPixelPage';
import { Footer } from './components/Footer';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'rgba(255,255,255,0.85)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 200,
      }}
    />
  );
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('home'); // 'home' | 'celestial-pixel'

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#celestial-pixel') {
        setActivePage('celestial-pixel');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectProject = (projectId) => {
    if (projectId === 'celestial-pixel') {
      window.location.hash = 'celestial-pixel';
      setActivePage('celestial-pixel');
    }
  };

  const handleBackToWork = () => {
    window.location.hash = 'work-page';
    setActivePage('home');
    setTimeout(() => {
      const el = document.getElementById('work-page');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#ffffff] font-sans selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ScrollProgressBar />

      {activePage === 'celestial-pixel' ? (
        <CelestialPixelPage onBack={handleBackToWork} />
      ) : (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <WhatIDoSection />
            <WorkSection onSelectProject={handleSelectProject} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
