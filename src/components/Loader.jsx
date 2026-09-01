import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds loading
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col justify-between p-8 sm:p-14 overflow-hidden select-none pointer-events-auto"
    >
      {/* ── Top Left: LOADING Label + Animated Bar ── */}
      <div className="flex flex-col items-start gap-2.5 max-w-[180px]">
        <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-300">
          LOADING
        </span>
        {/* Progress bar line */}
        <div className="w-36 sm:w-44 h-[1.5px] bg-neutral-800 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 bottom-0 bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── Bottom Right: Giant 1 - 100 Counter ── */}
      <div className="self-end flex items-baseline justify-end leading-none font-sans select-none">
        <span
          className="text-[16vw] sm:text-[18vw] text-white font-medium leading-none tracking-tighter"
          style={{ lineHeight: 0.8 }}
        >
          {progress}
        </span>
      </div>
    </motion.div>
  );
};
