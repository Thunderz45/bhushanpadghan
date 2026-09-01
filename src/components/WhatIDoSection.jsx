import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

/* ── Skill categories matching reference layout ── */
const SKILLS = [
  {
    icon: '≡',
    title: 'Strategy',
    items: ['Business & Product Strategy', 'Market & User Research', 'Startup Strategy', 'Product Vision & Roadmapping', 'Business Storytelling & Pitching'],
  },
  {
    icon: '⊞',
    title: 'Technology & Product',
    items: ['Concept to Product Development', 'Web & Software Development', 'AI & Automation Solutions', 'Product Prototyping', 'Digital Product Development'],
  },
  {
    icon: '◎',
    title: 'Data & Intelligence',
    items: ['Data Analysis & Visualization', 'Business Analytics', 'Data-Driven Decision Making', 'AI-Powered Solutions', 'Insights & Business Intelligence'],
  },
  {
    icon: '⬡',
    title: 'Digital & Brand',
    items: ['Digital Strategy', 'Brand Development', 'Website & Digital Experiences', 'Creative Direction', 'Content & Visual Communication'],
  },
  {
    icon: '✦',
    title: 'Automation & Systems',
    items: ['AI-Native Workflow Design', 'Business Process Automation', 'n8n & Workflow Automation', 'Lead Generation Systems', 'Scalable Digital Infrastructure'],
  },
  {
    icon: '◈',
    title: 'Entrepreneurship & Leadership',
    items: ['Startup Building', 'Team & Project Coordination', 'Entrepreneurship & Innovation', 'Strategic Partnerships', 'Event & Initiative Leadership'],
  },
];

/* ── Animated word-by-word reveal for the description ── */
const DESCRIPTION = `I believe great products are not just built, they are thoughtfully created to solve real problems and deliver meaningful experiences. My work lies at the intersection of technology, data, and entrepreneurship, where technology enables innovation, data drives better decisions, and entrepreneurship turns ideas into solutions that create real-world impact.`;

const ITALIC_WORDS = new Set(['technology,', 'data,', 'entrepreneurship,', 'technology', 'data', 'entrepreneurship']);

/* ── Scroll-scrubbed word-by-word reveal ── */
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
      className="font-sans text-white leading-[1.25] tracking-tight"
      style={{ fontSize: 'clamp(1.6rem, 3.2vw, 3rem)', fontWeight: 300 }}
      aria-label={DESCRIPTION}
    >
      {words.map((word, i) => {
        const isItalic = ITALIC_WORDS.has(word);
        // Each word reveals over its own 1/total slice of scroll progress
        const start = (i / total) * 0.9;
        const end   = start + 0.12;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y       = useTransform(scrollYProgress, [start, end], [14, 0]);

        return (
          <motion.span
            key={i}
            className={isItalic ? 'font-serif italic' : ''}
            style={{ display: 'inline-block', marginRight: '0.28em', opacity, y }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

/* ── Single skill card ── */
function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Icon */}
      <span className="text-white/50 text-xl mb-1" style={{ fontFamily: 'monospace' }}>
        {skill.icon}
      </span>

      {/* Title — italic serif like reference */}
      <h3 className="font-serif italic text-white/90 text-base leading-tight" style={{ fontWeight: 400 }}>
        {skill.title}
      </h3>

      {/* Bullet items */}
      <ul className="flex flex-col gap-1.5">
        {skill.items.map((item, j) => (
          <li
            key={j}
            className="font-mono text-white/40 text-[11px] tracking-wide leading-snug flex items-start gap-2"
          >
            <span className="text-white/25 mt-px flex-shrink-0">›</span>
            {item}
          </li>
        ))}
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
      className="relative w-full bg-[#0d0d0d] border-b border-white/10"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-24 lg:py-32">

        {/* Section label */}
        <motion.p
          ref={labelRef}
          initial={{ opacity: 0, x: -16 }}
          animate={labelInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-mono text-white/35 text-[10px] tracking-[0.35em] uppercase mb-16 lg:mb-20"
        >
          WHAT I DO
        </motion.p>

        {/* Two-column grid: description left, skills right */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT: animated description ── */}
          <div className="lg:sticky lg:top-28">
            <AnimatedDescription />
          </div>

          {/* ── RIGHT: 2-column skill grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.title} skill={skill} index={i} />
            ))}
          </div>

        </div>
      </div>

      {/* Subtle horizontal rule divider at bottom */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-white/8" />
    </section>
  );
};
