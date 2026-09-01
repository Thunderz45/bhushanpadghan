import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

/* ── All pure image assets from College, ESG Global, IMC, T-HUB, and public work folders ── */
const GALLERY_IMAGES = [
  { id: 'img-1', src: '/work/T-HUB/1742577877638.jpeg', aspect: 'aspect-[3/4]', span: 'col-span-1' },
  { id: 'img-2', src: '/work/ESG Global/1742578266322.jpeg', aspect: 'aspect-[16/10]', span: 'col-span-1 sm:col-span-2' },
  { id: 'img-3', src: '/work/IMC/1763044187915.jpeg', aspect: 'aspect-[4/5]', span: 'col-span-1' },
  { id: 'img-4', src: '/work/T-HUB/1742577880611.jpeg', aspect: 'aspect-[16/9]', span: 'col-span-1 sm:col-span-2' },
  { id: 'img-5', src: '/work/College/1762955646604.jpeg', aspect: 'aspect-square', span: 'col-span-1' },
  { id: 'img-6', src: '/work/T-HUB/1742577913135.jpeg', aspect: 'aspect-[3/4]', span: 'col-span-1' },
  { id: 'img-7', src: '/work/ESG Global/1742578282732.jpeg', aspect: 'aspect-[16/10]', span: 'col-span-1' },
  { id: 'img-8', src: '/work/IMC/1763044191469.jpeg', aspect: 'aspect-[4/3]', span: 'col-span-1 sm:col-span-2' },
  { id: 'img-9', src: '/work/T-HUB/1763039276976.jpeg', aspect: 'aspect-square', span: 'col-span-1' },
  { id: 'img-10', src: '/work/College/1742578291400.jpeg', aspect: 'aspect-[3/4]', span: 'col-span-1' },
  { id: 'img-11', src: '/work/T-HUB/1763039281904.jpeg', aspect: 'aspect-[16/10]', span: 'col-span-1 sm:col-span-2' },
  { id: 'img-12', src: '/work/College/1762955654643.jpeg', aspect: 'aspect-[4/5]', span: 'col-span-1' },
  { id: 'img-13', src: '/work/T-HUB/1763043951571.jpeg', aspect: 'aspect-square', span: 'col-span-1' },
  { id: 'img-14', src: '/work/ESG Global/1742578291400.jpeg', aspect: 'aspect-[16/9]', span: 'col-span-1 sm:col-span-2' },
  { id: 'img-15', src: '/work/T-HUB/1763043953313.jpeg', aspect: 'aspect-[3/4]', span: 'col-span-1' },
  { id: 'img-16', src: '/work/1766305678604.jpeg', aspect: 'aspect-[4/3]', span: 'col-span-1' },
  { id: 'img-17', src: '/work/video/pexels-palefire-11447031.jpg', aspect: 'aspect-[3/4]', span: 'col-span-1' },
  { id: 'img-18', src: '/work/video/pexels-walls-io-440716388-15595296.jpg', aspect: 'aspect-[16/10]', span: 'col-span-1 sm:col-span-2' },
  { id: 'img-19', src: '/work/video/pexels-dkomov-34804000.jpg', aspect: 'aspect-square', span: 'col-span-1' },
];

export const GallerySection = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="gallery" className="relative w-full bg-[#050505] border-b border-white/10 py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">

        {/* Section Label Header */}
        <div className="mb-14 sm:mb-18">
          <p className="font-mono text-white/40 text-[11px] tracking-[0.35em] uppercase mb-4">
            VISUAL GALLERY
          </p>
          <h2 className="font-serif italic text-3xl sm:text-5xl text-white font-normal leading-none tracking-tight">
            Gallery
          </h2>
        </div>

        {/* ── RANDOM / ASYMMETRIC MASONRY IMAGE GRID (PURE IMAGES ONLY, NO TEXT/VIDEO) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          {GALLERY_IMAGES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              onClick={() => setSelectedImg(item.src)}
              className={`relative ${item.aspect} ${item.span} overflow-hidden rounded-xl bg-black border border-white/10 hover:border-white/40 transition-all duration-500 cursor-pointer group shadow-xl`}
            >
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-108 transition-all duration-700 ease-out"
              />

              {/* Hover Zoom Overlay Badge */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-2xl cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox High-Res Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl max-h-[85vh] overflow-hidden rounded-xl border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg}
                alt=""
                className="w-full h-full max-h-[85vh] object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
