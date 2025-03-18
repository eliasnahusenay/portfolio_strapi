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
          <h2 className="text-2xl font-semibold">Hi, I'm John Doe!</h2>
          <p className="mt-2 text-gray-400">{typewriterText}</p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="container mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-center">Skills</h2>
        <div className="flex justify-center space-x-6 mt-6">
          <SkillCard image={reactIcon} name="React" />
          <SkillCard image={tailwindIcon} name="Tailwind CSS" />
          <SkillCard image={strapiIcon} name="Strapi" />
          <SkillCard image={symfonyIcon} name="Symfony" />
          <SkillCard image={phpIcon} name="PHP" />
        </div>
      </div>
    </div>
  );
};

// Reusable Skill Card Component
const SkillCard = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-16 h-16" />
      <p className="mt-2 text-gray-300">{name}</p>
    </div>
  );
};

export default About;