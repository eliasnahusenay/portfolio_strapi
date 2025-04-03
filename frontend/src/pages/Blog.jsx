import React, { useEffect, useState } from "react";
import { fetchBlogs, updateBlogReaction, addComment } from "../api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Fetch blogs with proper data structure
  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs();
        console.log("API Response:", response); // Debug log
        setBlogs(response.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  // Handle reactions with proper data paths
  const handleReaction = async (type) => {
    try {
      const updatedBlog = await updateBlogReaction(selectedBlog.id, type);
      if (updatedBlog.data) {
        setSelectedBlog(prev => ({
          ...prev,
          [type]: (prev[type] || 0) + 1
        }));

        setBlogs(prev => prev.map(blog =>
          blog.id === selectedBlog.id
            ? { ...blog, [type]: (blog[type] || 0) + 1 }
            : blog
        ));
      }
    } catch (err) {
      console.error("Error updating reaction:", err);
      setError("Failed to update reaction. Please try again.");
    }
  };

  // Handle comments with proper JSON field
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const currentComments = selectedBlog.comments || [];
      const updatedBlog = await addComment(selectedBlog.id, [...currentComments, newComment]);

      if (updatedBlog.data) {
        setSelectedBlog(prev => ({
          ...prev,
          comments: updatedBlog.data.attributes.comments
        }));
        setNewComment("");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading blogs...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {selectedBlog ? (
        // Full Blog View with all content
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <button
            className="mb-4 text-blue-500 hover:text-blue-700"
            onClick={() => setSelectedBlog(null)}
          >
            ← Back to Blogs
          </button>

          {/* Blog Image - Properly sourced from API */}
          <img
            src={
              selectedBlog.image?.formats?.medium?.url
                ? `http://localhost:1337${selectedBlog.image.formats.medium.url}`
                : selectedBlog.image?.url
                  ? `http://localhost:1337${selectedBlog.image.url}`
                  : "/default-image.jpg"
            }
            alt={selectedBlog.title || "Blog image"}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          {/* Blog Title - Directly from API root */}
          <h1 className="text-3xl font-bold mb-2">
            {selectedBlog.title || "Untitled Blog"}
          </h1>

          {/* Published Date - Directly from API root */}
          <p className="text-gray-500 mb-6">
            Published: {selectedBlog.publishedDate
              ? new Date(selectedBlog.publishedDate).toLocaleDateString()
              : "No date available"}
          </p>

          {/* Blog Content - Directly from API root */}
          <div className="prose max-w-none">
            {selectedBlog.content?.map((block, index) => (
              <div key={index} className="mb-4">
                {block.children?.map((child, childIndex) => (
                  <p key={childIndex} className="text-gray-700">
                    {child.text}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Like/Dislike Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => handleReaction("likes")}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              <span>👍</span>
              <span>{selectedBlog.likes || 0}</span>
            </button>
            <button
              onClick={() => handleReaction("dislikes")}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              <span>👎</span>
              <span>{selectedBlog.dislikes || 0}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Comments ({selectedBlog.comments?.length || 0})</h2>

            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment..."
                rows="3"
                required
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-3">
              {selectedBlog.comments?.length > 0 ? (
                selectedBlog.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-800">{comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Blog Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              {/* Blog Thumbnail */}
              <img
                src={
                  blog.image?.formats?.small?.url
                    ? `http://localhost:1337${blog.image.formats.small.url}`
                    : blog.image?.url
                      ? `http://localhost:1337${blog.image.url}`
                      : "/default-image.jpg"
                }
                alt={blog.title || "Blog thumbnail"}
                className="w-full h-48 object-cover"
              />

              {/* Blog Preview */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {blog.title || "Untitled Blog"}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {blog.publishedDate
                    ? new Date(blog.publishedDate).toLocaleDateString()
                    : "No date available"}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">👍 {blog.likes || 0}</span>
                  <span className="text-red-600">👎 {blog.dislikes || 0}</span>
                  <span className="text-blue-600">💬 {blog.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;