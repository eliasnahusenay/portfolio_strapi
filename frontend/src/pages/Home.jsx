import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Hero title="Welcome to My Portfolio" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">This is the Home Page</h1>
        <p className="text-gray-700 mt-4">
          Explore my work, blog, and contact me for collaboration.
        </p>
      </div>
    </div>
  );
};

export default Home;
