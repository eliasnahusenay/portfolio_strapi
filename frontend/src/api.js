const API_URL = "http://localhost:1339/api";

export const fetchBlogPosts = async () => {
  const res = await fetch(`${API_URL}/projects?populate=*`);
  const data = await res.json();
  return data.data;
};
