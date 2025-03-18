import { useEffect, useState } from "react";
import { fetchBlogs } from "../api";
import Hero from "../components/Hero";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect: Fetching blogs...");
    fetchBlogs()
      .then((data) => {
        console.log("Blogs fetched from API:", data);
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  // Extract plain text from content
  const extractPlainText = (content) => {
    if (!Array.isArray(content)) {
      console.error("Content is not an array:", content);
      return "No Content";
    }

    return content
      .map((block) => {
        if (!block.children || !Array.isArray(block.children)) {
          console.error("Block children are invalid:", block);
          return "";
        }
        return block.children.map((child) => child.text).join(" ");
      })
      .join(" ");
  };

  if (loading) {
    return <p className="text-gray-600 text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <Hero title="Blog" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center">Latest Blog Posts</h1>

        {blogs.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {blogs.map((blog) => {
              console.log("Rendering blog:", blog);

              const title = blog.Title || "No Title";
              const publishedDate = blog.publishedDate
                ? new Date(blog.publishedDate).toLocaleDateString()
                : "No Date";
              const imageUrl = blog.Image?.length
                ? `http://localhost:1337${blog.Image[0]?.formats?.medium?.url || blog.Image[0]?.url}`
                : null;
              const content = blog.Content ? extractPlainText(blog.Content) : "No Content";
              const isLong = content.length > 500; // Show "Read More" for long posts
              const slug = blog.slug || "#";

              return (
                <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  {imageUrl && (
                    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-gray-500 text-sm mb-2">Published on: {publishedDate}</p>
                    <p className="text-gray-700">
                      {isLong ? content.substring(0, 500) + "..." : content}
                    </p>
                    {isLong && slug !== "#" && (
                      <a href={`/blog/${slug}`} className="text-blue-500 hover:underline mt-3 block">
                        Read More →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
