import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

export const HeroSection = () => {
  const heroRef = useRef(null);

  /* Cursor tracking for subtle interactive parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 48, damping: 15 });
  const sy = useSpring(mouseY, { stiffness: 48, damping: 15 });

  const onMouseMove = (e) => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  /* Scroll-scrubbed exit transforms */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoScale  = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const videoOpacity= useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const textX = useTransform(sx, [-1, 1], [-8, 8]);
  const textYParallax = useTransform(sy, [-1, 1], [-6, 6]);

  const nameChars = Array.from('Bhushan Padghan');

  return (
    <section
      ref={heroRef}
      id="intro"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: '100vh', minHeight: 620, background: '#050505' }}
      onMouseMove={onMouseMove}
    >
      {/* ── SINGLE FULL-BLEED BACKGROUND VIDEO ── */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          src="/work/video/14522345_3840_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.play().catch(() => {});
            }
          }}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) contrast(1.05)' }}
        />
        {/* Dark Vignette Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 pointer-events-none" />
      </motion.div>

      {/* ══ CENTREPIECE TYPOGRAPHY ══ */}
      <div className="relative z-30 select-none flex flex-col items-center justify-center text-center px-4">
        <motion.div
          className="flex flex-col items-center text-center"
          style={{
            x: textX,
            y: useTransform([textYParallax, textY], ([p, s]) => p + s),
            opacity: textOpacity,
          }}
        >
          {/* Display Name */}
          <h1
            className="font-serif italic text-white leading-none whitespace-nowrap mb-6"
            style={{ fontSize: 'clamp(3.2rem, 8.5vw, 8rem)', fontWeight: 400, letterSpacing: '-0.01em' }}
            aria-label="Bhushan Padghan"
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: 'inline' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Role Subtitle */}
          <motion.p
            className="font-mono text-neutral-300 tracking-[0.32em] uppercase"
            style={{ fontSize: 'clamp(0.65rem, 1.15vw, 0.85rem)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          >
            FOUNDER&nbsp;&nbsp;•&nbsp;&nbsp;AI DEVELOPER&nbsp;&nbsp;•&nbsp;&nbsp;AI SPECIALIST
          </motion.p>
        </motion.div>
      </div>

      {/* ══ SCROLL DOWN CHEVRON ══ */}
      <motion.a
        href="#work"
        aria-label="Scroll down"
        className="absolute z-30 flex flex-col items-center gap-2 cursor-pointer"
        style={{ bottom: '2.2rem', left: 0, right: 0, margin: '0 auto', width: 'fit-content' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.span
          className="block"
          style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.35)' }}
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.svg
          width="14" height="8" viewBox="0 0 14 8" fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.a>
    </section>
  );
};
