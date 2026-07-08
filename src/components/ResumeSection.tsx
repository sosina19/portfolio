import React from 'react';
import { ResumeItem, Skill } from '../types';
import { Briefcase, GraduationCap } from 'lucide-react';

interface ResumeSectionProps {
  resume: ResumeItem[];
  skills: Skill[];
}

export default function ResumeSection({ resume, skills }: ResumeSectionProps) {
  const educationItems = resume.filter(item => item.type === 'education');
  const experienceItems = resume.filter(item => item.type === 'experience');

  return (
    <section
      id="resume"
      className="py-20 px-6 sm:px-12 bg-[#1b1f24] text-white border-b border-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase opacity-5 select-none font-sans absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full text-center">
            Summary
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold relative z-10 font-display">
            Resume
          </h2>
          <div className="w-16 h-[3px] bg-[#20c997] mx-auto mt-3 rounded-full" />
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Education Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#20c997]/10 border border-[#20c997]/20 text-[#20c997]">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-100">
                My Education
              </h3>
            </div>

            <div className="relative border-l-2 border-gray-800 ml-4 pl-6 space-y-8">
              {educationItems.map((edu) => (
                <div key={edu.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#111418] border-2 border-[#20c997] group-hover:bg-[#20c997] transition-all duration-300" />
                  
                  {/* Details Card */}
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 text-xs font-mono font-bold bg-[#20c997]/10 text-[#20c997] rounded-full border border-[#20c997]/20">
                      {edu.period}
                    </span>
                    <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                      {edu.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      {edu.organization}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans pt-1">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#20c997]/10 border border-[#20c997]/20 text-[#20c997]">
                <Briefcase size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-100">
                My Experience
              </h3>
            </div>

            <div className="relative border-l-2 border-gray-800 ml-4 pl-6 space-y-8">
              {experienceItems.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#111418] border-2 border-[#20c997] group-hover:bg-[#20c997] transition-all duration-300" />
                  
                  {/* Details Card */}
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 text-xs font-mono font-bold bg-[#20c997]/10 text-[#20c997] rounded-full border border-[#20c997]/20">
                      {exp.period}
                    </span>
                    <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">
                      {exp.organization}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans pt-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Technical Skills Section */}
        <div className="mt-20 pt-16 border-t border-gray-800/60">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-100 mb-8 text-center sm:text-left">
            My Skills
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-gray-200">
                  <span className="font-sans">{skill.name}</span>
                  <span className="font-mono text-[#20c997]">{skill.percentage}%</span>
                </div>
                {/* Progress track */}
                <div className="w-full h-2 bg-[#111418] rounded-full overflow-hidden border border-gray-800">
                  <div
                    className="h-full bg-[#20c997] rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(32,201,151,0.4)]"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
