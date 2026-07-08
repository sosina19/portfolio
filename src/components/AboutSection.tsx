import React from 'react';
import { Profile } from '../types';

interface AboutSectionProps {
  profile: Profile;
  onScrollToSection: (sectionId: string) => void;
}

export default function AboutSection({ profile, onScrollToSection }: AboutSectionProps) {
  const stats = [
    { value: `${profile.yearsOfExperience}`, label: 'Years Experience' },
    { value: `${profile.completedProjects}+`, label: 'Projects Completed' }
  ];

  return (
    <section
      id="about"
      className="py-20 px-6 sm:px-12 bg-[#1b1f24] text-white border-b border-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase opacity-5 select-none font-sans absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full text-center">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold relative z-10 font-display">
            Know Me More
          </h2>
          <div className="w-16 h-[3px] bg-[#20c997] mx-auto mt-3 rounded-full" />
        </div>

        {/* Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              I'm <span className="text-[#20c997]">{profile.name}</span>, a Software Engineering student.
            </h3>
            <div className="text-gray-400 leading-relaxed text-sm sm:text-base font-sans space-y-4">
              {profile.aboutMeText.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="pt-2">
              <button
                onClick={() => onScrollToSection('resume')}
                className="px-6 py-3 bg-[#20c997] hover:bg-[#1baa80] text-[#111418] font-bold tracking-wide rounded-full text-sm shadow-lg shadow-[#20c997]/10 transition-all duration-300 transform active:scale-95 focus:outline-none"
              >
                View My Resume & Skills
              </button>
            </div>
          </div>

          {/* Right Side: Quick Stats Bento Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#111418] border border-gray-800/60 p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-all duration-300 hover:border-[#20c997]/30 hover:shadow-[#20c997]/5 hover:-translate-y-1 group"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-[#20c997] font-display mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Detailed Contact List strip below */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-gray-800/60 text-center sm:text-left">
          <div className="space-y-1.5">
            <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">Name:</p>
            <p className="text-sm font-semibold text-gray-200">{profile.name}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">Email:</p>
            <p className="text-sm font-semibold text-gray-200 break-words hover:text-[#20c997] transition-colors">
              <a href="mailto:yeshidnbersosina@gmail.com">yeshidnbersosina@gmail.com</a>
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">From:</p>
            <p className="text-sm font-semibold text-gray-200">{profile.location.split('(')[0].trim()}</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-gray-500 uppercase font-mono tracking-wider">Work Status:</p>
            <p className="text-sm font-semibold text-[#20c997]">Available for Hire</p>
          </div>
        </div>

      </div>
    </section>
  );
}
