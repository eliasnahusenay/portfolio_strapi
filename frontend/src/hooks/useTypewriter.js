import { useState, useEffect } from "react";

const useTypewriter = (texts, speed = 100, delay = 1000) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentTextLength = currentText.length;
      const currentTextToType = texts[textIndex];

      if (!isDeleting && currentTextLength < currentTextToType.length) {
        // Typing forward
        setCurrentText(currentTextToType.slice(0, currentTextLength + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentTextLength > 0) {
        // Deleting backward
        setCurrentText(currentTextToType.slice(0, currentTextLength - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentTextLength === 0) {
        // Switch to next text
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      } else if (!isDeleting && currentTextLength === currentTextToType.length) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), delay);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, texts, textIndex, speed, delay]);

  return currentText;
};

export default useTypewriter;