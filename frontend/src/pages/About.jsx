import useTypewriter from "../hooks/useTypewriter"; // Import the custom hook
import heroImage from "../assets/Tech_.jpg";
import profileImage from "../assets/profile.jpeg";
import reactIcon from "../assets/skills/react.png";
import tailwindIcon from "../assets/skills/tailwind.png";
import strapiIcon from "../assets/skills/js.png"; // Strapi png
import symfonyIcon from "../assets/skills/symfony.png";
import phpIcon from "../assets/skills/php.png";

const About = () => {
  const texts = [
    "I’m a full-stack web developer specializing in building exceptional digital experiences.",
    "I love working with technologies like React, Strapi, and Tailwind CSS.",
  ];
  const typewriterText = useTypewriter(texts, 100, 1000); // Use the hook

  // Skills data with proficiency levels
  const skills = [
    { name: "React", icon: reactIcon, level: 90 },
    { name: "Tailwind CSS", icon: tailwindIcon, level: 85 },
    { name: "Strapi", icon: strapiIcon, level: 80 },
    { name: "Symfony", icon: symfonyIcon, level: 75 },
    { name: "PHP", icon: phpIcon, level: 70 },
  ];

  // Experience timeline data
  const experience = [
    {
      year: "2023 - Present",
      role: "Full-Stack Developer",
      company: "XYZ Company",
      description: "Building modern web applications using React and Node.js.",
    },
    {
      year: "2021 - 2023",
      role: "Freelance Web Developer",
      company: "Self-Employed",
      description: "Worked on various projects for clients across different industries.",
    },
    {
      year: "2019 - 2021",
      role: "Bachelor's Degree in Computer Science",
      company: "University of ABC",
      description: "Graduated with honors and a focus on web development.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">About Me</h1>
          <p className="text-lg text-gray-300">Full-Stack Developer | Passionate about Web Development</p>
        </div>
      </div>

      {/* Profile & Introduction */}
      <div className="container mx-auto p-6 flex flex-col md:flex-row items-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-48 h-48 rounded-full shadow-lg border-4 border-blue-500 transform transition-transform duration-300 hover:scale-110"
        />
        <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-2xl font-semibold">Hi, I'm Elias Hagos!</h2>
          <p className="mt-2 text-gray-400">{typewriterText}</p>
          <p className="mt-4 text-gray-400">
            I’m a passionate full-stack developer with a love for building modern, scalable, and user-friendly web applications. Over the years, I’ve worked with a variety of technologies, including React, Tailwind CSS, Strapi, and Symfony, to deliver high-quality solutions for clients and personal projects.
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="container mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-center">Skills</h2>
        <div className="mt-6 space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="container mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-center">Experience</h2>
        <div className="mt-6 space-y-6">
          {experience.map((exp, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-gray-400">{exp.company} | {exp.year}</p>
              <p className="mt-2 text-gray-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Interests */}
      <div className="container mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-center">Personal Interests</h2>
        <p className="mt-4 text-gray-400 text-center">
          When I’m not coding, I enjoy hiking, photography, and playing the guitar. I believe in maintaining a healthy work-life balance and constantly learning new things.
        </p>
      </div>
    </div>
  );
};

export default About;