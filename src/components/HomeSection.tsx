import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Profile } from '../types';

interface HomeSectionProps {
  profile: Profile;
  onScrollToSection: (sectionId: string) => void;
}

export default function HomeSection({ profile, onScrollToSection }: HomeSectionProps) {
  const [displayText, setDisplayText] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect cycling through profile.titles
  useEffect(() => {
    if (!profile.titles || profile.titles.length === 0) return;

    const currentFullTitle = profile.titles[titleIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setDisplayText(currentFullTitle.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);
      }, 50);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setDisplayText(currentFullTitle.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);
      }, 100);
    }

    // Handle lifecycle transitions
    if (!isDeleting && charIdx === currentFullTitle.length) {
      // Finished typing, wait before deleting
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIdx === 0) {
      // Finished deleting, shift to next title
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % profile.titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx, profile.titles]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-black"
    >
      {/* Background Image with Dark Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={profile.bgUrl}
          alt="Workspace backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 filter scale-105 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#111418]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-4 py-16">
        <p className="text-white/80 font-medium tracking-widest uppercase text-xs sm:text-sm bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-xs animate-fade-in font-mono">
          Welcome
        </p>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mt-2 font-display">
          I'm <span className="text-[#20c997]">{profile.name}</span>
        </h2>

        {/* Dynamic Typewriting Title */}
        <div className="h-10 sm:h-12 flex items-center justify-center">
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 font-medium">
            a <span className="border-r-2 border-[#20c997] pr-1.5 py-0.5 animate-pulse text-white">{displayText || '\u00A0'}</span>
          </p>
        </div>

        <p className="text-sm sm:text-base text-gray-400 max-w-xl mt-3 leading-relaxed font-sans">
          based in {profile.location}.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={() => onScrollToSection('contact')}
            className="px-8 py-3.5 rounded-full border border-[#20c997] text-[#20c997] font-semibold tracking-wide text-sm bg-transparent hover:bg-[#20c997] hover:text-[#111418] shadow-lg shadow-[#20c997]/5 hover:shadow-[#20c997]/20 transition-all duration-300 transform active:scale-95 focus:outline-none"
          >
            Hire Me
          </button>
          <button
            onClick={() => onScrollToSection('about')}
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold tracking-wide text-sm border border-white/5 hover:border-white/10 transition-all duration-300 transform active:scale-95 focus:outline-none"
          >
            Explore My Work
          </button>
        </div>
      </div>

      {/* Bounce Arrow Scroll Indicator */}
      <button
        onClick={() => onScrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-400 hover:text-white transition-colors duration-300 animate-bounce focus:outline-none p-2"
        aria-label="Scroll down to About section"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
}
