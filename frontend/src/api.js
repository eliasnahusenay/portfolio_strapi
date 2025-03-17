const API_URL = "http://localhost:1339/api/blogs?populate=*";

export const fetchBlogs = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
