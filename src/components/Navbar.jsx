import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, ExternalLink } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'INTRO',   href: '#intro'   },
  { label: 'WORK',    href: '#work'    },
  { label: 'ABOUT',   href: '#about'   },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar = () => {
  const [active, setActive] = useState('INTRO');

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      style={{
        background: 'rgba(0,0,0,0.10)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">

        {/* ── Wordmark (upper-left, italic serif) */}
        <a
          href="#intro"
          className="font-serif italic text-white text-lg sm:text-xl font-normal tracking-tight hover:text-neutral-300 transition-colors pointer-events-auto shrink-0"
          style={{ lineHeight: 1 }}
        >
          Bhushan Padghan
        </a>

        {/* ── Nav (upper-right) */}
        <nav className="flex items-center gap-3 sm:gap-7 font-mono pointer-events-auto">

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
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </nav>
      </div>
    </header>
  );
};
