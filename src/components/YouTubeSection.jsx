import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, CheckCircle2, Bell, ExternalLink, Disc as DiscordIcon, Play, Users, Video } from 'lucide-react';

export const YouTubeSection = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribeClick = () => {
    setIsSubscribed(true);
    window.open('https://www.youtube.com/@bhushanpadghan9647?sub_confirmation=1', '_blank');
  };

  return (
    <section id="youtube" className="relative w-full bg-[#050505] border-b border-white/10 py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
        
        {/* Section Label Header */}
        <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-red-500 text-[11px] tracking-[0.35em] uppercase mb-3 flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500 fill-red-500" /> YOUTUBE CHANNEL SHOWCASE
            </p>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal leading-none tracking-tight">
              YouTube & Content
            </h2>
          </div>

          {/* Quick Subscribe Counter Badge */}
          <div className="flex items-center gap-3 bg-red-950/40 border border-red-500/20 px-4 py-2 rounded-full w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="font-mono text-xs text-neutral-200">
              @bhushanpadghan9647 • 35 Subscribers
            </span>
          </div>
        </div>

        {/* ══ REPLICATED YOUTUBE CHANNEL PAGE CARD ══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full bg-[#0f0f0f] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl group"
        >
          {/* ── 1. UPLOADED BLUE BANNER ("ENTREPRENEUR, DEVELOPER, AI") ── */}
          <div className="relative w-full h-36 sm:h-52 md:h-64 lg:h-72 overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900">
            <img
              src="/work/youtube_banner.png"
              alt="Bhushan Padghan YouTube Banner - Entrepreneur, Developer, AI"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Banner Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* ── 2. CHANNEL PROFILE INFO HEADER ── */}
          <div className="p-6 sm:p-10 lg:p-12 relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
              {/* Profile Avatar (Uploaded image of Bhushan on stage with mic) */}
              <div className="relative -mt-16 sm:-mt-24 md:-mt-28 shrink-0">
                <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-4 border-[#0f0f0f] overflow-hidden shadow-2xl bg-neutral-900 relative">
                  <img
                    src="/work/youtube_profile.jpg"
                    alt="Bhushan Padghan Channel Avatar"
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Verified Badge Icon */}
                <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1 border-2 border-[#0f0f0f] text-white shadow-lg">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 fill-blue-500 text-white" />
                </div>
              </div>

              {/* Channel Meta Information */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                    Bhushan Padghan
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-neutral-400 fill-neutral-400 inline-block" />
                </div>

                {/* Handle & Subscriber Stats */}
                <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-1.5 flex items-center gap-2 flex-wrap">
                  <span className="text-white font-medium">@bhushanpadghan9647</span>
                  <span>•</span>
                  <span>35 subscribers</span>
                  <span>•</span>
                  <span>1 video</span>
                </p>

                {/* Description Snippet */}
                <p className="font-sans text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl line-clamp-2">
                  ONLY ANDROID GAME VIDEO <span className="text-neutral-500 font-semibold cursor-pointer">...more</span>
                </p>

                {/* Social Discord Link Pill */}
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://discord.gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 hover:underline transition-all"
                  >
                    <DiscordIcon className="w-4 h-4" />
                    <span>Discord</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* ── 3. RED SUBSCRIBE & ACTION BUTTONS ── */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 pt-2 md:pt-0">
              
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

              {/* Secondary Channel Direct Link */}
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

          {/* ── 4. YOUTUBE CHANNEL CONTENT TABS & FEATURED VIDEO PREVIEW ── */}
          <div className="border-t border-white/10 px-6 sm:px-10 py-6 bg-[#0a0a0a] flex flex-col gap-6">
            
            {/* YouTube Navigation Tabs */}
            <div className="flex items-center gap-6 border-b border-white/10 pb-3 overflow-x-auto font-mono text-xs tracking-wider uppercase text-neutral-400">
              <span className="text-white border-b-2 border-white pb-3 font-bold cursor-pointer">HOME</span>
              <span className="hover:text-white pb-3 transition-colors cursor-pointer">VIDEOS</span>
              <span className="hover:text-white pb-3 transition-colors cursor-pointer">SHORTS</span>
              <span className="hover:text-white pb-3 transition-colors cursor-pointer">PLAYLISTS</span>
              <span className="hover:text-white pb-3 transition-colors cursor-pointer">COMMUNITY</span>
              <span className="hover:text-white pb-3 transition-colors cursor-pointer">ABOUT</span>
            </div>

            {/* Featured Channel Card Preview */}
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 sm:gap-8 items-center bg-black/60 p-5 sm:p-7 rounded-2xl border border-white/10">
              
              {/* Video Thumbnail / Player Preview Card */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900 group/thumb border border-white/10 shadow-xl">
                <img
                  src="/work/youtube_banner.png"
                  alt="Featured Video Thumbnail"
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors flex items-center justify-center">
                  <a
                    href="https://www.youtube.com/@bhushanpadghan9647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover/thumb:scale-115 transition-transform duration-300 border-2 border-white/30"
                    aria-label="Play Featured Video"
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
                <h4 className="font-sans font-semibold text-lg sm:text-xl text-white leading-snug">
                  Bhushan Padghan — AI Development & Game Tech Showcase
                </h4>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Exploring high-performance Android game development, AI system automations, and modern web architectures.
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

        </motion.div>

      </div>
    </section>
  );
};
