import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const WorkSection = ({ onSelectProject }) => {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: '-60px' });
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      id="work-page"
      className="relative w-full bg-[#050505] border-b border-white/10 py-24 lg:py-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <motion.p
              ref={labelRef}
              initial={{ opacity: 0, x: -20 }}
              animate={labelInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-white/40 text-[11px] tracking-[0.35em] uppercase mb-4"
            >
              SELECTED WORK & PROJECTS
            </motion.p>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal leading-none tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs tracking-wide leading-relaxed">
            Move cursor over video to play preview. Click video to open full Celestial Pixel project page.
          </p>
        </div>

        {/* ── HERO FEATURED PROJECT CARD: Celestial Pixel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelectProject('celestial-pixel')}
          className="group relative w-full rounded-2xl overflow-hidden border border-white/15 bg-white/[0.02] hover:border-white/50 transition-all duration-500 cursor-pointer mb-16 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">

            {/* Left 7 Cols: Full Video Preview Container */}
            <div className="lg:col-span-7 relative aspect-video bg-black overflow-hidden">
              <video
                ref={videoRef}
                src="/work/video/celestialpixel.mp4"
                loop
                muted
                playsInline
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? 'scale-105 filter-none' : 'filter brightness-75'
                }`}
              />

              {/* Dynamic Overlay — Fades on hover so ONLY video shows brightly */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-300 pointer-events-none ${
                  isHovered ? 'opacity-20' : 'opacity-70'
                }`}
              />

              {/* Hover Badge: Click for Full Details Page */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: isHovered ? 1.08 : 1, opacity: isHovered ? 1 : 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="px-5 py-2.5 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-2xl"
                >
                  <Play className="w-4 h-4 fill-current text-amber-400" />
                  <span>{isHovered ? 'Click to View Full Project Details' : 'Hover to Play Video'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                </motion.div>
              </div>

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Flagship Project
              </div>
            </div>

            {/* Right 5 Cols: Details & Meta */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between gap-8">
              <div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
                  Creative Web Architecture
                </span>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-white font-normal mb-4 group-hover:text-neutral-200 transition-colors">
                  Celestial Pixel
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6">
                  Luxury Web Architecture & AI Creative Studio for Digital Brands. Move cursor to play video preview. Click card to open dedicated Celestial Pixel project page.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Framer Motion', 'TailwindCSS'].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/10 text-white/80 border border-white/10 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <span className="font-mono text-xs text-white uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                  <span>Open Celestial Pixel Details Page</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs text-neutral-500">2024</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── SECONDARY PROJECTS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onSelectProject(project.id)}
              className="group rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="font-serif italic text-2xl text-white font-normal mb-3 group-hover:text-neutral-200">
                  {project.title}
                </h4>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed font-light mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                {project.tags.map((t) => (
                  <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
