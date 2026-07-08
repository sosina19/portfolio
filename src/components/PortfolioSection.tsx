import React, { useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, ZoomIn } from 'lucide-react';

interface PortfolioSectionProps {
  projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Extract unique categories dynamically from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="py-20 px-6 sm:px-12 bg-[#111418] text-white border-b border-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 relative">
          <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold uppercase opacity-5 select-none font-sans absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full text-center">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold relative z-10 font-display">
            My Work
          </h2>
          <div className="w-16 h-[3px] bg-[#20c997] mx-auto mt-3 rounded-full" />
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none ${
                selectedCategory === category
                  ? 'bg-[#20c997] text-[#111418] shadow-lg shadow-[#20c997]/15'
                  : 'bg-[#1b1f24] text-gray-400 hover:text-white border border-gray-800/60 hover:border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-[#1b1f24] border border-gray-800/60 shadow-xl transition-all duration-500 hover:border-[#20c997]/20 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                
                {/* Overlay Action Icon */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/10 text-white transform -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn size={18} className="text-[#20c997]" />
                </div>

                <div className="space-y-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#20c997]">
                    {project.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1 font-sans">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-sans">
            No projects found in this category yet. Click Customize to add yours!
          </div>
        )}

        {/* Project Detailed Modal Overlay */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div
              onClick={() => setActiveProject(null)}
              className="absolute inset-0"
            />
            
            <div className="relative w-full max-w-2xl bg-[#1b1f24] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 animate-scale-up max-h-[90vh]">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none"
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                {/* Project Banner */}
                <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-gray-800">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-mono font-bold bg-[#20c997] text-[#111418] rounded-full uppercase tracking-wider">
                    {activeProject.category}
                  </span>
                </div>

                {/* Info Header */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {activeProject.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    {activeProject.description}
                  </p>
                </div>

                {/* Technology Badges */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-500">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md text-xs font-semibold bg-[#111418] border border-gray-800 text-[#20c997]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800/60">
                  {activeProject.demoUrl && (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-[#20c997] hover:bg-[#1baa80] text-[#111418] font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 rounded-xl text-xs sm:text-sm transition-colors duration-300"
                    >
                      <Github size={16} />
                      <span>GitHub Code</span>
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
