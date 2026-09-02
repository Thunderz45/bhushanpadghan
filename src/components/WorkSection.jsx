import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, ArrowUpRight, Sparkles } from 'lucide-react';

export const WorkSection = ({ onSelectProject }) => {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: '-60px' });
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /* Play / Pause Toggle on Hover */
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <section
      id="work-page"
      className="relative w-full bg-[#050505] border-b border-white/10 py-24 lg:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header — Clean "Featured Work" title without instruction text */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-sans font-bold text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Featured Work
          </h2>
        </div>

        {/* ── 2-COLUMN FEATURED SHOWCASE GRID (Matching Reference Screenshot) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── LEFT CARD: Celestial Pixel Video Card (Medium Size) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelectProject('celestial-pixel')}
            className="group flex flex-col gap-4 cursor-pointer"
          >
            {/* Medium Video Frame */}
            <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden bg-black border border-white/10 group-hover:border-white/40 transition-all duration-500 shadow-2xl">
              <video
                ref={videoRef}
                src="/work/video/celestialpixel.mp4"
                loop
                muted
                playsInline
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered || isPlaying ? 'scale-105 filter-none' : 'filter brightness-90'
                }`}
              />

              {/* Dark Overlay — Fades on hover */}
              <div
                className={`absolute inset-0 bg-black/30 transition-opacity duration-300 pointer-events-none ${
                  isPlaying ? 'opacity-10' : 'opacity-40'
                }`}
              />

              {/* Play / Pause Toggle Button */}
              <button
                onClick={togglePlay}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-lg"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current text-amber-400 ml-0.5" />
                )}
              </button>

              {/* Bottom Right Brand Watermark Logo */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white font-mono text-xs font-medium tracking-wider pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Celestial Pixel</span>
              </div>
            </div>

            {/* Under-Card Metadata */}
            <div className="flex items-baseline justify-between pt-2">
              <div>
                <h3 className="font-sans text-base sm:text-lg font-medium text-white group-hover:text-neutral-300 transition-colors">
                  Celestial Pixel — Luxury Creative Web Architecture
                </h3>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mt-1">
                  CELESTIAL PIXEL
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-500">2024</span>
            </div>
          </motion.div>

          {/* ── RIGHT CARD: Featured Image Card (Medium Size) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => onSelectProject('celestial-pixel')}
            className="group flex flex-col gap-4 cursor-pointer"
          >
            {/* Medium Image Frame */}
            <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden bg-black border border-white/10 group-hover:border-white/40 transition-all duration-500 shadow-2xl">
              <img
                src="/work/T-HUB/1742577880611.jpeg"
                alt="T-HUB & LeadFlow Product Showcase"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

              {/* Bottom Right Brand Watermark Logo */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white font-mono text-xs font-medium tracking-wider pointer-events-none">
                <span>T-HUB Innovation Studio</span>
              </div>
            </div>

            {/* Under-Card Metadata */}
            <div className="flex items-baseline justify-between pt-2">
              <div>
                <h3 className="font-sans text-base sm:text-lg font-medium text-white group-hover:text-neutral-300 transition-colors">
                  AI Product Architecture & Startup Incubation
                </h3>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mt-1">
                  T-HUB HYDERABAD
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-500">2024</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
