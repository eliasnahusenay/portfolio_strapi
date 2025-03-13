import Hero from "../components/Hero";

const Projects = () => {
  return (
    <div>
      <Hero title="My Projects" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-700 mt-4">
          Here are some of the projects I've worked on.
        </p>
      </div>
    </div>
  );
};

export default Projects;
