import Hero from "../components/Hero";

const Contact = () => {
  return (
    <div>
      <Hero title="Contact Me" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Get in Touch</h1>
        <p className="text-gray-700 mt-4">Feel free to contact me.</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">My Socials</h2>
          <p>📧 Email: your.email@example.com</p>
          <p>🔗 LinkedIn: linkedin.com/in/yourprofile</p>
          <p>🐙 GitHub: github.com/yourgithub</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
