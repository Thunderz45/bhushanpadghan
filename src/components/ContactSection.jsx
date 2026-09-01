import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Linkedin, Mail, MapPin } from 'lucide-react';

export const ContactSection = () => {
  const { personal } = portfolioData;

  return (
    <section id="contact" className="py-32 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="pb-8 mb-12 border-b border-white/10">
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
            [ CONTACT ]
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Contact
          </h2>
        </div>

        <div className="max-w-xl font-mono text-sm space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-white shrink-0" />
            <div>
              <span className="text-xs text-neutral-500 uppercase block">Email</span>
              <a href={`mailto:${personal.email}`} className="text-white hover:underline">
                {personal.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Linkedin className="w-5 h-5 text-white shrink-0 fill-current" />
            <div>
              <span className="text-xs text-neutral-500 uppercase block">LinkedIn</span>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                bhushan-padghan-049772284
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-white shrink-0" />
            <div>
              <span className="text-xs text-neutral-500 uppercase block">Location</span>
              <span className="text-white">{personal.location.city}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
