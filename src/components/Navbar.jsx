import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, ExternalLink, Menu, X, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'INTRO',     href: '#intro'   },
  { label: 'WHAT I DO', href: '#work'    },
  { label: 'YOUTUBE',   href: '#youtube' },
  { label: 'GALLERY',   href: '#gallery' },
];

export const Navbar = () => {
  const [active, setActive] = useState('INTRO');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map((n) => ({
        label: n.label,
        el: document.querySelector(n.href),
      }));
      const scrollY = window.scrollY + 120;
      let current = 'INTRO';
      sections.forEach(({ label, el }) => {
        if (el && el.offsetTop <= scrollY) current = label;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (label, href) => {
    setActive(label);
    setIsOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-5 sm:px-10 py-4 sm:py-5">

          {/* ── Wordmark (upper-left, italic serif) */}
          <a
            href="#intro"
            onClick={() => setIsOpen(false)}
            className="font-serif italic text-white text-lg sm:text-xl font-normal tracking-tight hover:text-neutral-300 transition-colors pointer-events-auto shrink-0 z-50"
            style={{ lineHeight: 1 }}
          >
            Bhushan Padghan
          </a>

          {/* ── Desktop Nav (upper-right, sm:flex) */}
          <nav className="hidden sm:flex items-center gap-5 sm:gap-7 font-mono pointer-events-auto">

            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = active === label;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setActive(label)}
                  className="relative flex items-center gap-1.5 group transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Dot bullet */}
                  <span
                    className="transition-all duration-200"
                    style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      border: isActive ? 'none' : '1px solid rgba(255,255,255,0.5)',
                      background: isActive ? '#fff' : 'transparent',
                      flexShrink: 0,
                    }}
                  />
                  {/* Label */}
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase transition-colors duration-200"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {label}
                  </span>
                  {/* Underline for active */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0"
                      style={{ height: 1, background: '#fff' }}
                    />
                  )}
                </a>
              );
            })}

            {/* Icons */}
            <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="LinkedIn"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </nav>

          {/* ── Mobile Hamburger Button (< sm:flex) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden pointer-events-auto p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 z-50 focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

        </div>
      </header>

      {/* ── Mobile Full-Screen Navigation Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between px-6 pt-28 pb-10 sm:hidden"
          >
            {/* Nav Menu Links */}
            <div className="flex flex-col gap-6">
              <p className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase mb-2">
                Navigation
              </p>

              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = active === label;
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => handleNavClick(label, href)}
                    className="flex items-center justify-between group py-2 border-b border-white/10"
                  >
                    <span className="font-serif italic text-2xl text-white font-normal tracking-tight">
                      {label}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isActive ? 'bg-white scale-125' : 'border border-white/30'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Social & Contact Bar in Mobile Drawer */}
            <div className="flex flex-col gap-5 pt-6 border-t border-white/15">
              <p className="font-mono text-[11px] text-neutral-400 tracking-widest uppercase">
                Connect & Inquire
              </p>
              
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-3 text-white text-sm font-mono bg-white/10 hover:bg-white hover:text-black transition-all px-4 py-3 rounded-lg border border-white/20"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{portfolioData.personal.email}</span>
              </a>

              <div className="flex items-center justify-around pt-2">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/20 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/20 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a
                  href={portfolioData.personal.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/20 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-[#FF0000]" />
                </a>
                <a
                  href={portfolioData.personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/20 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#E4405F]" />
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
