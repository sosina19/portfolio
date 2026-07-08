import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Menu, 
  X,
  Home,
  User,
  Cpu,
  FileText,
  Briefcase,
  Mail
} from 'lucide-react';
import { Profile, ContactInfo } from '../types';

interface SidebarProps {
  profile: Profile;
  contactInfo: ContactInfo;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function Sidebar({
  profile,
  contactInfo,
  activeSection,
  onSectionClick
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'services', label: 'What I Do', icon: Cpu },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    onSectionClick(id);
    setIsOpen(false);
  };

  const socialIcons = [
    { icon: Github, url: contactInfo.socials.github, name: 'GitHub' },
    { icon: Linkedin, url: contactInfo.socials.linkedin, name: 'LinkedIn' },
  ].filter(social => social.url);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="mobile-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[#111418] border border-gray-800 text-white hover:text-[#20c997] transition-all duration-300 md:hidden shadow-lg focus:outline-none"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile Drawer */}
      {isOpen && (
        <div
          id="sidebar-mobile-overlay"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="portfolio-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-40 w-[260px] bg-[#111418] border-r border-gray-900 flex flex-col justify-between py-8 text-center transition-all duration-300 transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Profile Details */}
        <div className="px-6 flex flex-col items-center">
          <div className="relative w-28 h-28 mb-3 rounded-full overflow-hidden border-[6px] border-[#1d2127] shadow-xl group">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <h1 className="text-white text-lg font-bold tracking-wide mt-2 font-display">
            {profile.name}
          </h1>
          <div className="w-12 h-[2px] bg-[#20c997] my-4 rounded-full" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 my-4 overflow-y-auto px-4 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleLinkClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'text-[#20c997] bg-[#20c997]/10'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Social Icons & Copyright */}
        <div className="px-6 mt-auto">
          <div className="flex justify-center gap-3 mb-4">
            {socialIcons.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#1d2127] text-gray-400 hover:text-white hover:bg-[#20c997] transition-all duration-300 focus:outline-none"
                  aria-label={social.name}
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
          <p className="text-[11px] text-gray-500 font-mono">
            © {new Date().getFullYear()} {profile.name.split(' ')[0]}
          </p>
        </div>
      </aside>
    </>
  );
}
