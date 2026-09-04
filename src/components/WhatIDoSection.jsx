import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ── Skill categories ── */
const SKILLS = [
  {
    icon: '≡',
    title: 'Strategy',
    items: [
      'Business & Product Strategy',
      'Market & User Research',
      'Startup Strategy',
      'Product Vision & Roadmapping',
      'Business Storytelling & Pitching',
    ],
  },
  {
    icon: '⊞',
    title: 'Technology & Product',
    items: [
      'Concept to Product Development',
      'Web & Software Development',
      'AI & Automation Solutions',
      'Product Prototyping',
      'Digital Product Development',
    ],
  },
  {
    icon: '◎',
    title: 'Data & Intelligence',
    items: [
      'Data Analysis & Visualization',
      'Business Analytics',
      'Data-Driven Decision Making',
      'AI-Powered Solutions',
      'Insights & Business Intelligence',
    ],
  },
  {
    icon: '⬡',
    title: 'Digital & Brand',
    items: [
      'Digital Strategy',
      'Brand Development',
      'Website & Digital Experiences',
      'Creative Direction',
      'Content & Visual Communication',
    ],
  },
  {
    icon: '✦',
    title: 'Automation & Systems',
    items: [
      'AI-Native Workflow Design',
      'Business Process Automation',
      'n8n & Workflow Automation',
      'Lead Generation Systems',
      'Scalable Digital Infrastructure',
    ],
  },
  {
    icon: '◈',
    title: 'Entrepreneurship & Leadership',
    items: [
      'Startup Building',
      'Team & Project Coordination',
      'Entrepreneurship & Innovation',
      'Strategic Partnerships',
      'Event & Initiative Leadership',
    ],
  },
];

/* ── Startup Ventures Data ── */
const STARTUPS = [
  {
    id: 1,
    name: 'Pixel Studio X',
    tagline: 'Creative Technology Studio',
    badge: 'VENTURE #1',
    logo: '/work/startups/startup_logo_1.png',
    desc: 'A creative technology studio building digital products, brands, and innovative solutions.',
    url: 'https://www.pixelstudiox.in/tools',
  },
  {
    id: 2,
    name: 'CelestialPixel',
    tagline: 'Digital Marketing Agency',
    badge: 'VENTURE #2',
    logo: '/work/startups/startup_logo_2.png',
    desc: 'A digital marketing agency helping businesses grow through branding, content, websites, and marketing.',
    url: 'https://www.celestialpixel.in',
  },
  {
    id: 3,
    name: 'LeadFlow',
    tagline: 'Smart Lead-Generation Platform',
    badge: 'VENTURE #3',
    logo: '/work/startups/startup_logo_3.jpg',
    desc: 'A smart lead-generation platform that helps businesses discover, analyze, and convert potential clients.',
    url: 'https://leadflow.pixelstudiox.in',
  },
  {
    id: 4,
    name: 'PixelCanvas',
    tagline: 'Visual Content Platform',
    badge: 'VENTURE #4',
    logo: '/work/startups/startup_logo_4.jpg',
    desc: 'A creative platform for designing, generating, and managing visual content with modern digital tools.',
    url: 'https://canvas.pixelstudiox.in',
  },
  {
    id: 5,
    name: 'PixelCode',
    tagline: 'Development Platform',
    badge: 'VENTURE #5',
    logo: '/work/startups/startup_logo_5.png',
    desc: 'A development-focused platform for building websites, applications, automations, and software solutions.',
    url: 'https://code.pixelstudiox.in',
  },
];

/* ── Scroll-scrubbed word-by-word reveal for left description ── */
const DESCRIPTION = `I believe great products are not just built, they are thoughtfully created to solve real problems and deliver meaningful experiences. My work lies at the intersection of technology, data, and entrepreneurship, where technology enables innovation, data drives better decisions, and entrepreneurship turns ideas into solutions that create real-world impact.`;

const ITALIC_WORDS = new Set(['technology,', 'data,', 'entrepreneurship,', 'technology', 'data', 'entrepreneurship']);

function AnimatedDescription() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.3'],
  });

  const words = DESCRIPTION.split(' ');
  const total = words.length;

  return (
    <p
      ref={ref}
      className="font-sans text-white leading-[1.28] tracking-tight select-none"
      style={{ fontSize: 'clamp(1.5rem, 3.1vw, 2.9rem)', fontWeight: 300 }}
      aria-label={DESCRIPTION}
    >
      {words.map((word, i) => {
        const isItalic = ITALIC_WORDS.has(word);
        const start = (i / total) * 0.88;
        const end   = start + 0.12;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y       = useTransform(scrollYProgress, [start, end], [12, 0]);

        return (
          <motion.span
            key={i}
            className={isItalic ? 'font-serif italic text-white font-normal' : ''}
            style={{ display: 'inline-block', marginRight: '0.28em', opacity, y }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

/* ── Clean Line-Text Skill Card with Staggered Scroll Motion & Animated Line Accent ── */
function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12 + Math.floor(index / 2) * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="py-8 sm:py-10 flex flex-col gap-4 border-b border-white/10 group"
    >
      {/* Category Icon & Title Header */}
      <div className="flex items-center gap-3">
        <motion.span
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="text-white/60 text-xl font-mono transition-colors duration-300 group-hover:text-white"
        >
          {skill.icon}
        </motion.span>
        <h3 className="font-serif italic text-white text-xl sm:text-2xl font-normal leading-snug tracking-tight">
          {skill.title}
        </h3>
      </div>

      {/* Interactive Line-Text Bullet Items */}
      <ul className="flex flex-col gap-3 mt-2">
        {skill.items.map((item, j) => {
          const isHovered = hoveredIdx === j;
          const isAnyHovered = hoveredIdx !== null;

          return (
            <motion.li
              key={j}
              onMouseEnter={() => setHoveredIdx(j)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + j * 0.05 }}
              className={`relative font-mono text-xs sm:text-[13px] tracking-wide leading-relaxed flex items-center gap-3 cursor-pointer py-0.5 transition-all duration-250 ${
                isHovered
                  ? 'text-white translate-x-1.5 font-medium'
                  : isAnyHovered
                  ? 'text-white/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {/* Glowing Bullet Dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isHovered
                    ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,1)]'
                    : 'bg-white/30'
                }`}
              />

              {/* Text item */}
              <span className="relative">
                {item}
                {/* Sleek Animated Line Accent under text */}
                <motion.span
                  className="absolute left-0 -bottom-1 h-[1px] bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? '100%' : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* ── Downward Startup Left-Scrolling Marquee ── */
function StartupMarquee() {
  const marqueeItems = [...STARTUPS, ...STARTUPS, ...STARTUPS, ...STARTUPS];

  return (
    <div className="mt-16 sm:mt-24 pt-16 border-t border-white/10 pb-16 overflow-hidden relative">
      
      {/* Header for Startup Section */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-white/40 text-[11px] tracking-[0.35em] uppercase mb-2"
          >
            STARTUP
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white"
          >
            Startup <span className="font-serif italic font-normal text-white/80">Ventures & Ecosystem</span>
          </motion.h2>
        </div>
      </div>

      {/* Fade Gradients on edges for smooth infinite loop visual */}
      <div className="absolute left-0 top-36 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-36 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Infinite Non-Stop Left-Scrolling Container */}
      <div className="w-full overflow-hidden py-4">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {marqueeItems.map((startup, idx) => (
            <motion.a
              key={`${startup.id}-${idx}`}
              href={startup.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02 }}
              className="w-[280px] sm:w-[340px] shrink-0 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group flex flex-col justify-between block cursor-pointer"
            >
              <div>
                {/* Logo Box & Category Badge */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/60 border border-white/15 p-2 flex items-center justify-center group-hover:border-white/40 transition-colors shadow-lg">
                    <img
                      src={startup.logo}
                      alt={startup.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    {startup.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-sans text-xl font-medium text-white group-hover:text-white transition-colors mb-1">
                  {startup.name}
                </h3>
                <p className="font-mono text-xs text-white/50 mb-3">
                  {startup.tagline}
                </p>

                {/* Description */}
                <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                  {startup.desc}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white transition-colors">
                <span>VISIT {startup.name.toUpperCase()}</span>
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

    </div>
  );
}

export const WhatIDoSection = () => {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: '-60px' });

  return (
    <section
      id="work"
      className="relative w-full bg-[#050505] border-b border-white/10 overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-32">

        {/* Section Label */}
        <motion.p
          ref={labelRef}
          initial={{ opacity: 0, x: -20 }}
          animate={labelInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-mono text-white/40 text-[11px] tracking-[0.35em] uppercase mb-8 sm:mb-16 lg:mb-20"
        >
          WHAT I DO
        </motion.p>

        {/* Layout Grid: Left Sticky Description, Right Clean Line-Text Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Sticky Scroll-Scrubbed Description ── */}
          <div className="lg:sticky lg:top-28 pr-0 lg:pr-6">
            <AnimatedDescription />
          </div>

          {/* ── RIGHT: Clean 2-Column Line Typography Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 border-t border-white/10">
            {SKILLS.map((skill, i) => (
              <SkillCard
                key={skill.title}
                skill={skill}
                index={i}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── DOWNWARD SECTION: STARTUP LEFT SCROLLING MARQUEE ── */}
      <StartupMarquee />
    </section>
  );
};

