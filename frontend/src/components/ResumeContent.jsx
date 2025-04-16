import profileImage from "../assets/images/profile.jpeg";
import qrCodeImage from "../assets/images/frame.png";
// We don't need to import React Icons here as we'll just use identifiers

const ResumeContent = {
  personalInfo: {
    name: "Elias Hagos",
    title: "Full-Stack Developer",
    email: {
      text: "eliasars@yahoo.com",
      icon: "email" // Icon identifier for the PDF generator
    },
    phone: {
      text: "+358449125794",
      icon: "phone" // Icon identifier for the PDF generator
    },
    location: {
      text: "Helsinki, Finland",
      icon: "location" // Icon identifier for the PDF generator
    },
    photo: profileImage,
    qrCode: qrCodeImage,
    summary: "Humanities graduate with two years of government and non-governmental work experience, transitioning into web development. Combining strong analytical skills from humanities background with emerging technical expertise in web technologies. Passionate about learning and overcoming new challenges in web development."
  },

  stats: [
    { value: "1+", label: "Years Experience" },
    { value: "10+", label: "Projects" }
  ],

  experience: [
    {
      position: "freelancer",
      company: "Digital Agency",
      period: "2025-present",
      description: "Developed responsive websites and e-commerce platforms for various clients using modern frontend and backend frameworks."
    },
    {
      position: "Capacity Building Officer",
      company: "INSA, Ethiopia",
      period: "2010-12",
      description: "Part of the capacity building team in INSA a governmental organization and served as capacity building expert."
    }
  ],

  education: [
    {
      degree: "Full Stack Web Development",
      institution: "Business College Helsinki",
      year: "2025"
    },
    {
      degree: "Master of Arts in Adult Education and Developmental Work Research",
      institution: "University of Helsinki",
      year: "2015"
    },
    {
      degree: "Bachelor of Arts in Educational Planning and Management",
      institution: "Addis Ababa University",
      year: "2009"
    }
  ],

  skills: [
    { name: "React", level: 90, featured: true },
    { name: "PHP", level: 85, featured: true },
    { name: "JavaScript", level: 95, featured: true },
    { name: "Symfony", level: 80 },
    { name: "CSS/SCSS", level: 85 },
    { name: "Postgresql", level: 75 }
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