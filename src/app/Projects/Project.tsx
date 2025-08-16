"use client";

import { useEffect, useState } from "react";

const projects = [
  { title: "Ayurvedic Wellness", color: "bg-green-500" },
  { title: "Health Tracker", color: "bg-red-500" },
  { title: "Energy Dashboard", color: "bg-yellow-500" },
  { title: "Security Suite", color: "bg-blue-500" },
  { title: "Travel Planner", color: "bg-purple-500" },
];

export default function Project() {
  const [angle, setAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ check screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ auto-rotate every 3s
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setAngle((prev) => prev - 60);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  if (!isMobile) {
    // ✅ message for desktop
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <p className="text-gray-500 text-lg">📱 View on mobile to see the Projects carousel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="relative w-72 h-72" style={{ perspective: "1000px" }}>
        <div
          className="absolute inset-0 transition-transform duration-1000"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${angle}deg)`,
          }}
        >
          {projects.map((proj, i) => (
            <div
              key={i}
              className={`absolute w-56 h-28 ${proj.color} text-white font-bold flex items-center justify-center rounded-xl shadow-lg`}
              style={{
                transform: `rotateX(${i * (360 / projects.length)}deg) translateZ(140px)`,
              }}
            >
              {proj.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
