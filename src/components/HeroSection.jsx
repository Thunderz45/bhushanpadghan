import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

/* ─────────────────────────────────────────────
   TILE DEFINITIONS — match reference screenshot
───────────────────────────────────────────── */
const TILES = [
  /* 1 – Top-left portrait */
  { id: 't1', type: 'image', src: '/work/video/pexels-palefire-11447031.jpg',
    pos: { top: '0', left: '0', w: '22%', h: '38%' }, depth: 16, drift: -60 },

  /* 2 – Center-top portrait (behind the name text) */
  { id: 't2', type: 'video', src: '/work/video/14188177_2160_3840_25fps.mp4',
    pos: { top: '0', left: '33%', w: '18%', h: '55%' }, depth: 10, drift: -80, gradient: true },

  /* 3 – Top-right image */
  { id: 't3', type: 'image', src: '/work/video/pexels-walls-io-440716388-15595296.jpg',
    pos: { top: '0', right: '0', w: '19%', h: '29%' }, depth: 20, drift: -50 },

  /* 4 – Left-mid portrait video */
  { id: 't4', type: 'video', src: '/work/video/12896413-uhd_2160_3840_24fps.mp4',
    pos: { top: '38%', left: '0', w: '13%', h: '30%' }, depth: 14, drift: -70 },

  /* 5 – Center-bottom video */
  { id: 't5', type: 'video', src: '/work/video/6756650-uhd_3840_2160_24fps.mp4',
    pos: { top: '55%', left: '33%', w: '24%', h: '30%' }, depth: 14, drift: -45 },

  /* 6 – Right-wide storefront video */
  { id: 't6', type: 'video', src: '/work/video/7279594-uhd_2160_4096_24fps.mp4',
    pos: { top: '29%', right: '0', w: '32%', h: '71%' }, depth: 22, drift: -65 },
];

/* ── Tile: cursor parallax + scroll-scrubbed exit ── */
function Tile({ tile, sx, sy, scrollProgress }) {
  /* Cursor parallax */
  const cpx = useTransform(sx, [-1, 1], [-tile.depth, tile.depth]);
  const cpy = useTransform(sy, [-1, 1], [-tile.depth, tile.depth]);

  /* Scroll-scrubbed drift (tiles drift upward as hero scrolls out) */
  const scrollY  = useTransform(scrollProgress, [0, 1], [0, tile.drift]);
  const scrollOp = useTransform(scrollProgress, [0, 0.55, 1], [1, 0.6, 0]);

  const { top, left, right, bottom, w, h } = tile.pos;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: top ?? 'auto',
        left: left ?? 'auto',
        right: right ?? 'auto',
        bottom: bottom ?? 'auto',
        width: w, height: h,
        overflow: 'hidden',
        x: cpx,
        y: useTransform([cpy, scrollY], ([c, s]) => c + s),
        opacity: scrollOp,
      }}
    >
      {tile.type === 'video' ? (
        <video
          src={tile.src}
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
          style={{ filter: 'grayscale(1) brightness(0.72)' }}
        />
      ) : (
        <img src={tile.src} alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(1) brightness(0.72)' }} />
      )}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.28)' }} />
      {tile.gradient && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(13,13,13,0.92) 100%)' }} />
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
export const HeroSection = () => {
  const heroRef = useRef(null);

  /* Cursor tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 48, damping: 15 });
  const sy = useSpring(mouseY, { stiffness: 48, damping: 15 });

  const onMouseMove = (e) => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  /* Scroll-scrubbed: 0 when hero top at viewport top, 1 when hero bottom leaves */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  /* Text scroll-scrubbed transforms */
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.75], [1, 1, 0]);
  const textScale   = useTransform(scrollYProgress, [0, 0.75], [1, 1.07]);
  const textY       = useTransform(scrollYProgress, [0, 1], [0, -60]);

  /* Letter curl (scroll-scrubbed) */
  const curlY = (i, total) => {
    const t = total > 1 ? i / (total - 1) : 0;
    // derives from scrollYProgress — we use a static 0 curl now since scroll handles the exit
    return -32 * Math.abs(Math.cos(t * Math.PI));
  };

  const nameChars = Array.from('Bhushan Padghan');

  return (
    <section
      ref={heroRef}
      id="intro"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: 620, background: '#0d0d0d' }}
      onMouseMove={onMouseMove}
    >
      {/* ── Tiles with scroll-scrubbed exit ── */}
      {TILES.map((tile) => (
        <Tile key={tile.id} tile={tile} sx={sx} sy={sy} scrollProgress={scrollYProgress} />
      ))}

      {/* ══ CENTREPIECE TEXT — scroll-scrubbed scale + fade ══ */}
      <div
        className="absolute z-30 select-none"
        style={{ top: '30%', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          style={{
            x: useTransform(sx, [-1, 1], [-5, 5]),
            y: useTransform([useTransform(sy, [-1, 1], [-4, 4]), textY], ([c, s]) => c + s),
            opacity: textOpacity,
            scale: textScale,
          }}
        >
          {/* Name */}
          <h1
            className="font-serif italic text-white leading-none whitespace-nowrap mb-5"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 400, letterSpacing: '-0.01em' }}
            aria-label="Bhushan Padghan"
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: curlY(i, nameChars.length) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: 'inline' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          {/* Roles */}
          <motion.p
            className="font-mono text-neutral-400 tracking-[0.3em] uppercase"
            style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: 'easeOut' }}
          >
            FOUNDER&nbsp;&nbsp;•&nbsp;&nbsp;AI DEVELOPER&nbsp;&nbsp;•&nbsp;&nbsp;AI SPECIALIST
          </motion.p>
        </motion.div>
      </div>

      {/* ══ SCROLL INDICATOR ══ */}
      <motion.a
        href="#work"
        aria-label="Scroll down"
        className="absolute z-30 flex flex-col items-center gap-2 cursor-pointer"
        style={{ bottom: '2rem', left: 0, right: 0, margin: '0 auto', width: 'fit-content' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.span
          className="block"
          style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.25)' }}
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
        <motion.svg
          width="14" height="8" viewBox="0 0 14 8" fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.a>

    </section>
  );
};
