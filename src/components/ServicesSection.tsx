import React from 'react';
import * as Icons from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  // Helper to dynamically render a Lucide icon from its name string
  const renderIcon = (iconName: string) => {
    // Fallback to 'Code' if not found
    const IconComponent = (Icons as any)[iconName] || Icons.Code;
    return <IconComponent size={28} className="text-[#20c997]" />;
  };

  return (
    <section
      id="services"
      className="py-20 px-6 sm:px-12 bg-[#111418] text-white border-b border-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase opacity-5 select-none font-sans absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full text-center">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold relative z-10 font-display">
            What I Do
          </h2>
          <div className="w-16 h-[3px] bg-[#20c997] mx-auto mt-3 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex gap-6 p-8 rounded-2xl bg-[#1b1f24] border border-gray-800/40 shadow-lg hover:border-[#20c997]/20 hover:shadow-[#20c997]/5 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#111418] border border-gray-800 flex items-center justify-center group-hover:bg-[#20c997]/10 group-hover:border-[#20c997]/30 transition-colors duration-300">
                {renderIcon(service.iconName)}
              </div>

              {/* Service Details */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300 font-display">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
