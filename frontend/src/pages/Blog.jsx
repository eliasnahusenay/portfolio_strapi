import { useEffect, useState } from "react";
import { fetchBlogPosts } from "../api";
import Hero from "../components/Hero";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts().then(setPosts);
  }, []);

  return (
    <div>
      <Hero title="My Blog" image="/hero-blog.jpg" />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow-lg">
              <img
                src={post.attributes.image.data.attributes.url}
                alt={post.attributes.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-2xl font-semibold mt-4">{post.attributes.title}</h2>
              <p className="text-gray-600">{new Date(post.attributes.publishedAt).toDateString()}</p>
              <p className="mt-2">{post.attributes.content.substring(0, 150)}...</p>
              <button className="mt-2 text-blue-600">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
