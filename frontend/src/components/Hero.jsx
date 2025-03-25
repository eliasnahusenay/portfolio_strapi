import React from 'react';
import { motion } from 'framer-motion';
import useTypewriter from '../hooks/useTypewriter';

const Hero = ({ title }) => {
  // Using the fixed useTypewriter hook
  const { text, isTyping } = useTypewriter(title, 100);

  return (
    <motion.div
      className="relative h-60 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements (optional) */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: 0.1
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: [0.1, 0.2, 0.1],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      {/* Main title with proper typewriter effect */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white text-center px-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {text}
        {/* Blinking cursor that disappears when typing is complete */}
        {isTyping && (
          <span className="ml-1 inline-block w-1 h-12 bg-white animate-pulse"></span>
        )}
      </motion.h1>
    </motion.div>
  );
};

export default Hero;