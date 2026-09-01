import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Calendar, MapPin, ArrowUpRight, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const TimelineSection = ({ onSelectExperience }) => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 relative bg-[#08080a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-white/10"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
              04 / INDUSTRY TRAJECTORY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Incubation & Exhibitions
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm mt-4 sm:mt-0 text-left sm:text-right">
            Verified milestones across T-HUB, ESG Global Summit, and India Mobile Congress
          </p>
        </motion.div>

        {/* Timeline Cards with Staggered Motion */}
        <div className="space-y-8">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="minimal-card p-6 sm:p-8 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
            >
              
              {/* Media Preview Frame */}
              <div className="lg:col-span-4 rounded-lg overflow-hidden aspect-[4/3] bg-zinc-950 border border-white/10 relative">
                <img
                  src={item.coverImage}
                  alt={item.organization}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-white bg-black/80 px-2.5 py-1 rounded border border-white/15">
                    {item.images.length} Photos
                  </span>
                  
                  <a
                    href="#gallery"
                    onClick={() => onSelectExperience && onSelectExperience(item.id)}
                    className="p-1.5 rounded bg-white text-black hover:bg-zinc-200 transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Information */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                    <span className="text-white font-bold bg-white/10 px-2.5 py-1 rounded border border-white/15 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-zinc-200 transition-colors">
                    {item.organization}
                  </h3>
                  <h4 className="text-xs font-mono text-zinc-400 mb-4">
                    {item.role}
                  </h4>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {item.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Milestone {idx + 1}</span>
                  <a
                    href="#gallery"
                    onClick={() => onSelectExperience && onSelectExperience(item.id)}
                    className="inline-flex items-center gap-1 font-bold text-white hover:text-zinc-300 transition-colors"
                  >
                    <span>View Photos in Gallery</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
