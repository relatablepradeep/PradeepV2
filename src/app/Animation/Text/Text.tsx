'use client';

import React, { useState, useEffect, useRef } from 'react';

const Text: React.FC = () => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [circlePosition, setCirclePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const word = 'Project';

  const isLetterUnderCircle = (letterIndex: number) => {
    if (!letterRefs.current[letterIndex] || !containerRef.current) return false;

    const letterRect = letterRefs.current[letterIndex]!.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const letterCenterX = letterRect.left - containerRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top - containerRect.top + letterRect.height / 2;

    const distance = Math.sqrt(
      Math.pow(letterCenterX - circlePosition.x, 2) +
        Math.pow(letterCenterY - circlePosition.y, 2)
    );

    return distance <= 80;
  };

  const animateRandomly = () => {
    const randomIndex = Math.floor(Math.random() * word.length);
    setCurrentLetterIndex(randomIndex);

    if (letterRefs.current[randomIndex] && containerRef.current) {
      const letterRect = letterRefs.current[randomIndex]!.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setCirclePosition({
        x: letterRect.left - containerRect.left + letterRect.width / 2,
        y: letterRect.top - containerRect.top + letterRect.height / 2,
      });
    }
  };

  useEffect(() => {
    // Detect screen width
    const checkScreenSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768); // md breakpoint
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isTabletOrLarger) return;

    const startAnimation = () => {
      animateRandomly();
    };

    setTimeout(startAnimation, 500);

    const interval = setInterval(() => {
      animateRandomly();
    }, 1200 + Math.random() * 1800);

    return () => clearInterval(interval);
  }, [isTabletOrLarger]);

  if (!isTabletOrLarger) return null; // Hide entirely on mobile

  return (
    <div className="bg-gray-100 w-full flex items-center justify-center">
      <div>
        <div ref={containerRef} className="relative inline-block">
          <div className="flex">
            {word.split('').map((letter, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className={`select-none font-bold transition-all duration-700 ease-out 
                  text-4xl sm:text-5xl md:text-6xl
                  ${isLetterUnderCircle(index) ? 'text-white' : 'text-blue-400'}`}
                style={{
                  transformOrigin: 'center',
                  zIndex: isLetterUnderCircle(index) ? 10 : 1,
                  textShadow: isLetterUnderCircle(index)
                    ? '0 0 20px rgba(0, 0, 255, 0.8)'
                    : 'none',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <div
            className="absolute pointer-events-none transition-all duration-1000 ease-in-out"
            style={{
              width: '140px',
              height: '140px',
              background:
                'radial-gradient(circle, rgba(0, 91, 255, 0.1) 0%, rgba(138, 43, 226, 0.8) 70%, rgba(138, 43, 226, 0.95) 100%)',
              borderRadius: '50%',
              left: `${circlePosition.x - 80}px`,
              top: `${circlePosition.y - 80}px`,
              transform: 'scale(1)',
              zIndex: 5,
              backdropFilter: 'blur(1px)',
              border: '2px solid rgba(138, 43, 226, 0.4)',
              boxShadow: `
                0 0 30px rgba(0, 91, 255, 0.4),
                inset 0 0 20px rgba(138, 43, 226, 0.3)
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Text;
