import Hero from "../components/Hero";
import profileImage from "../assets/profile.jpeg";
import reactIcon from "../assets/skills/react.png";
import tailwindIcon from "../assets/skills/tailwind.png";
import strapiIcon from "../assets/skills/js.png";
import symfonyIcon from "../assets/skills/symfony.png";
import phpIcon from "../assets/skills/php.png";
import { FaCode, FaGraduationCap, FaBriefcase, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section - Consistent with Home page */}
      <Hero title="About Me" subtitle="Full-Stack Developer | Passionate about Web Development" />

      {/* Show spinner while loading */}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12 flex-1">
          {/* Profile & Introduction */}
          <motion.section
            className="flex flex-col md:flex-row items-center gap-8 mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 rounded-full shadow-xl border-4 border-blue-500"
              whileHover={{ scale: 1.05 }}
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Hi, I'm Elias Hagos</h2>
              <p className="text-lg text-gray-600 mt-4">
                I'm a full-stack web developer specializing in building exceptional digital experiences.
                With expertise in both frontend and backend technologies, I create seamless,
                user-friendly applications that solve real problems.
              </p>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-8">
              <FaCode className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => (
                <SkillCard key={index} {...skill} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            className="mb-16 bg-white p-8 rounded-xl shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-8">
              <FaBriefcase className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Professional Experience</h2>
            </div>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <ExperienceItem key={index} {...exp} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-8">
              <FaGraduationCap className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <EducationItem key={index} {...edu} />
              ))}
            </div>
          </motion.section>

          {/* Tools Section */}
          <motion.section
            className="bg-white p-8 rounded-xl shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <FaTools className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Tools & Technologies</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <div key={index} className="px-4 py-2 bg-blue-50 rounded-full flex items-center">
                  <img src={tool.icon} alt={tool.name} className="w-5 h-5 mr-2" />
                  <span className="text-gray-700">{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const SkillCard = ({ image, name, level, index }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <img src={image} alt={name} className="w-12 h-12 mb-4" />
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
    </motion.div>
  );
};

const ExperienceItem = ({ position, company, duration, description, index }) => {
  return (
    <motion.div
      className="border-l-4 border-blue-500 pl-6 py-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <h3 className="text-xl font-semibold text-gray-800">{position}</h3>
      <p className="text-blue-600">{company} • {duration}</p>
      <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
  );
};

const EducationItem = ({ degree, institution, year }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">{degree}</h3>
      <p className="text-blue-600 mt-2">{institution}</p>
      <p className="text-gray-500 mt-1">{year}</p>
    </div>
  );
};

// Data (replace with your actual data)
const skills = [
  { image: reactIcon, name: "React", level: 90 },
  { image: strapiIcon, name: "Strapi", level: 85 },
  { image: symfonyIcon, name: "Symfony", level: 75 },
  { image: phpIcon, name: "PHP", level: 80 },
  { image: tailwindIcon, name: "Tailwind CSS", level: 95 },
];

const experience = [
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
];

const education = [
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
];

const tools = [
  { name: "VS Code", icon: reactIcon },
  { name: "Git", icon: reactIcon },
  { name: "Docker", icon: reactIcon },
  { name: "Postman", icon: reactIcon },
  { name: "Figma", icon: reactIcon },
  { name: "Jira", icon: reactIcon },
];

export default About;