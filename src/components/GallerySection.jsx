import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GallerySection = () => {
  const { gallery } = portfolioData;
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <section id="gallery" className="py-32 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="pb-8 mb-12 border-b border-white/10">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
            [ GALLERY ]
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="aspect-[4/3] bg-neutral-900 border border-white/10 overflow-hidden cursor-pointer group"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 bg-neutral-900 border border-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full max-h-[80vh] object-contain mx-auto border border-white"
              />
              <p className="text-center text-white font-mono text-xs mt-4">{lightboxImage.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
