import React, { useState, useEffect } from 'react';
import { PortfolioData, UserMessage } from './types';
import { defaultPortfolioData } from './data';

// Images
import ssssssssssssss from './assets/images/ssssssssssssss.jpg';
import qr_attendance from './assets/images/qr_attendance_1782838206108.jpg';
import hotel_menu from './assets/images/hotel_menu_1782838219123.jpg';
import marketing_platform from './assets/images/marketing_platform_1782838233661.jpg';
import youtube_clone from './assets/images/youtube_clone_1782838247057.jpg';

// Components
import Sidebar from './components/Sidebar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ResumeSection from './components/ResumeSection';
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';

const LOCAL_STORAGE_KEY_DATA = 'portfolio_data_v1';
const LOCAL_STORAGE_KEY_MESSAGES = 'user_messages_v1';

export default function App() {
  // Load state from local storage or fall back to default pre-populated data
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_DATA);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as PortfolioData;
        // Automatically use the newly uploaded avatar image
        if (parsed && parsed.profile) {
          parsed.profile.avatarUrl = ssssssssssssss;
        }
        // Filter out facebook, twitter, and dribbble from contact socials
        if (parsed && parsed.contactInfo && parsed.contactInfo.socials) {
          delete parsed.contactInfo.socials.facebook;
          delete parsed.contactInfo.socials.twitter;
          delete parsed.contactInfo.socials.dribbble;
        }
        // Migrate/update project images to match updated project titles automatically
        if (parsed && Array.isArray(parsed.projects)) {
          parsed.projects = parsed.projects.map((project) => {
            const titleLower = project.title.toLowerCase();
            if (titleLower.includes('attendance') || titleLower.includes('qr')) {
              return { ...project, imageUrl: qr_attendance };
            }
            if (titleLower.includes('menu') || titleLower.includes('hotel') || titleLower.includes('food')) {
              return { ...project, imageUrl: hotel_menu };
            }
            if (titleLower.includes('marketing') || titleLower.includes('seo') || titleLower.includes('platform')) {
              return { ...project, imageUrl: marketing_platform };
            }
            if (titleLower.includes('youtube') || titleLower.includes('video') || titleLower.includes('clone')) {
              return { ...project, imageUrl: youtube_clone };
            }
            return project;
          });
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }
    return defaultPortfolioData;
  });

  const [messages, setMessages] = useState<UserMessage[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_MESSAGES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved sandbox messages", e);
      }
    }
    return [];
  });

  const [activeSection, setActiveSection] = useState('home');

  // Sync state changes to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_DATA, JSON.stringify(portfolioData));
  }, [portfolioData]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // High-fidelity dynamic scroll section detection using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'resume', 'portfolio', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -45% 0px', // Highlights sections taking up the core screen view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleSendMessage = (newMsg: Omit<UserMessage, 'id' | 'timestamp'>) => {
    const completeMsg: UserMessage = {
      ...newMsg,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(prev => [completeMsg, ...prev]);
  };

  const handleResetData = () => {
    setPortfolioData(defaultPortfolioData);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-[#111418] text-white flex font-sans antialiased selection:bg-[#20c997] selection:text-[#111418]">
      
      {/* 1. Left Sticky Navigation Sidebar */}
      <Sidebar
        profile={portfolioData.profile}
        contactInfo={portfolioData.contactInfo}
        activeSection={activeSection}
        onSectionClick={handleScrollToSection}
      />

      {/* 2. Right Main Sequential Scrolling Canvas */}
      <main className="flex-1 md:pl-[260px] min-w-0 transition-all duration-300">
        
        {/* Sections */}
        <HomeSection
          profile={portfolioData.profile}
          onScrollToSection={handleScrollToSection}
        />
        
        <AboutSection
          profile={portfolioData.profile}
          onScrollToSection={handleScrollToSection}
        />
        
        <ServicesSection
          services={portfolioData.services}
        />
        
        <ResumeSection
          resume={portfolioData.resume}
          skills={portfolioData.skills}
        />
        
        <PortfolioSection
          projects={portfolioData.projects}
        />
        
        <ContactSection
          contactInfo={portfolioData.contactInfo}
          onSendMessage={handleSendMessage}
          sentMessagesCount={messages.length}
        />

      </main>



    </div>
  );
}
