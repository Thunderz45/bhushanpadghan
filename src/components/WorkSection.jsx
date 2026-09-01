import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';

export const WorkSection = ({ onSelectProject }) => {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: '-60px' });
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /* Play / Pause Toggle on Hover or Click */
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
    e.stopPropagation(); // prevent opening details if clicking play button
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

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <motion.p
              ref={labelRef}
              initial={{ opacity: 0, x: -20 }}
              animate={labelInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-white/40 text-[11px] tracking-[0.35em] uppercase mb-4"
            >
              WORK & SHOWCASE
            </motion.p>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal leading-none tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs tracking-wide leading-relaxed">
            Move cursor over video to play preview. Click card to open full Celestial Pixel details page.
          </p>
        </div>

        {/* ── FULL-WIDTH FEATURED VIDEO SHOWCASE CARD: Celestial Pixel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelectProject('celestial-pixel')}
          className="group relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black hover:border-white/50 transition-all duration-500 cursor-pointer shadow-2xl"
        >
          {/* Full Widescreen Video Frame */}
          <div className="relative w-full aspect-[16/9] max-h-[700px] overflow-hidden bg-black flex items-center justify-center">
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

            {/* Subtle Gradient Veil — Fades out when video plays */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 transition-opacity duration-300 pointer-events-none ${
                isPlaying ? 'opacity-30' : 'opacity-70'
              }`}
            />

            {/* Top Left Flagship Badge */}
            <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Celestial Pixel Flagship</span>
            </div>

            {/* Top Right Play Status Indicator */}
            <button
              onClick={togglePlay}
              className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-200 shadow-xl"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Video</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <span>Play Video</span>
                </>
              )}
            </button>

            {/* Bottom Overlay Info & Click Redirection Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none">
              <div>
                <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest block mb-2">
                  Creative Web Architecture
                </span>
                <h3 className="font-serif italic text-3xl sm:text-5xl text-white font-normal leading-tight">
                  Celestial Pixel
                </h3>
              </div>

              <div className="pointer-events-auto">
                <span className="font-mono text-xs text-white uppercase tracking-widest px-5 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 group-hover:bg-white group-hover:text-black transition-all duration-300 flex items-center gap-2 shadow-2xl">
                  <span>Explore Details Page</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
