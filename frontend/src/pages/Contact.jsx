import Hero from "../components/Hero";

export default function Contact() {
  return (
    <div>
      <Hero title="Get in Touch" image="/hero-contact.jpg" />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">This is the Contact Page</h1>
        <p className="mt-2 text-gray-600">Reach out to me via the form below.</p>
      </div>
    </div>
  );
}
