import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const text1 = "Streamline your reading with SpeedEase";
  const text2 = "A tool that condenses articles into summaries";

  const [displayText, setDisplayText] = useState("");
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [isText1, setIsText1] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    let currentText = isText1 ? text1 : text2;

    if (!isRollingBack && typingIndex < currentText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    } else if (!isRollingBack && typingIndex === currentText.length) {
      const timeoutId = setTimeout(() => setIsRollingBack(true), 1000);
      return () => clearTimeout(timeoutId);
    } else if (isRollingBack && typingIndex >= 0) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setTypingIndex(typingIndex - 1);
      }, 50);
      return () => clearTimeout(timeoutId);
    } else if (isRollingBack && typingIndex < 0) {
      setIsRollingBack(false);
      setIsText1(!isText1);
      setTypingIndex(0);
    }
  }, [typingIndex, isRollingBack, isText1]);

  return (
    <div className="h-48 flex items-center justify-center h">
      <h1 className="text-4xl font-bold text-center text-gray-800">{displayText}|</h1>
    </div>
  );
};

export default TypingEffect;
