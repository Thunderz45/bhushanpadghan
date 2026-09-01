import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Bot, Code, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const SkillsBento = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-24 relative bg-[#08080a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-16 border-b border-white/10"
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
              03 / TECHNICAL MASTERY
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Skills & Stack Spectrum
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-sm mt-4 sm:mt-0 text-left sm:text-right">
            Mastery in AI engineering, web frameworks, and backend data processing
          </p>
        </motion.div>

        {/* 3 Main Competency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="minimal-card p-8 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">AI & LLM Systems</h3>
            </div>
            <div className="space-y-4">
              {skills.ai.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-300">{item.name}</span>
                    <span className="text-white font-bold">{item.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-white rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="minimal-card p-8 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">Full-Stack Web</h3>
            </div>
            <div className="space-y-4">
              {skills.web.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-300">{item.name}</span>
                    <span className="text-white font-bold">{item.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-zinc-300 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="minimal-card p-8 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">Automation & Data</h3>
            </div>
            <div className="space-y-4">
              {skills.automation.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-zinc-300">{item.name}</span>
                    <span className="text-white font-bold">{item.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-zinc-400 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Technologies Spectrum Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-xl bg-zinc-900/60 border border-white/10"
        >
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-6">
            Technologies & Frameworks Spectrum
          </h4>
          <div className="flex flex-wrap gap-2.5 font-mono text-xs">
            {skills.tools.map((tool, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3.5 py-1.5 rounded bg-black border border-white/10 text-zinc-300 hover:text-white hover:border-white transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
