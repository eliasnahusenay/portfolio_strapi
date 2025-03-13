import Hero from "../components/Hero";

const Blog = () => {
  return (
    <div>
      <Hero title="Blog" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-gray-700 mt-4">
          Read my latest blog posts about web development.
        </p>
      </div>
    </div>
  );
};

export default Blog;
