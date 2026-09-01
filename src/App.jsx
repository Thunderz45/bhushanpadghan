import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhatIDoSection } from './components/WhatIDoSection';
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
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#ffffff] font-sans selection:bg-white selection:text-black">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <WhatIDoSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
