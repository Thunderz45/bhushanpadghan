import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const AboutSection = () => {
  const { personal, tools } = portfolioData;

  return (
    <section id="about" className="py-32 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="pb-8 mb-12 border-b border-white/10">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
            [ ABOUT ]
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            About
          </h2>
        </div>

        <div className="max-w-3xl space-y-6">
          <p className="text-neutral-300 text-lg leading-relaxed font-normal">
            {personal.bio}
          </p>

          <div className="pt-6 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-wider block mb-3">Technologies</span>
            <div className="flex flex-wrap gap-2">
              {(tools || []).map((tool, idx) => (
                <span key={idx} className="px-3 py-1 bg-neutral-900 border border-white/15 text-neutral-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
