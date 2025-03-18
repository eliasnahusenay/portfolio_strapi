// src/components/TestimonialCarousel.jsx
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Company XYZ",
    quote: "Amazing work! The project was delivered on time and exceeded our expectations.",
    image: "/images/john-doe.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO, Tech Solutions",
    quote: "Highly professional and skilled. Would definitely recommend!",
    image: "/images/jane-smith.jpg",
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Founder, Startup ABC",
    quote: "Great communication and attention to detail. A pleasure to work with!",
    image: "/images/alice-johnson.jpg",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {/* Testimonial Content */}
      <div className="text-center">
        <img
          src={testimonials[currentIndex].image}
          alt={testimonials[currentIndex].name}
          className="w-20 h-20 mx-auto rounded-full object-cover"
        />
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          "{testimonials[currentIndex].quote}"
        </p>
        <h4 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {testimonials[currentIndex].name}
        </h4>
        <p className="text-gray-500 dark:text-gray-400">
          {testimonials[currentIndex].role}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        &larr;
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        &rarr;
      </button>
    </div>
  );
};

export default TestimonialCarousel;