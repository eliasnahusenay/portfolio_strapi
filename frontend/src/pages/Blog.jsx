import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchBlogs, updateBlogReaction, addComment } from "../api";
import Hero from "../components/Hero";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isReacting, setIsReacting] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Fetch blogs without attributes nesting
  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs();
        setBlogs(response.data || []);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  // Handle reactions with direct data access
  const handleReaction = async (type) => {
    if (!selectedBlog || isReacting) return;

    setIsReacting(true);
    try {
      const updatedCount = (selectedBlog[type] || 0) + 1;
      setSelectedBlog(prev => ({ ...prev, [type]: updatedCount }));
      setBlogs(prev => prev.map(blog =>
        blog.id === selectedBlog.id
          ? { ...blog, [type]: updatedCount }
          : blog
      ));
      await updateBlogReaction(selectedBlog.id, type);
    } catch (err) {
      setError("Failed to save reaction");
      setSelectedBlog(prev => ({ ...prev, [type]: (prev[type] || 0) - 1 }));
    } finally {
      setIsReacting(false);
    }
  };

  // Handle comments with direct data access
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedBlog) return;

    try {
      const tempId = Date.now();
      setSelectedBlog(prev => ({
        ...prev,
        comments: [...(prev.comments || []), { id: tempId, content: newComment }]
      }));
      await addComment(selectedBlog.id, newComment);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  // Function to render the blog content correctly
  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return content.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="mb-4">
              {block.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          );
        }
        return null;
      });
    }
    return <p className="mb-4">{content}</p>;
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  if (error) return (
    <div className="container mx-auto p-4 text-center text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero title="Blog" subtitle="Thoughts and insights on web development" />

      <div className="container mx-auto px-4 py-12">
        {selectedBlog ? (
          // Single Blog View
          <motion.div
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 m-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to all posts
            </button>

            <div className="px-6 pb-6">
              {/* Blog Image */}
              <motion.img
                src={
                  selectedBlog.image?.url
                    ? `http://localhost:1337${selectedBlog.image.url}`
                    : selectedBlog.image?.formats?.medium?.url
                      ? `http://localhost:1337${selectedBlog.image.formats.medium.url}`
                      : "/default-image.jpg"
                }
                alt={selectedBlog.title || "Blog image"}
                className="w-full h-96 object-cover rounded-lg mb-6 shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Blog Title */}
              <h1 className="text-4xl font-bold mb-4 text-gray-800">
                {selectedBlog.title || "Untitled Blog"}
              </h1>

              {/* Published Date */}
              <div className="flex items-center text-gray-500 mb-8">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {selectedBlog.publishedDate
                  ? new Date(selectedBlog.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })
                  : "No date available"}
              </div>

              {/* Blog Content */}
              <div className="prose max-w-none mb-10 text-gray-700">
                {renderContent(selectedBlog.content)}
              </div>

              {/* Like/Dislike Buttons */}
              <div className="flex gap-4 mb-10">
                <motion.button
                  onClick={() => handleReaction("likes")}
                  disabled={isReacting}
                  className={`flex items-center px-6 py-3 rounded-full ${isReacting ? 'bg-gray-300' : 'bg-green-100 hover:bg-green-200'} text-green-800 transition-colors`}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                  </svg>
                  Like ({selectedBlog.likes || 0})
                </motion.button>
                <motion.button
                  onClick={() => handleReaction("dislikes")}
                  disabled={isReacting}
                  className={`flex items-center px-6 py-3 rounded-full ${isReacting ? 'bg-gray-300' : 'bg-red-100 hover:bg-red-200'} text-red-800 transition-colors`}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m0 0v9m0-9h2.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 13H9m5-9v9"></path>
                  </svg>
                  Dislike ({selectedBlog.dislikes || 0})
                </motion.button>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Comments ({selectedBlog.comments?.length || 0})</h3>

                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your thoughts..."
                    rows="4"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    Post Comment
                  </motion.button>
                </form>

                <div className="space-y-6">
                  {selectedBlog.comments?.length > 0 ? (
                    selectedBlog.comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        className="bg-gray-50 p-6 rounded-lg shadow-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-700">{comment.content}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Blog Grid View
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedBlog(blog)}
                whileHover={{ y: -5 }}
                layout
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      blog.image?.url
                        ? `http://localhost:1337${blog.image.url}`
                        : blog.image?.formats?.small?.url
                          ? `http://localhost:1337${blog.image.formats.small.url}`
                          : "/default-image.jpg"
                    }
                    alt={blog.title || "Blog thumbnail"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="font-bold text-xl text-white">{blog.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {blog.publishedDate
                      ? new Date(blog.publishedDate).toLocaleDateString()
                      : "No date"}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                        {blog.likes || 0}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m0 0v9m0-9h2.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 13H9m5-9v9"></path>
                        </svg>
                        {blog.dislikes || 0}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      {blog.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;