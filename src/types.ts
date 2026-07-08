export interface Profile {
  name: string;
  titles: string[]; // for typewriter effect
  location: string;
  avatarUrl: string;
  bgUrl: string;
  aboutMeText: string;
  yearsOfExperience: number;
  completedProjects: number;
  happyClients?: number;
  cupsOfCoffee?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // references lucide icons
}

export interface ResumeItem {
  id: string;
  type: 'education' | 'experience';
  period: string;
  title: string;
  organization: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  comment: string;
  rating: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
  socials: {
    facebook?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    dribbble?: string;
  };
}

export interface PortfolioData {
  profile: Profile;
  services: Service[];
  resume: ResumeItem[];
  skills: Skill[];
  projects: Project[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
}

export interface UserMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
