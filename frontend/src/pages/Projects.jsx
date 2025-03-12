import Hero from "../components/Hero";

export default function Projects() {
  return (
    <div>
      <Hero title="My Projects" image="/hero-projects.jpg" />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">This is the Projects Page</h1>
        <p className="mt-2 text-gray-600">Check out my latest projects here.</p>
      </div>
    </div>
  );
}
