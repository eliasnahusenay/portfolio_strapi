import Hero from "../components/Hero";

const About = () => {
  return (
    <div>
      <Hero title="About Me" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-gray-700 mt-4">
          I am a passionate full-stack developer with expertise in React, Tailwind, and Strapi.
        </p>
      </div>
    </div>
  );
};

export default About;
