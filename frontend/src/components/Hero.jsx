import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero title="Welcome to My Portfolio" image="/hero-home.jpg" />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">This is the Home Page</h1>
        <p className="mt-2 text-gray-600">Welcome to my personal website!</p>
      </div>
    </div>
  );
}
