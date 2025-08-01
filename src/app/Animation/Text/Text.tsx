'use client'

import React, { useState, useEffect, useRef } from 'react';

const Text = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  const word = "Project";

  // Check if a letter is under the circle
  const isLetterUnderCircle = (letterIndex) => {
    if (!letterRefs.current[letterIndex] || !containerRef.current) return false;
    
    const letterRect = letterRefs.current[letterIndex].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const letterCenterX = letterRect.left - containerRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top - containerRect.top + letterRect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(letterCenterX - circlePosition.x, 2) + 
      Math.pow(letterCenterY - circlePosition.y, 2)
    );
    
    return distance <= 80; // Circle radius is 80px
  };

  const animateRandomly = () => {
    const randomIndex = Math.floor(Math.random() * word.length);
    setCurrentLetterIndex(randomIndex);
    
    // Get the position of the random letter
    if (letterRefs.current[randomIndex] && containerRef.current) {
      const letterRect = letterRefs.current[randomIndex].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      setCirclePosition({
        x: letterRect.left - containerRect.left + letterRect.width / 2,
        y: letterRect.top - containerRect.top + letterRect.height / 2
      });
    }
  };

  useEffect(() => {
    // Start animation immediately when component mounts
    const startAnimation = () => {
      animateRandomly();
    };

    // Initial animation
    setTimeout(startAnimation, 500);

    // Set up infinite random animation
    const interval = setInterval(() => {
      animateRandomly();
    }, 1200 + Math.random() * 1800); // Random interval between 1.2-3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="space-y-12">
        {/* Main Project Text with Random Mask Effect */}
        <div 
          ref={containerRef}
          className="relative inline-block"
        >
          {/* Individual Letters */}
          <div className="flex">
            {word.split('').map((letter, index) => (
              <span
                key={index}
                ref={el => letterRefs.current[index] = el}
                className={`text-8xl font-bold select-none transition-all duration-700 ease-out ${
                  isLetterUnderCircle(index)
                    ? 'text-blue-400' 
                    : 'text-gray-300'
                }`}
                style={{
                  transformOrigin: 'center',
                  zIndex: isLetterUnderCircle(index) ? 10 : 1,
                  textShadow: isLetterUnderCircle(index) ? '0 0 20px rgba(0, 0, 255, 0.8)' : 'none'
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* Black Circular Glass Effect */}
          <div
            className="absolute pointer-events-none transition-all duration-1000 ease-in-out"
            style={{
              width: '160px',
              height: '160px',
              background: 'radial-gradient(circle, rgba(0, 91, 255, 0.1) 0%, rgba(138, 43, 226, 0.8) 70%, rgba(138, 43, 226, 0.95) 100%)',
              borderRadius: '50%',
              left: `${circlePosition.x - 80}px`,
              top: `${circlePosition.y - 80}px`,
              transform: 'scale(1)',
              zIndex: 5,
              backdropFilter: 'blur(1px)',
              border: '2px solid rgba(138, 43, 226, 0.4)',
              boxShadow: `
  0 0 30px rgba(0, 91, 255, 0.4),          // outer blue glow
  inset 0 0 20px rgba(138, 43, 226, 0.3)    // inner violet glow
`
            }}
          />
        </div>

        {/* Additional Demo Words */}
        {/* <div className="flex gap-12 justify-center">
          <RandomMaskText text="DESIGN" />
          <RandomMaskText text="CODE" />
          <RandomMaskText text="CREATE" />
        </div> */}

        {/* Info Text */}
       
      </div>
    </div>
  );
};

// Reusable component for other text items
const RandomMaskText = ({ text }) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  // Check if a letter is under the circle
  const isLetterUnderCircle = (letterIndex) => {
    if (!letterRefs.current[letterIndex] || !containerRef.current) return false;
    
    const letterRect = letterRefs.current[letterIndex].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const letterCenterX = letterRect.left - containerRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top - containerRect.top + letterRect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(letterCenterX - circlePosition.x, 2) + 
      Math.pow(letterCenterY - circlePosition.y, 2)
    );
    
    return distance <= 48; // Circle radius is 48px
  };

  const animateRandomly = () => {
    const randomIndex = Math.floor(Math.random() * text.length);
    setCurrentLetterIndex(randomIndex);
    
    if (letterRefs.current[randomIndex] && containerRef.current) {
      const letterRect = letterRefs.current[randomIndex].getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      setCirclePosition({
        x: letterRect.left - containerRect.left + letterRect.width / 2,
        y: letterRect.top - containerRect.top + letterRect.height / 2
      });
    }
  };

  useEffect(() => {
    // Start animation after a random delay
    const startDelay = Math.random() * 2000;
    
    setTimeout(() => {
      animateRandomly();
    }, startDelay);

    // Set up infinite random animation
    const interval = setInterval(() => {
      animateRandomly();
    }, 1000 + Math.random() * 2000); // Random interval between 1-3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
    >
      {/* Individual Letters */}
      <div className="flex">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            ref={el => letterRefs.current[index] = el}
            className={`text-4xl font-bold select-none transition-all duration-600 ease-out ${
              isLetterUnderCircle(index)
                ? 'text-yellow-400' 
                : 'text-gray-300'
            }`}
            style={{
              transformOrigin: 'center',
              zIndex: isLetterUnderCircle(index) ? 10 : 1,
              textShadow: isLetterUnderCircle(index) ? '0 0 15px rgba(255, 255, 0, 0.8)' : 'none'
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      {/* Black Circular Glass Effect */}
      <div
        className="absolute pointer-events-none transition-all duration-800 ease-in-out"
        style={{
          width: '96px',
          height: '96px',
          background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.9) 100%)',
          borderRadius: '50%',
          left: `${circlePosition.x - 48}px`,
          top: `${circlePosition.y - 48}px`,
          transform: 'scale(1)',
          zIndex: 5,
          backdropFilter: 'blur(1px)',
          border: '1px solid rgba(0,0,0,0.3)',
          boxShadow: '0 0 20px rgba(0,0,0,0.3), inset 0 0 15px rgba(255,255,255,0.1)'
        }}
      />
    </div>
  );
};

export default Text;