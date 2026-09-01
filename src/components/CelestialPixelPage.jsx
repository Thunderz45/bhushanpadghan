import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Sparkles, Code, Globe, ShieldCheck } from 'lucide-react';

export const CelestialPixelPage = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Celestial Pixel — Luxury Creative AI Agency";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-6 sm:px-12 lg:px-20 font-sans selection:bg-white selection:text-black"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest transition-colors duration-200 mb-10 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Work</span>
        </button>

        {/* Header Title */}
        <div className="flex flex-col gap-3 mb-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-white/10 text-white border border-white/20">
              Flagship Agency Product
            </span>
            <span className="font-mono text-xs text-neutral-500">2024 • Deployed</span>
          </div>

          <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight font-normal leading-none">
            Celestial Pixel
          </h1>

          <p className="font-mono text-sm sm:text-base text-neutral-400 tracking-wide max-w-2xl mt-2">
            Luxury Web Architecture & AI Creative Studio for Digital Brands & Enterprise Products.
          </p>
        </div>

        {/* Video Showcase Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black mb-16 group">
          <video
            src="/work/video/celestialpixel.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-xs flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Preview
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {/* Left 2 Cols: Story & Overview */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                OVERVIEW
              </h2>
              <p className="text-neutral-300 font-sans text-base sm:text-lg leading-relaxed font-light">
                Celestial Pixel is a luxury digital agency and software platform designed to craft high-speed, immersive web experiences for next-generation brands. Built with modular React architectures, smooth shader animations, and automated content pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                <Code className="w-5 h-5 text-white mb-3" />
                <h3 className="font-serif italic text-lg text-white mb-2">High Performance</h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Engineered with Vite & React for 99+ Lighthouse performance ratings and sub-second load times.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10">
                <ShieldCheck className="w-5 h-5 text-white mb-3" />
                <h3 className="font-serif italic text-lg text-white mb-2">AI-Driven Workflows</h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Automated brand content generation, asset optimization, and LLM-assisted code scaffolding.
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: Specs & Tech Stack */}
          <div className="flex flex-col gap-6 p-7 rounded-2xl bg-white/[0.02] border border-white/10 h-fit">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-3">
                TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {['React 18', 'TypeScript', 'Framer Motion', 'TailwindCSS', 'Vite', 'OpenAI API'].map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-md bg-white/10 text-white border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 mb-2">
                MY ROLE
              </h3>
              <p className="font-serif italic text-white text-base">
                Founder, Lead Architect & Full-Stack Engineer
              </p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <a
                href="https://github.com/Thunderz45"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-mono text-xs uppercase tracking-widest py-3 px-5 rounded-lg bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                <span>View Source Repository</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
