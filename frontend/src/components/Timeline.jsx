import React from "react";

const Timeline = ({ experience }) => {
  return (
    <div className="relative border-l-4 border-blue-500 pl-6">
      {experience.map((item, index) => (
        <div key={index} className="mb-8">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="ml-4 text-xl font-semibold">{item.role}</h3>
          </div>
          <p className="text-gray-400">{item.company} | {item.year}</p>
          <p className="mt-2 text-gray-300">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
