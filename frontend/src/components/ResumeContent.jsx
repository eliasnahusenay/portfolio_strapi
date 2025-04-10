// ResumeContent.js
import profileImage from "../assets/images/profile.jpeg";

const ResumeContent = {
  personalInfo: {
    name: "Elias Hagos",
    title: "Full-Stack Developer",
    email: "your.email@example.com", // You should update this
    phone: "+1 (123) 456-7890", // You should update this
    location: "Your Location", // You should update this
    linkedin: "linkedin.com/in/eliashagos", // You should update this
    github: "github.com/eliashagos", // You should update this
    photo: profileImage,
    qrCode: "../assets/images/frame.png",
    summary: "I'm a full-stack web developer specializing in building exceptional digital experiences. With expertise in both frontend and backend technologies, I create seamless, user-friendly applications that solve real problems."
  },

  stats: [
    {
      value: "5+",
      label: "Years Experience"
    },
    {
      value: "50+",
      label: "Projects Completed"
    },
    {
      value: "20+",
      label: "Happy Clients"
    }
  ],

  experience: [
    {
      position: "Full Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "2020 - Present",
      description: "Developed and maintained web applications using React and Node.js, leading a team of 3 developers."
    },
    {
      position: "Frontend Developer",
      company: "Digital Agency",
      duration: "2018 - 2020",
      description: "Implemented responsive UIs for client projects using React and Vue.js."
    }
  ],

  education: [
    {
      degree: "BSc in Computer Science",
      institution: "University of Technology",
      year: "2016 - 2020"
    },
    {
      degree: "Web Development Bootcamp",
      institution: "Coding Academy",
      year: "2015"
    }
  ],

  tools: [
    { name: "VS Code", icon: "https://cdn-icons-png.flaticon.com/512/906/906324.png" },
    { name: "Git", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111288.png" },
    { name: "Docker", icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
    { name: "Postman", icon: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png" },
    { name: "Figma", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png" },
    { name: "Jira", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968885.png" }
  ],

  featuredSkills: [
    {
      name: "React",
      percentage: 90,
      description: "Creating modern user interfaces with React and related technologies",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      featured: true
    },
    {
      name: "Node.js",
      percentage: 85,
      description: "Building scalable backend services with Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      featured: true
    },
    {
      name: "PostgreSQL",
      percentage: 80,
      description: "Database design and optimization",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      featured: true
    }
  ]
};

export default ResumeContent;