import Hero from "../components/Hero";

export default function About() {
  return (
    <div>
      <Hero title="About Me" image="/hero-about.jpg" />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">This is the About Page</h1>
        <p className="mt-2 text-gray-600">Learn more about me here.</p>
      </div>
    </div>
  );
}
