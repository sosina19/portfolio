import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto scroll testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIdx];

  return (
    <section
      id="testimonials"
      className="py-20 px-6 sm:px-12 bg-[#1b1f24] text-white border-b border-gray-900 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase opacity-5 select-none font-sans absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full text-center">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold relative z-10 font-display">
            Testimonials
          </h2>
          <div className="w-16 h-[3px] bg-[#20c997] mx-auto mt-3 rounded-full" />
        </div>

        {/* Carousel Slider Panel */}
        <div className="relative bg-[#111418] border border-gray-800/60 p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col items-center text-center gap-6">
          
          {/* Big Quote Accent */}
          <div className="text-[#20c997]/10 absolute top-6 left-6 select-none pointer-events-none">
            <Quote size={80} />
          </div>

          {/* Stars Rating Row */}
          <div className="flex gap-1 justify-center text-amber-500">
            {Array.from({ length: current?.rating || 5 }).map((_, idx) => (
              <Star key={idx} size={16} fill="currentColor" />
            ))}
          </div>

          {/* Testimonial Message */}
          <p className="text-gray-300 text-base sm:text-lg italic leading-relaxed font-sans max-w-2xl relative z-10">
            "{current?.comment}"
          </p>

          {/* Reviewer Details */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#20c997] shadow-md flex-shrink-0">
              <img
                src={current?.avatarUrl}
                alt={current?.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-bold text-gray-200 font-display">
                {current?.name}
              </h4>
              <p className="text-xs text-[#20c997] font-mono">
                {current?.role} @ {current?.company}
              </p>
            </div>
          </div>

          {/* Interactive Navigation Elements */}
          {testimonials.length > 1 && (
            <>
              {/* Arrow controls (absolute layout on desktops, inline flex on mobile) */}
              <div className="flex gap-4 sm:absolute sm:inset-y-0 sm:left-4 sm:right-4 sm:justify-between sm:items-center sm:pointer-events-none mt-4 sm:mt-0">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-[#1b1f24] hover:bg-[#20c997] hover:text-[#111418] border border-gray-800 text-gray-400 transition-all duration-300 pointer-events-auto shadow-md focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-[#1b1f24] hover:bg-[#20c997] hover:text-[#111418] border border-gray-800 text-gray-400 transition-all duration-300 pointer-events-auto shadow-md focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-2 justify-center mt-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                      activeIdx === idx
                        ? 'bg-[#20c997] w-6'
                        : 'bg-gray-700 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
