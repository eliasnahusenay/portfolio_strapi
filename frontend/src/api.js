// src/api.js
const API_URL = 'http://localhost:1337/api';

export const fetchBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs?populate=*`);
  return await response.json();
};

export const updateBlogReaction = async (blogId, type) => {
  const response = await fetch(`${API_URL}/blogs/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        [type]: {
          // This increments the count by 1
          $inc: 1
        }
      }
    }),
  });
  return await response.json();
};

// src/api.js
export const addComment = async (blogId, commentText) => {
  const response = await fetch(`${API_URL}/blogs/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        comments: [...(selectedBlog.comments || []), commentText]
      }
    }),
  });
  return await response.json();
};
 