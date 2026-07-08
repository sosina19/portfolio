import { PortfolioData } from './types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Sosina Yeshidnber",
    titles: [
      "Full Stack Engineer",
      "UI/UX Designer",
      "Creative Thinker",
      "TypeScript Specialist"
    ],
    location: "Ethiopia",
    avatarUrl: "/src/assets/images/ssssssssssssss.jpg",
    bgUrl: "/src/assets/images/portfolio_bg_1782834706463.jpg",
    aboutMeText: "I'm a Software Engineering student who enjoys building modern, user-friendly web applications that solve real-world problems. I have a strong interest in frontend development and creating responsive websites that look great and perform well across all devices.\n\nThrough personal projects and continuous learning, I've gained experience working with technologies like HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, and modern development tools. I enjoy turning ideas into functional products, or exploring new web technologies.\n\nI'm always looking to improve my skills by taking on challenging projects, learning industry best practices, and staying up to date with modern software development. My goal is to build software that is not only visually appealing but also fast, accessible, maintainable, and meaningful for the people who use it.",
    yearsOfExperience: 2,
    completedProjects: 7,
  },
  services: [
    {
      id: "s1",
      title: "Web Development",
      description: "Building fast, SEO-friendly, responsive websites and single-page applications using modern frameworks like React, Next.js, and Tailwind CSS.",
      iconName: "Code"
    },
    {
      id: "s2",
      title: "UI/UX Design",
      description: "Designing user-centric, high-fidelity interfaces and interactive prototypes in Figma, focusing on flawless accessibility and modern aesthetics.",
      iconName: "Palette"
    },
    {
      id: "s3",
      title: "API & Backend Systems",
      description: "Architecting secure, scaleable REST and GraphQL APIs using Express, Node.js, and modern databases like PostgreSQL and MongoDB.",
      iconName: "Server"
    },
    {
      id: "s4",
      title: "Mobile Optimization",
      description: "Ensuring applications are perfectly fluid and responsive across every device size, utilizing progressive web app patterns.",
      iconName: "Smartphone"
    }
  ],
  resume: [
    {
      id: "r1",
      type: "experience",
      period: "2024 - Present",
      title: "Lead Full Stack Engineer",
      organization: "TechVibe Solutions",
      description: "Spearheading front-end refactoring and server-side scalability improvements. Built critical responsive features, resulting in a 40% speed enhancement and 98% positive client satisfaction score."
    },
    {
      id: "r2",
      type: "experience",
      period: "2022 - 2024",
      title: "Software Engineer",
      organization: "AppForge Agency",
      description: "Designed, developed, and maintained custom web platforms and e-commerce services. Collaborated closely with designers to translate complex Figma screens into pristine, responsive interfaces."
    },
    {
      id: "r3",
      type: "education",
      period: "2018 - 2022",
      title: "Bachelor of Science in Computer Science",
      organization: "Addis Ababa University",
      description: "Graduated with Honors. Specialized in Software Engineering, Database Systems, and Human-Computer Interaction (HCI)."
    },
    {
      id: "r4",
      type: "education",
      period: "2021",
      title: "Advanced Full Stack Web Nanodegree",
      organization: "Udacity",
      description: "Comprehensive practical specialization in advanced Javascript architectures, responsive mobile layouts, and secure API gateways."
    }
  ],
  skills: [
    { id: "sk1", name: "TypeScript & JavaScript", percentage: 95 },
    { id: "sk2", name: "React / React Native", percentage: 92 },
    { id: "sk3", name: "Node.js & Express", percentage: 88 },
    { id: "sk4", name: "Tailwind CSS & Styling", percentage: 95 },
    { id: "sk5", name: "SQL & NoSQL Databases", percentage: 85 },
    { id: "sk6", name: "Figma & UI/UX Design", percentage: 80 }
  ],
  projects: [
    {
      id: "p1",
      title: "QR Attendance System",
      category: "Web App",
      imageUrl: "/src/assets/images/qr_attendance_1782838206108.jpg",
      description: "A digital check-in platform utilizing dynamic QR code scanning, geolocation verification, and a live reporting dashboard for automated school/workspace attendance tracking.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "HTML5 QR Scanner"],
      demoUrl: "https://example.com/demo",
      githubUrl: "https://github.com"
    },
    {
      id: "p2",
      title: "Digital Hotel Menu",
      category: "Mobile App",
      imageUrl: "/src/assets/images/hotel_menu_1782838219123.jpg",
      description: "An elegant, interactive digital restaurant and hotel menu supporting contactless QR ordering, rich food item galleries, real-time cart customization, and smooth animations.",
      technologies: ["React", "Motion", "Tailwind CSS", "LocalStorage"],
      demoUrl: "https://example.com/agency",
      githubUrl: "https://github.com"
    },
    {
      id: "p3",
      title: "Digital Marketing Platform",
      category: "Productivity",
      imageUrl: "/src/assets/images/marketing_platform_1782838233661.jpg",
      description: "A cohesive marketing automation dashboard showing live advertising campaign stats, dynamic SEO performance logs, conversion funnel analytics, and client reach metrics.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
      demoUrl: "https://example.com/pwa",
      githubUrl: "https://github.com"
    },
    {
      id: "p4",
      title: "YouTube Clone",
      category: "Web App",
      imageUrl: "/src/assets/images/youtube_clone_1782838247057.jpg",
      description: "A high-fidelity video streaming site interface featuring custom video card layouts, responsive sidebar categories, a polished player UI, and interactive comments and reactions.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
      demoUrl: "https://example.com/api",
      githubUrl: "https://github.com"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Marcus Aurelius",
      role: "Product Director",
      company: "Apex Dynamics",
      avatarUrl: "https://picsum.photos/seed/marcus/100/100",
      comment: "Sosina is a phenomenal engineer. She stepped into our project, cleaned up the frontend architecture, and delivered a high-performance web platform on time. Highly recommended!",
      rating: 5
    },
    {
      id: "t2",
      name: "Elena Rostova",
      role: "Creative Founder",
      company: "Studio Bloom",
      avatarUrl: "https://picsum.photos/seed/elena/100/100",
      comment: "Her eye for visual quality and precise UX execution is spectacular. Working with Sosina was a smooth and inspiring experience.",
      rating: 5
    }
  ],
  contactInfo: {
    email: "yeshidnbersosina@gmail.com",
    phone: "+251 911 234567",
    address: "Ethiopia",
    latitude: 9.0104,
    longitude: 38.7616,
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  }
};
