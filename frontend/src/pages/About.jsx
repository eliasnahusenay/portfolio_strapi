import Hero from "../components/Hero";
import profileImage from "../assets/profile.jpeg";
import { FaCode, FaGraduationCap, FaBriefcase, FaTools, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Updated to use the endpoint format from your example
        const response = await axios.get("http://localhost:1337/api/skills");
        // Map the data structure to match what your component expects
        const skillsData = response.data.data.map((skill) => ({
          id: skill.id,
          name: skill.Name, // Changed to match your API response structure
          percentage: Math.round((skill.proficiencyLevel / 10) * 100), // Converting to percentage
          description: skill.Description, // Changed to match your API structure
          category: skill.category || "other",
          // Use a default icon based on skill name if no icon is provided
          icon: getIconForSkill(skill.Name),
          featured: skill.featured || false,
          documentId: skill.documentId // Keep this for reference if needed
        }));
        setSkills(skillsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Helper function to get icon URL based on skill name
  const getIconForSkill = (skillName) => {
    if (!skillName) return null;

    const skillNameLower = skillName.toLowerCase();
    // Use a mapping of skill names to icon URLs
    // You can replace these with your actual icon URLs
    const iconMap = {
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      'strapi': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg',
    };

    return iconMap[skillNameLower] || null;
  };

  // Get unique categories for filtering
  const categories = ["all", ...new Set(skills.map(skill => skill.category || "other"))];

  // Filter skills by category
  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  // Get featured skills
  const featuredSkills = skills.filter(skill => skill.featured);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Hero
        title="About Me"
        subtitle="Full-Stack Developer | Passionate about Web Development"
      />

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12 flex-1">
          {/* Profile */}
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
              <h2 className="text-3xl font-bold text-gray-800">
                Hi, I'm Elias Hagos
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                I'm a full-stack web developer specializing in building
                exceptional digital experiences. With expertise in both frontend
                and backend technologies, I create seamless, user-friendly
                applications that solve real problems.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-md text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-blue-600">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-blue-600">20+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FaCode className="text-blue-500 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
              </div>
              {/* Skill filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm capitalize ${activeCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Skills */}
            {featuredSkills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                  <FaStar className="text-yellow-500 mr-2" /> Featured Skills
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {featuredSkills.map((skill, index) => (
                    <SkillCard key={skill.id || index} {...skill} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* All Skills */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard key={skill.id || index} {...skill} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section
            className="mb-16 bg-white p-8 rounded-xl shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-8">
              <FaBriefcase className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <ExperienceItem key={index} {...exp} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Education */}
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
                <EducationItem key={index} {...edu} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Tools */}
          <motion.section
            className="bg-white p-8 rounded-xl shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <FaTools className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">
                Tools & Technologies
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-blue-50 rounded-full flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={tool.icon} alt={tool.name} className="w-5 h-5 mr-2" />
                  <span className="text-gray-700">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const SkillCard = ({ icon, name, percentage, description, featured, index }) => {
  return (
    <motion.div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center ${featured ? 'border-2 border-yellow-400' : ''}`}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {icon ? (
        <img src={icon} alt={name} className="w-12 h-12 mb-4 object-contain" />
      ) : (
        <div className="w-12 h-12 mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <FaCode className="text-gray-500 text-xl" />
        </div>
      )}
      <h3 className="font-semibold text-gray-800">{name}</h3>
      <div className="w-full mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Proficiency</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mt-3">{description}</p>
      )}
      {featured && (
        <div className="mt-2 flex items-center text-yellow-500 text-sm">
          <FaStar className="mr-1" /> Featured
        </div>
      )}
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
      <p className="text-blue-600">
        {company} • {duration}
      </p>
      <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
  );
};

const EducationItem = ({ degree, institution, year, index }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-xl font-semibold text-gray-800">{degree}</h3>
      <p className="text-blue-600 mt-2">{institution}</p>
      <p className="text-gray-500 mt-1">{year}</p>
    </motion.div>
  );
};

// Static Data (experience, education, tools)
const experience = [
  {
    position: "Full Stack Developer",
    company: "Tech Solutions Inc.",
    duration: "2020 - Present",
    description:
      "Developed and maintained web applications using React and Node.js, leading a team of 3 developers.",
  },
  {
    position: "Frontend Developer",
    company: "Digital Agency",
    duration: "2018 - 2020",
    description:
      "Implemented responsive UIs for client projects using React and Vue.js.",
  },
];

const education = [
  {
    degree: "BSc in Computer Science",
    institution: "University of Technology",
    year: "2016 - 2020",
  },
  {
    degree: "Web Development Bootcamp",
    institution: "Coding Academy",
    year: "2015",
  },
];

const tools = [
  { name: "VS Code", icon: "https://cdn-icons-png.flaticon.com/512/906/906324.png" },
  { name: "Git", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111288.png" },
  { name: "Docker", icon: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
  { name: "Postman", icon: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png" },
  { name: "Figma", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png" },
  { name: "Jira", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968885.png" },
];

export default About;