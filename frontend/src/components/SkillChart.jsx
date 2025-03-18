// src/components/SkillChart.jsx
import React from "react";

const skills = [
  { name: "React", level: 90 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "JavaScript", level: 95 },
  { name: "Strapi", level: 75 },
  { name: "PHP", level: 70 },
];

const SkillChart = () => {
  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-900 dark:text-white">{skill.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillChart;