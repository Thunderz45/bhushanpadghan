import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Linkedin, Github, Youtube, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-10 sm:py-14 font-mono text-xs text-neutral-400">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <a
            href="#intro"
            className="font-serif italic text-lg sm:text-xl text-white tracking-tight normal-case hover:text-neutral-300 transition-colors"
          >
            Bhushan Padghan
          </a>
          <p className="text-[11px] text-neutral-500 font-mono tracking-widest uppercase">
            AI Developer · Systems Architect · SaaS Founder
          </p>
        </div>

        {/* Social Icons Quick Footer */}
        <div className="flex items-center gap-5">
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="text-neutral-400 hover:text-white transition-colors p-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-neutral-500 uppercase tracking-widest text-center md:text-right">
          © {new Date().getFullYear()} All Rights Reserved
        </div>

      </div>
    </footer>
  );
};
