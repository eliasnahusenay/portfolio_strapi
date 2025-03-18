const API_URL = "http://localhost:1337/api/blogs?populate=*";

export const fetchBlogs = async () => {
  try {
    console.log("Fetching blogs from:", API_URL); // Log the API URL

    const response = await fetch(API_URL);
    console.log("Response received:", response); // Log the response object

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data); // Log the raw data from the API

    return data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};