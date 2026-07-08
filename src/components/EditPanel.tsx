import React, { useState } from 'react';
import { 
  PortfolioData, 
  UserMessage,
  Skill,
  Service,
  ResumeItem,
  Project,
  Testimonial
} from '../types';
import { 
  X, 
  RotateCcw, 
  Trash2, 
  Plus, 
  User, 
  Cpu, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Mail, 
  ChevronRight,
  Info
} from 'lucide-react';

interface EditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onChange: (updatedData: PortfolioData) => void;
  onReset: () => void;
  messages: UserMessage[];
  onClearMessages: () => void;
}

export default function EditPanel({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
  messages,
  onClearMessages
}: EditPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'resume' | 'projects' | 'contact' | 'messages'>('profile');

  if (!isOpen) return null;

  // Handler helpers
  const updateProfile = (field: string, value: any) => {
    onChange({
      ...data,
      profile: {
        ...data.profile,
        [field]: value
      }
    });
  };

  const handleTitlesChange = (titlesStr: string) => {
    const arr = titlesStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    updateProfile('titles', arr);
  };

  const updateContactInfo = (field: string, value: any) => {
    onChange({
      ...data,
      contactInfo: {
        ...data.contactInfo,
        [field]: value
      }
    });
  };

  const updateSocials = (socialField: string, value: string) => {
    onChange({
      ...data,
      contactInfo: {
        ...data.contactInfo,
        socials: {
          ...data.contactInfo.socials,
          [socialField]: value
        }
      }
    });
  };

  // Skill manipulations
  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    const updated = data.skills.map(s => s.id === id ? { ...s, [field]: value } : s);
    onChange({ ...data, skills: updated });
  };

  const deleteSkill = (id: string) => {
    const filtered = data.skills.filter(s => s.id !== id);
    onChange({ ...data, skills: filtered });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `sk_new_${Date.now()}`,
      name: 'New Tech Skill',
      percentage: 80
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  // Service manipulations
  const updateService = (id: string, field: keyof Service, value: any) => {
    const updated = data.services.map(s => s.id === id ? { ...s, [field]: value } : s);
    onChange({ ...data, services: updated });
  };

  const deleteService = (id: string) => {
    const filtered = data.services.filter(s => s.id !== id);
    onChange({ ...data, services: filtered });
  };

  const addService = () => {
    const newService: Service = {
      id: `s_new_${Date.now()}`,
      title: 'Full Stack Engineering',
      description: 'Custom description of the engineering service details offered.',
      iconName: 'Code'
    };
    onChange({ ...data, services: [...data.services, newService] });
  };

  // Resume item manipulations
  const updateResumeItem = (id: string, field: keyof ResumeItem, value: any) => {
    const updated = data.resume.map(r => r.id === id ? { ...r, [field]: value } : r);
    onChange({ ...data, resume: updated });
  };

  const deleteResumeItem = (id: string) => {
    const filtered = data.resume.filter(r => r.id !== id);
    onChange({ ...data, resume: filtered });
  };

  const addResumeItem = (type: 'education' | 'experience') => {
    const newItem: ResumeItem = {
      id: `r_new_${Date.now()}`,
      type,
      period: '2025 - 2026',
      title: type === 'education' ? 'Graduate Certification' : 'Software Analyst Role',
      organization: 'Tech Academy Inc',
      description: 'Describe the primary responsibilities, courses taken, or highlights achieved.'
    };
    onChange({ ...data, resume: [...data.resume, newItem] });
  };

  // Project manipulations
  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = data.projects.map(p => {
      if (p.id === id) {
        const updatedProj = { ...p, [field]: value };
        if (field === 'title') {
          const titleLower = value.toLowerCase();
          if (titleLower.includes('attendance') || titleLower.includes('qr')) {
            updatedProj.imageUrl = '/src/assets/images/qr_attendance_1782838206108.jpg';
          } else if (titleLower.includes('menu') || titleLower.includes('hotel') || titleLower.includes('food')) {
            updatedProj.imageUrl = '/src/assets/images/hotel_menu_1782838219123.jpg';
          } else if (titleLower.includes('marketing') || titleLower.includes('seo') || titleLower.includes('platform')) {
            updatedProj.imageUrl = '/src/assets/images/marketing_platform_1782838233661.jpg';
          } else if (titleLower.includes('youtube') || titleLower.includes('video') || titleLower.includes('clone')) {
            updatedProj.imageUrl = '/src/assets/images/youtube_clone_1782838247057.jpg';
          }
        }
        return updatedProj;
      }
      return p;
    });
    onChange({ ...data, projects: updated });
  };

  const handleProjectTechnologies = (id: string, techStr: string) => {
    const arr = techStr.split(',').map(s => s.trim()).filter(Boolean);
    updateProject(id, 'technologies', arr);
  };

  const deleteProject = (id: string) => {
    const filtered = data.projects.filter(p => p.id !== id);
    onChange({ ...data, projects: filtered });
  };

  const addProject = () => {
    const newProject: Project = {
      id: `p_new_${Date.now()}`,
      title: 'New Creative Concept',
      category: 'Web App',
      imageUrl: 'https://picsum.photos/seed/newproj/600/400',
      description: 'A detailed exploration of an outstanding engineering build with responsive panels and dark canvas themes.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  // Testimonial manipulations
  const updateTestimonial = (id: string, field: keyof Testimonial, value: any) => {
    const updated = data.testimonials.map(t => t.id === id ? { ...t, [field]: value } : t);
    onChange({ ...data, testimonials: updated });
  };

  const deleteTestimonial = (id: string) => {
    const filtered = data.testimonials.filter(t => t.id !== id);
    onChange({ ...data, testimonials: filtered });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: `t_new_${Date.now()}`,
      name: 'Sarah Connor',
      role: 'Operations Director',
      company: 'Cyberdyne Systems',
      avatarUrl: 'https://picsum.photos/seed/sarah/100/100',
      comment: 'An absolutely stellar job! The design is stunning and the interaction speed is unmatched.',
      rating: 5
    };
    onChange({ ...data, testimonials: [...data.testimonials, newTestimonial] });
  };

  interface TabButton {
    id: 'profile' | 'services' | 'resume' | 'projects' | 'contact' | 'messages';
    label: string;
    icon: React.ComponentType<any>;
    highlight?: boolean;
  }

  const tabButtons: TabButton[] = [
    { id: 'profile', label: 'Profile & Stats', icon: User },
    { id: 'services', label: 'What I Do', icon: Cpu },
    { id: 'resume', label: 'Resume & Skills', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'messages', label: `Messages (${messages.length})`, icon: Mail, highlight: messages.length > 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden animate-fade-in">
      {/* Background Dark Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
      />

      {/* Editor Main Sidebar */}
      <div className="relative w-full max-w-4xl bg-[#111418] border-l border-gray-800 flex h-full shadow-2xl z-10 animate-slide-in">
        
        {/* Left Side: Editor Sidebar Tabs */}
        <div className="w-[200px] sm:w-[240px] border-r border-gray-900 bg-[#14181d] flex flex-col justify-between py-6 flex-shrink-0">
          <div>
            <div className="px-5 mb-6 flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-gray-500 uppercase">
                Editor Sections
              </span>
            </div>

            <nav className="px-3 space-y-1">
              {tabButtons.map((btn) => {
                const Icon = btn.icon;
                const isActive = activeTab === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => setActiveTab(btn.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'text-[#20c997] bg-[#20c997]/10'
                        : btn.highlight 
                          ? 'text-yellow-400 bg-yellow-500/5 hover:bg-gray-800'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate">{btn.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick actions at bottom of editor side tab */}
          <div className="px-4">
            <button
              onClick={() => {
                if(window.confirm('Are you sure you want to reset all portfolio details back to default values? Any changes you made will be deleted.')) {
                  onReset();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Right Side: Active Tab Customization Panel */}
        <div className="flex-1 flex flex-col h-full bg-[#111418]">
          
          {/* Editor Header */}
          <header className="px-6 py-5 border-b border-gray-900 flex justify-between items-center bg-[#14181d]">
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg font-display">
                Customize Portfolio
              </h3>
              <p className="text-[11px] text-gray-500 font-mono">
                Click fields to edit live. Your changes auto-save.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close editor"
            >
              <X size={18} />
            </button>
          </header>

          {/* Form Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-white">
            
            {/* 1. PROFILE & STATS TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-[#20c997]/5 border border-[#20c997]/10 flex gap-3 text-sm text-[#20c997]/80 leading-relaxed font-sans">
                  <Info size={18} className="flex-shrink-0 mt-0.5" />
                  <span>Customize your primary titles and background avatar seed nodes. Changes sync instantly!</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      value={data.profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Location / Location Subtitle</label>
                    <input
                      type="text"
                      value={data.profile.location}
                      onChange={(e) => updateProfile('location', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Professional Titles (comma separated)</label>
                  <input
                    type="text"
                    value={data.profile.titles.join(', ')}
                    onChange={(e) => handleTitlesChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none"
                    placeholder="Full Stack Engineer, UI/UX Designer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">About Me / Bio Biography</label>
                  <textarea
                    rows={4}
                    value={data.profile.aboutMeText}
                    onChange={(e) => updateProfile('aboutMeText', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none resize-none"
                  />
                </div>

                <div className="border-t border-gray-900 pt-6">
                  <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider font-mono">
                    Numerical Achievements
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 font-medium">Years Experience</label>
                      <input
                        type="number"
                        value={data.profile.yearsOfExperience}
                        onChange={(e) => updateProfile('yearsOfExperience', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 rounded-xl bg-[#1b1f24] border border-gray-800 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 font-medium">Completed Projects</label>
                      <input
                        type="number"
                        value={data.profile.completedProjects}
                        onChange={(e) => updateProfile('completedProjects', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2 rounded-xl bg-[#1b1f24] border border-gray-800 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-900 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Custom Photo Nodes
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">Avatar Photo URL</label>
                      <input
                        type="text"
                        value={data.profile.avatarUrl}
                        onChange={(e) => updateProfile('avatarUrl', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 text-xs text-gray-300 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">Background Hero Backdrop URL</label>
                      <input
                        type="text"
                        value={data.profile.bgUrl}
                        onChange={(e) => updateProfile('bgUrl', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 text-xs text-gray-300 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 2. SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Services Offered
                  </h4>
                  <button
                    onClick={addService}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20c997] text-[#111418] text-xs font-bold transition-all duration-300 hover:bg-[#1baa80] cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {data.services.map((service, index) => (
                    <div key={service.id} className="p-4 bg-[#1b1f24] rounded-2xl border border-gray-800/60 space-y-3 relative group">
                      <button
                        onClick={() => deleteService(service.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 size={14} />
                      </button>
                      <span className="text-xs text-gray-500 font-mono">Service #{index + 1}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Service Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => updateService(service.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Lucide Icon String</label>
                          <select
                            value={service.iconName}
                            onChange={(e) => updateService(service.id, 'iconName', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none text-white"
                          >
                            <option value="Code">Code (Tags)</option>
                            <option value="Palette">Palette (UX)</option>
                            <option value="Server">Server (Backend)</option>
                            <option value="Smartphone">Smartphone (Mobile)</option>
                            <option value="Cpu">Cpu (System)</option>
                            <option value="Database">Database (Tables)</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-medium">Short Description</label>
                        <textarea
                          rows={2}
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none resize-none text-gray-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. RESUME & SKILLS TAB */}
            {activeTab === 'resume' && (
              <div className="space-y-8">
                {/* SKILLS SUBSECTION */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                      Modify Skills Rating
                    </h4>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20c997] text-[#111418] text-xs font-bold transition-all duration-300 hover:bg-[#1baa80] cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar border border-gray-800/40 p-4 rounded-2xl bg-[#13171c]">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-[#1b1f24] rounded-xl border border-gray-800/40">
                        <div className="flex-1 space-y-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            className="w-full px-2 py-1.5 bg-[#111418] border border-gray-800 rounded-lg text-xs font-semibold focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-1/2">
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={skill.percentage}
                            onChange={(e) => updateSkill(skill.id, 'percentage', parseInt(e.target.value))}
                            className="flex-1 accent-[#20c997] bg-gray-800 h-1.5 rounded-lg cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold w-10 text-right text-[#20c997]">{skill.percentage}%</span>
                          <button
                            onClick={() => deleteSkill(skill.id)}
                            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIMELINE EDUCATION & EXPERIENCE SUBSECTIONS */}
                <div className="border-t border-gray-900 pt-6 space-y-6">
                  {/* EDUCATION SECTION */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                        Education Milestones
                      </h4>
                      <button
                        onClick={() => addResumeItem('education')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20c997] text-[#111418] text-xs font-bold transition-all duration-300 hover:bg-[#1baa80] cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Add Education</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.resume.filter(r => r.type === 'education').map((edu, index) => (
                        <div key={edu.id} className="p-4 bg-[#1b1f24] rounded-2xl border border-gray-800/60 space-y-3 relative">
                          <button
                            onClick={() => deleteResumeItem(edu.id)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="text-xs text-gray-500 font-mono">Education #{index + 1}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-gray-400 font-medium">Period / Dates</label>
                              <input
                                type="text"
                                value={edu.period}
                                onChange={(e) => updateResumeItem(edu.id, 'period', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-400 font-medium">Organization / University</label>
                              <input
                                type="text"
                                value={edu.organization}
                                onChange={(e) => updateResumeItem(edu.id, 'organization', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-medium">Degree Name / Field</label>
                            <input
                              type="text"
                              value={edu.title}
                              onChange={(e) => updateResumeItem(edu.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-medium">Summary Description</label>
                            <textarea
                              rows={2}
                              value={edu.description}
                              onChange={(e) => updateResumeItem(edu.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EXPERIENCE SECTION */}
                  <div className="space-y-4 border-t border-gray-900 pt-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                        Experience Milestones
                      </h4>
                      <button
                        onClick={() => addResumeItem('experience')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20c997] text-[#111418] text-xs font-bold transition-all duration-300 hover:bg-[#1baa80] cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Add Experience</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {data.resume.filter(r => r.type === 'experience').map((exp, index) => (
                        <div key={exp.id} className="p-4 bg-[#1b1f24] rounded-2xl border border-gray-800/60 space-y-3 relative">
                          <button
                            onClick={() => deleteResumeItem(exp.id)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="text-xs text-gray-500 font-mono">Experience #{index + 1}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs text-gray-400 font-medium">Period / Dates</label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => updateResumeItem(exp.id, 'period', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-400 font-medium">Organization / Company</label>
                              <input
                                type="text"
                                value={exp.organization}
                                onChange={(e) => updateResumeItem(exp.id, 'organization', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-medium">Position / Role Title</label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateResumeItem(exp.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-medium">Summary Description</label>
                            <textarea
                              rows={2}
                              value={exp.description}
                              onChange={(e) => updateResumeItem(exp.id, 'description', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 4. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Portfolio Projects
                  </h4>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20c997] text-[#111418] text-xs font-bold transition-all duration-300 hover:bg-[#1baa80] cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {data.projects.map((proj, index) => (
                    <div key={proj.id} className="p-5 bg-[#1b1f24] rounded-2xl border border-gray-800/60 space-y-4 relative">
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                      <span className="text-xs text-gray-500 font-mono">Project #{index + 1}</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => updateProject(proj.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-sm focus:outline-none"
                            placeholder="e.g. Web App, Mobile"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Image URL</label>
                          <input
                            type="text"
                            value={proj.imageUrl}
                            onChange={(e) => updateProject(proj.id, 'imageUrl', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none text-gray-400 font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Technologies (comma separated)</label>
                          <input
                            type="text"
                            value={proj.technologies.join(', ')}
                            onChange={(e) => handleProjectTechnologies(proj.id, e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none"
                            placeholder="React, Tailwind, Node"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">Live Demo URL (Optional)</label>
                          <input
                            type="text"
                            value={proj.demoUrl || ''}
                            onChange={(e) => updateProject(proj.id, 'demoUrl', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none text-gray-400"
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 font-medium">GitHub Repository URL (Optional)</label>
                          <input
                            type="text"
                            value={proj.githubUrl || ''}
                            onChange={(e) => updateProject(proj.id, 'githubUrl', e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none text-gray-400"
                            placeholder="https://github.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 font-medium">Detailed Description</label>
                        <textarea
                          rows={3}
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#111418] border border-gray-800 text-xs focus:outline-none resize-none text-gray-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. CONTACT INFO TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                  Primary Contact Metadata
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={data.contactInfo.email}
                      onChange={(e) => updateContactInfo('email', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Phone Number</label>
                    <input
                      type="text"
                      value={data.contactInfo.phone}
                      onChange={(e) => updateContactInfo('phone', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 font-mono uppercase tracking-wider">Physical Address</label>
                  <input
                    type="text"
                    value={data.contactInfo.address}
                    onChange={(e) => updateContactInfo('address', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1f24] border border-gray-800 focus:border-[#20c997]/60 text-sm focus:outline-none"
                  />
                </div>

                <div className="border-t border-gray-900 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Social Media Profiles Handles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">GitHub URL</label>
                      <input
                        type="text"
                        value={data.contactInfo.socials.github || ''}
                        onChange={(e) => updateSocials('github', e.target.value)}
                        className="w-full px-3 py-2 bg-[#1b1f24] border border-gray-800 rounded-lg text-xs"
                        placeholder="https://github.com/your-username"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-medium">LinkedIn URL</label>
                      <input
                        type="text"
                        value={data.contactInfo.socials.linkedin || ''}
                        onChange={(e) => updateSocials('linkedin', e.target.value)}
                        className="w-full px-3 py-2 bg-[#1b1f24] border border-gray-800 rounded-lg text-xs"
                        placeholder="https://linkedin.com/in/your-username"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* 7. RECEIVED MESSAGES TAB (SANDBOX ENABLER!) */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider font-mono">
                    Inbox Sandbox ({messages.length})
                  </h4>
                  {messages.length > 0 && (
                    <button
                      onClick={onClearMessages}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-bold transition-all duration-300 cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Clear Messages</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-[#1b1f24] rounded-2xl border border-gray-800/60 space-y-2 text-sm">
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gray-900 pb-2">
                        <div>
                          <p className="font-bold text-gray-200">{msg.name}</p>
                          <p className="text-xs text-gray-500 hover:text-[#20c997] transition-colors">
                            <a href={`mailto:${msg.email}`}>{msg.email}</a>
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono bg-black/40 px-2 py-0.5 rounded border border-gray-800">
                          {msg.timestamp}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-[#20c997] uppercase tracking-wider">Subject:</p>
                        <p className="font-semibold text-gray-300">{msg.subject}</p>
                      </div>
                      <div className="space-y-1 pt-1.5">
                        <p className="text-xs font-mono text-[#20c997] uppercase tracking-wider">Message Content:</p>
                        <p className="text-gray-400 font-sans leading-relaxed bg-black/30 p-3 rounded-xl border border-gray-900">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div className="text-center py-12 bg-[#1b1f24] border border-gray-800/40 rounded-2xl flex flex-col items-center justify-center gap-3">
                      <div className="p-3 rounded-full bg-gray-800/40 text-gray-500">
                        <Mail size={24} />
                      </div>
                      <p className="text-sm text-gray-400 font-medium">
                        Your Sandbox Inbox is Empty!
                      </p>
                      <p className="text-xs text-gray-500 max-w-xs font-sans">
                        Try filling out the contact form on the contact page, then click "Send Message" to watch it populate here in real-time.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
