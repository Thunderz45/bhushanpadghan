import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ── Skill categories matching exact reference layout & items ── */
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

/* ── Scroll-scrubbed word-by-word reveal for description ── */
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

/* ── Grid Skill Card with Interactive Cursor Hover Highlight ── */
function SkillCard({ skill, index, borderClasses }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`p-7 sm:p-9 flex flex-col gap-4 group transition-colors duration-300 ${borderClasses}`}
    >
      {/* Icon */}
      <span className="text-white/60 text-2xl font-mono transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
        {skill.icon}
      </span>

      {/* Title — Italic Serif */}
      <h3 className="font-serif italic text-white text-xl sm:text-2xl font-normal leading-snug tracking-tight">
        {skill.title}
      </h3>

      {/* Interactive Bulleted Items */}
      <ul className="flex flex-col gap-2.5 mt-1">
        {skill.items.map((item, j) => {
          const isHovered = hoveredIdx === j;
          const isAnyHovered = hoveredIdx !== null;

          return (
            <li
              key={j}
              onMouseEnter={() => setHoveredIdx(j)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`font-mono text-xs sm:text-[13px] tracking-wide leading-relaxed flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                isHovered
                  ? 'text-white translate-x-1 font-medium'
                  : isAnyHovered
                  ? 'text-white/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {/* Bullet Dot / Arrow */}
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                  isHovered
                    ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                    : 'bg-white/30'
                }`}
              />
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export const WhatIDoSection = () => {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true, margin: '-60px' });

  return (
    <section
      id="work"
      className="relative w-full bg-[#050505] border-b border-white/10"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-24 lg:py-32">

        {/* Section Label */}
        <motion.p
          ref={labelRef}
          initial={{ opacity: 0, x: -16 }}
          animate={labelInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-white/40 text-[11px] tracking-[0.35em] uppercase mb-16 lg:mb-20"
        >
          WHAT I DO
        </motion.p>

        {/* Layout Grid: Left Sticky Description, Right 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Sticky Scroll-Scrubbed Description ── */}
          <div className="lg:sticky lg:top-28 pr-0 lg:pr-6">
            <AnimatedDescription />
          </div>

          {/* ── RIGHT: 2-Column Grid with Grid Borders ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-white/15 rounded-none bg-transparent">
            {SKILLS.map((skill, i) => {
              // Determine border lines for exact mosaic grid appearance
              const isEven = i % 2 === 0;
              const isLastRow = i >= SKILLS.length - 2;

              const borderClasses = `
                ${isEven ? 'sm:border-r border-white/15' : ''}
                ${!isLastRow ? 'border-b border-white/15' : ''}
              `;

              return (
                <SkillCard
                  key={skill.title}
                  skill={skill}
                  index={i}
                  borderClasses={borderClasses}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
