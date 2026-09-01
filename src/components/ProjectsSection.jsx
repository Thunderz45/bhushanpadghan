import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsSection = () => {
  const { projects } = portfolioData;

  return (
    <section id="work" className="py-32 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-end pb-8 mb-12 border-b border-white/10">
          <div>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
              [ WORK ]
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
              Selected Work
            </h2>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:px-4 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-xs text-neutral-500 mr-4">0{idx + 1}</span>
                <h3 className="font-display font-bold text-2xl text-white inline-block group-hover:text-neutral-300 transition-colors">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-neutral-400 block md:inline-block md:ml-4 mt-1 md:mt-0">
                  {project.category}
                </span>
              </div>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-neutral-400 group-hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
