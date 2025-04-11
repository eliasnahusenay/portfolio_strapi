// src/components/ResumeContent.jsx
import profileImage from "../assets/images/profile.jpeg";
import qrCodeImage from "../assets/images/frame.png";

const ResumeContent = {
  personalInfo: {
    name: "Elias Hagos",
    title: "Full-Stack Developer",
    email: "elias@example.com",
    phone: "+1 (234) 567-8900",
    location: "San Francisco, CA",
    photo: profileImage,
    qrCode: qrCodeImage,
    summary: "Full-stack developer with 5+ years experience building web applications. Specializing in React, Node.js, and modern web technologies to create responsive and user-friendly applications."
  },

  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects" },
    { value: "20+", label: "Clients" }
  ],

  experience: [
    {
      position: "Senior Developer",
      company: "Tech Solutions Inc.",
      period: "2020-Present",
      description: "Led team building SaaS platforms with React and Node.js. Implemented CI/CD pipelines and improved app performance by 40%."
    },
    {
      position: "Web Developer",
      company: "Digital Agency",
      period: "2018-2020",
      description: "Developed responsive websites and e-commerce platforms for various clients using modern frontend frameworks."
    }
  ],

  education: [
    {
      degree: "BSc Computer Science",
      institution: "Stanford University",
      year: "2016"
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Code Academy",
      year: "2017"
    }
  ],

  skills: [
    { name: "React", level: 90, featured: true },
    { name: "Node.js", level: 85, featured: true },
    { name: "JavaScript", level: 95, featured: true },
    { name: "TypeScript", level: 80 },
    { name: "CSS/SCSS", level: 85 },
    { name: "GraphQL", level: 75 }
  ],

  featuredSkills: [
    { name: "React", percentage: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", featured: true },
    { name: "Node.js", percentage: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", featured: true },
    { name: "JavaScript", percentage: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", featured: true }
  ],

  tools: [
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
  ]
};

export default ResumeContent;