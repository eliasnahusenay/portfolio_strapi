import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiX } from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiStrapi, SiTailwindcss } from 'react-icons/si';
import Hero from '../components/Hero';

const Projects = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - replace with your actual projects
  const sampleProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-featured online store with React frontend and Strapi backend",
      tags: ["React", "Strapi", "Full Stack"],
      techStack: ["react", "strapi"],
      githubUrl: "https://github.com/example",
      liveUrl: "https://example.com",
      imageUrl: "/project1.jpg" // Replace with your image path
    },
    {
      id: 2,
      title: "Portfolio CMS",
      description: "Custom content management system for creatives",
      tags: ["React", "Node.js", "MongoDB"],
      techStack: ["react", "node"],
      githubUrl: "https://github.com/example",
      liveUrl: "https://example.com",
      imageUrl: "/project2.jpg"
    },
    // Add more projects as needed
  ];

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter categories
  const categories = ['All', 'React', 'Strapi', 'Full Stack', 'Frontend'];

  // Filter handler
  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project =>
          project.tags.includes(category)
      ));
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <Hero
        title="My Projects"
        subtitle="Explore my development work and case studies"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Controls */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-medium text-gray-700 mr-2 flex items-center">
              <FiFilter className="mr-2" /> Filter:
            </span>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
            {activeFilter !== 'All' && (
              <motion.button
                onClick={() => handleFilter('All')}
                className="flex items-center text-sm text-gray-500 ml-2"
                whileHover={{ scale: 1.05 }}
              >
                <FiX className="mr-1" /> Clear
              </motion.button>
            )}
          </div>
        </motion.section>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-700">
              No projects found in this category
            </h3>
            <button
              onClick={() => handleFilter('All')}
              className="mt-4 text-blue-600 hover:underline flex items-center justify-center mx-auto"
            >
              <FiX className="mr-1" /> Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Tech icon mapping
  const techIcons = {
    react: <FaReact className="text-blue-500" />,
    strapi: <SiStrapi className="text-blue-500" />,
    node: <FaNodeJs className="text-green-500" />,
    tailwind: <SiTailwindcss className="text-cyan-500" />
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: index * 0.1 }
        }
      }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imageUrl || '/project-placeholder.jpg'}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-3">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {project.techStack?.map(tech => (
              <span key={tech} className="text-lg" title={tech}>
                {techIcons[tech.toLowerCase()] || tech}
              </span>
            ))}
          </div>

          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="GitHub repository"
              >
                <FiGithub className="text-xl" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Live demo"
              >
                <FiExternalLink className="text-xl" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;