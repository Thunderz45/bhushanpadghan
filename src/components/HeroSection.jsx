import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Youtube, Linkedin, Github, Instagram } from 'lucide-react';

const BACKGROUND_VIDEOS = [
  '/work/video/15254965_1920_1080_24fps.mp4',
  '/work/video/14360605_compressed.mp4',
];

const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@bhushanpadghan9647',
    icon: Youtube,
    color: '#FF0000', // YouTube Official Red
    glow: 'rgba(255, 0, 0, 0.6)',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/bhushan-padghan-049772284/',
    icon: Linkedin,
    color: '#0A66C2', // LinkedIn Official Blue
    glow: 'rgba(10, 102, 194, 0.6)',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Thunderz45',
    icon: Github,
    color: '#FFFFFF', // GitHub Pure White
    glow: 'rgba(255, 255, 255, 0.6)',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bhushanpatil_045/',
    icon: Instagram,
    color: '#E4405F', // Instagram Brand Magenta/Pink
    glow: 'rgba(228, 64, 95, 0.6)',
  },
];

export const HeroSection = () => {
  const heroRef = useRef(null);
  const [videoIdx, setVideoIdx] = useState(0);

  /* Advance to next background video when current video ends */
  const handleVideoEnded = () => {
    setVideoIdx((prev) => (prev + 1) % BACKGROUND_VIDEOS.length);
  };

  /* Silky smooth cursor tracking physics */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 35, damping: 20 });

  const onMouseMove = (e) => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  /* Scroll-scrubbed Parallax Transforms */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  /* Background Video Parallax Depth & Scale */
  const videoY       = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const videoScale   = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0]);

  /* Typography Parallax Float & Fade */
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 0.9, 0]);
  const textYScroll = useTransform(scrollYProgress, [0, 1], [0, -85]);

  const textXParallax = useTransform(sx, [-1, 1], [-12, 12]);
  const textYParallax = useTransform(sy, [-1, 1], [-10, 10]);

  const nameChars = Array.from('Bhushan Padghan');

  return (
    <section
      ref={heroRef}
      id="intro"
      className="relative w-full overflow-hidden flex items-center justify-center bg-[#050505]"
      style={{ height: '100vh', minHeight: 620 }}
      onMouseMove={onMouseMove}
    >
      {/* ── 3-VIDEO SEQUENTIAL BACKGROUND LOOP ── */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: videoY, scale: videoScale, opacity: videoOpacity }}
      >
        <AnimatePresence mode="wait">
          <motion.video
            key={BACKGROUND_VIDEOS[videoIdx]}
            src={BACKGROUND_VIDEOS[videoIdx]}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.85) contrast(1.05)' }}
          />
        </AnimatePresence>

        {/* 50% Black Overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />
        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
      </motion.div>

      {/* ══ CENTREPIECE TYPOGRAPHY & SOCIAL CONNECT ══ */}
      <div className="relative z-30 select-none flex flex-col items-center justify-center text-center px-4">
        <motion.div
          className="flex flex-col items-center text-center"
          style={{
            x: textXParallax,
            y: useTransform([textYParallax, textYScroll], ([p, s]) => p + s),
            opacity: textOpacity,
          }}
        >
          {/* Display Name */}
          <h1
            className="font-serif italic text-white leading-tight sm:leading-none tracking-tight mb-4 sm:mb-6 drop-shadow-2xl font-normal"
            style={{ fontSize: 'clamp(2.4rem, 8.5vw, 8rem)', letterSpacing: '-0.01em' }}
            aria-label="Bhushan Padghan"
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          {/* Role Subtitle */}
          <motion.p
            className="font-mono text-neutral-200 tracking-[0.16em] sm:tracking-[0.32em] uppercase mb-6 sm:mb-7 drop-shadow-md text-[10px] sm:text-xs text-center flex flex-wrap justify-center items-center gap-1 sm:gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          >
            <span>FOUNDER</span>
            <span className="text-white/40">•</span>
            <span>AI DEVELOPER</span>
            <span className="text-white/40">•</span>
            <span>AI SPECIALIST</span>
          </motion.p>

          {/* Original Full Color Social Logos Bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
            className="flex items-center justify-center gap-4 sm:gap-7 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl"
          >
            {SOCIAL_LINKS.map(({ name, url, icon: Icon, color, glow }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group relative flex items-center justify-center p-1.5 rounded-full transition-transform duration-300 hover:scale-125"
              >
                <Icon
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300"
                  style={{
                    color: color,
                    filter: `drop-shadow(0 0 8px ${glow})`,
                  }}
                />
                {/* Tooltip */}
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest bg-black/90 text-white px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/20 shadow-md">
                  {name}
                </span>
              </a>
            ))}
          </motion.div>

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
          style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.45)' }}
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.svg
          width="14" height="8" viewBox="0 0 14 8" fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.a>
    </section>
  );
};
