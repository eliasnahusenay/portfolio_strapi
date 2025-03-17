import { useEffect, useState } from "react";
import { fetchBlogs } from "../api";
import Hero from "../components/Hero";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs().then(setBlogs);
  }, []);

  return (
    <div>
      <Hero title="Blog" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
        <div className="mt-6 space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-semibold">{blog.attributes.title}</h2>
              <p className="text-gray-600">{blog.attributes.content.substring(0, 150)}...</p>
              <a href={`/blog/${blog.attributes.slug}`} className="text-blue-500">Read More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
