import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, CheckCircle2, Bell, ExternalLink, Play, ArrowLeft, Video, Film, Sparkles, Share2 } from 'lucide-react';

export const YouTubePage = ({ onBack }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('HOME');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Bhushan Padghan — Official YouTube Channel";
  }, []);

  const handleSubscribeClick = () => {
    setIsSubscribed(true);
    window.open('https://www.youtube.com/@bhushanpadghan9647?sub_confirmation=1', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen bg-[#050505] text-white pt-24 pb-24 px-4 sm:px-8 lg:px-16 font-sans selection:bg-white selection:text-black"
    >
      <div className="max-w-[1380px] mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest transition-colors duration-200 mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        {/* Page Title & Intro */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest">
            <Youtube className="w-4 h-4 fill-red-500" />
            <span>OFFICIAL YOUTUBE CHANNEL</span>
          </div>
          <h1 className="font-serif italic text-4xl sm:text-6xl text-white font-normal tracking-tight">
            YouTube Content Showcase
          </h1>
        </div>

        {/* ══ REPLICATED STANDALONE YOUTUBE CHANNEL CARD ══ */}
        <div className="relative w-full bg-[#0f0f0f] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* ── 1. UPLOADED BLUE BANNER ("ENTREPRENEUR, DEVELOPER, AI") ── */}
          <div className="relative w-full h-40 sm:h-60 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900">
            <img
              src="/work/youtube_banner.png"
              alt="Bhushan Padghan YouTube Banner - Entrepreneur, Developer, AI"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* ── 2. CHANNEL PROFILE HEADER (SUBSCRIBER TEXT, ANDROID VIDEO TEXT & DISCORD REMOVED AS REQUESTED) ── */}
          <div className="p-6 sm:p-10 lg:p-12 relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
              {/* Profile Avatar (Uploaded image of Bhushan on stage with mic) */}
              <div className="relative -mt-16 sm:-mt-24 md:-mt-28 shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-4 border-[#0f0f0f] overflow-hidden shadow-2xl bg-neutral-900">
                  <img
                    src="/work/youtube_profile.jpg"
                    alt="Bhushan Padghan Channel Avatar"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-[#0f0f0f] text-white shadow-lg">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 fill-blue-500 text-white" />
                </div>
              </div>

              {/* Channel Meta Information (Clean Name Only) */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                    Bhushan Padghan
                  </h2>
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 fill-blue-500" />
                </div>
                <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-1">
                  AI Developer • Entrepreneur • Content Creator
                </p>
              </div>
            </div>

            {/* ── 3. RED SUBSCRIBE & ACTION BUTTONS ── */}
            <div className="flex items-center gap-3.5 shrink-0 pt-2 md:pt-0">
              
              {/* Primary YouTube Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubscribeClick}
                className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-mono font-bold text-xs sm:text-sm tracking-wider uppercase shadow-2xl transition-all duration-300 cursor-pointer ${
                  isSubscribed
                    ? 'bg-neutral-800 text-white border border-white/20 hover:bg-neutral-700'
                    : 'bg-[#FF0000] text-white hover:bg-[#D00000] shadow-[0_0_25px_rgba(255,0,0,0.5)]'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="w-4 h-4 fill-white animate-bounce" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <Youtube className="w-5 h-5 fill-white text-red-600" />
                    <span>Subscribe</span>
                  </>
                )}
              </motion.button>

              {/* Secondary Visit Channel Button */}
              <a
                href="https://www.youtube.com/@bhushanpadghan9647"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs sm:text-sm font-semibold transition-all duration-300"
              >
                <span>Visit Channel</span>
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* ── 4. YOUTUBE NAVIGATION TABS & VIDEO CONTENT ── */}
          <div className="border-t border-white/10 px-6 sm:px-10 py-6 bg-[#0a0a0a] flex flex-col gap-6">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-6 border-b border-white/10 pb-3 overflow-x-auto font-mono text-xs tracking-wider uppercase">
              {['HOME', 'VIDEOS', 'SHORTS', 'PLAYLISTS', 'COMMUNITY', 'ABOUT'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Featured Video Card */}
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 sm:gap-8 items-center bg-black/60 p-5 sm:p-7 rounded-2xl border border-white/10">
              
              {/* Thumbnail / Video Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 group/thumb border border-white/10 shadow-xl">
                <img
                  src="/work/youtube_banner.png"
                  alt="Featured Video Showcase"
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors flex items-center justify-center">
                  <a
                    href="https://www.youtube.com/@bhushanpadghan9647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover/thumb:scale-115 transition-transform duration-300 border-2 border-white/30"
                    aria-label="Watch Video"
                  >
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </a>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 font-mono text-[11px] text-white px-2 py-0.5 rounded">
                  03:45
                </div>
              </div>

              {/* Video Info Details */}
              <div className="flex flex-col justify-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-500/30 px-2.5 py-1 rounded-md w-fit">
                  FEATURED VIDEO
                </span>
                <h3 className="font-sans font-semibold text-lg sm:text-2xl text-white leading-snug">
                  Bhushan Padghan — AI Development & Tech Architecture
                </h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Deep dive into autonomous AI agents, full-stack React systems, and startup technology building.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.youtube.com/@bhushanpadghan9647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-red-500 hover:text-red-400 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-red-500" />
                    <span>WATCH ON YOUTUBE</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};
