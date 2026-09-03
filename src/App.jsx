import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { GallerySection } from './components/GallerySection';
import { YouTubePage } from './components/YouTubePage';
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
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#youtube') {
        setCurrentView('youtube');
      } else if (hash === '#celestialpixel') {
        setCurrentView('celestialpixel');
      } else {
        setCurrentView('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'youtube') window.location.hash = 'youtube';
    else if (view === 'celestialpixel') window.location.hash = 'celestialpixel';
    else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#ffffff] font-sans selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ScrollProgressBar />
      <Navbar currentView={currentView} onNavigate={navigateTo} />

      <main>
        <AnimatePresence mode="wait">
          {currentView === 'youtube' ? (
            <YouTubePage key="youtube" onBack={() => navigateTo('home')} />
          ) : currentView === 'celestialpixel' ? (
            <CelestialPixelPage key="celestialpixel" onBack={() => navigateTo('home')} />
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection />
              <WhatIDoSection />
              <GallerySection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
