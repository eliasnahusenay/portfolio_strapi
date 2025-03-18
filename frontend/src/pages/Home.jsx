import { useEffect, useState } from "react";
import useTypewriter from "../hooks/useTypewriter";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import SkillChart from "../components/SkillChart.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel";

const Home = () => {
  const heroText = useTypewriter([
    "Welcome to My Portfolio",
    "I Build Modern Web Applications",
    "Let's Create Something Amazing",
  ]);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch featured projects from an API
    fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <Hero title={heroText} subtitle="Crafting digital experiences with passion and precision.">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          View My Work
        </button>
      </Hero>

      {/* About Me Section */}
      <section className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-48 h-48 rounded-full shadow-lg border-4 border-blue-500"
          />
          <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
            <h2 className="text-2xl font-semibold">Hi, I'm John Doe!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              I’m a full-stack developer specializing in React, Tailwind, and Strapi. Let's build something amazing together!
            </p>
            <a href="/about" className="text-blue-500 hover:underline mt-4 inline-block">
              Learn More About Me
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center">Featured Projects</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center">Skills</h2>
        <div className="mt-6">
          <SkillChart />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center">What People Say</h2>
        <div className="mt-6">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center">Let's Work Together</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">
          Have a project in mind? Feel free to reach out!
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;