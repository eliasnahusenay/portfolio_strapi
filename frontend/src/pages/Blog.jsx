import { useEffect, useState } from "react";
import { fetchBlogs } from "../api";
import Hero from "../components/Hero";
import { motion, AnimatePresence } from "framer-motion";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

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

  const toggleExpand = (blogId) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
  };

  return (
    <div>
      <Hero title="Blog" />

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h1>

          {blogs.length === 0 ? (
            <p className="text-gray-600 text-center mt-4">No blog posts found.</p>
          ) : (
            <div className="relative">
              {/* Grid View */}
              <AnimatePresence>
                {!expandedBlogId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {blogs.map((blog) => {
                      const title = blog.Title || "No Title";
                      const publishedDate = blog.publishedDate
                        ? new Date(blog.publishedDate).toLocaleDateString()
                        : "No Date";
                      const imageUrl = blog.Image?.length
                        ? `http://localhost:1337${blog.Image[0]?.formats?.medium?.url || blog.Image[0]?.url}`
                        : null;
                      const content = blog.Content ? extractPlainText(blog.Content) : "No Content";
                      const isLong = content.length > 200;

                      return (
                        <motion.div
                          key={blog.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          {imageUrl && (
                            <div className="overflow-hidden h-48">
                              <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {publishedDate}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {content}
                            </p>
                            {isLong && (
                              <button
                                onClick={() => toggleExpand(blog.id)}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center group"
                              >
                                Read More
                                <svg
                                  className="w-4 h-4 ml-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Full Screen View */}
              <AnimatePresence>
                {expandedBlogId && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white z-50 overflow-y-auto p-8"
                  >
                    <div className="max-w-4xl mx-auto">
                      {blogs
                        .filter((blog) => blog.id === expandedBlogId)
                        .map((blog) => {
                          const title = blog.Title || "No Title";
                          const publishedDate = blog.publishedDate
                            ? new Date(blog.publishedDate).toLocaleDateString()
                            : "No Date";
                          const imageUrl = blog.Image?.length
                            ? `http://localhost:1337${blog.Image[0]?.formats?.medium?.url || blog.Image[0]?.url}`
                            : null;
                          const content = blog.Content ? extractPlainText(blog.Content) : "No Content";

                          return (
                            <div key={blog.id} className="py-12">
                              <button
                                onClick={() => toggleExpand(blog.id)}
                                className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                  />
                                </svg>
                                Back to Articles
                              </button>

                              <h2 className="text-3xl font-bold mb-4">{title}</h2>
                              <p className="text-gray-500 mb-8">Published on: {publishedDate}</p>

                              {imageUrl && (
                                <div className="mb-8 rounded-xl overflow-hidden">
                                  <img
                                    src={imageUrl}
                                    alt={title}
                                    className="w-full h-auto max-h-96 object-cover"
                                  />
                                </div>
                              )}

                              <div className="prose max-w-none">
                                {content.split('\n').map((paragraph, i) => (
                                  <p key={i} className="mb-4 text-gray-700">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;