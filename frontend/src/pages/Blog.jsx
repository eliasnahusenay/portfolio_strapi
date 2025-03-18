import { useEffect, useState } from "react";
import { fetchBlogs } from "../api";
import Hero from "../components/Hero";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log("useEffect: Fetching blogs..."); // Log when useEffect runs
    fetchBlogs().then((data) => {
      console.log("Blogs data set to state:", data); // Log the data returned from fetchBlogs
      setBlogs(data);
    });
  }, []);

  // Helper function to extract plain text from rich text content
  const extractPlainText = (content) => {
    console.log("Extracting plain text from content:", content); // Log the content being processed
    return content
      .map((block) =>
        block.children.map((child) => child.text).join(" ")
      )
      .join(" ");
  };

  return (
    <div>
      <Hero title="Blog" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
        <div className="mt-6 space-y-6">
          {blogs.map((blog) => {
            console.log("Rendering blog:", blog); // Log each blog being rendered
            return (
              <div key={blog.id} className="p-4 bg-gray-100 rounded-lg">
                {/* Blog Title */}
                <h2 className="text-2xl font-semibold">{blog.attributes.Title}</h2>

                {/* Published Date */}
                <p className="text-gray-500 text-sm">
                  Published on: {new Date(blog.attributes.publishedDate).toLocaleDateString()}
                </p>

                {/* Blog Image */}
                {blog.attributes.image?.data && (
                  <img
                    src={`http://localhost:1337${blog.attributes.image.data.attributes.url}`}
                    alt={blog.attributes.Title}
                    className="my-4 rounded-lg"
                  />
                )}

                {/* Blog Content (Truncated) */}
                <p className="text-gray-600">
                  {extractPlainText(blog.attributes.Content).substring(0, 150)}...
                </p>

                {/* Read More Link */}
                <a href={`/blog/${blog.attributes.slug}`} className="text-blue-500 hover:underline">
                  Read More
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;