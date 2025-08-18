"use client";
import { useEffect, useState, useRef } from "react";
import { ExternalLink, Github, X } from "lucide-react";

// ✅ Define a Project type
type Project = {
  title: string;
  color: string;
  emoji: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
};

const projects: Project[] = [
  { 
    title: "Ayurvedic Wellness", 
    color: "bg-green-500",
    emoji: "🌿",
    description: "A comprehensive wellness platform combining ancient Ayurvedic wisdom with modern health tracking to promote holistic well-being.",
    liveUrl: "#",
    githubUrl: "#"
  },
  { 
    title: "Health Tracker", 
    color: "bg-red-500",
    emoji: "❤️",
    description: "Real-time health monitoring dashboard with AI-powered insights for tracking vitals, medication, and fitness goals.",
    liveUrl: "#",
    githubUrl: "#"
  },
  { 
    title: "Energy Dashboard", 
    color: "bg-yellow-500",
    emoji: "⚡",
    description: "Smart energy management system for monitoring and optimizing power consumption in residential and commercial spaces.",
    liveUrl: "#",
    githubUrl: "#"
  },
  { 
    title: "Security Suite", 
    color: "bg-blue-500",
    emoji: "🔒",
    description: "Enterprise-grade security platform with advanced threat detection, encryption, and multi-factor authentication.",
    liveUrl: "#",
    githubUrl: "#"
  },
  { 
    title: "Travel Planner", 
    color: "bg-purple-500",
    emoji: "✈️",
    description: "AI-powered travel companion that creates personalized itineraries, tracks expenses, and provides local recommendations.",
    liveUrl: "#",
    githubUrl: "#"
  },
];

export default function Project() {
  const [isMobile, setIsMobile] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const [expandedProject, setExpandedProject] = useState<(Project & { index: number }) | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Touch/Mouse event handlers for scrolling
  const handleStart = (clientY: number) => {
    if (expandedProject) return;
    setIsDragging(true);
    setStartY(clientY);
    setStartOffset(offset);
  };

  const handleMove = (clientY: number) => {
    if (!isDragging || expandedProject) return;
    
    const deltaY = clientY - startY;
    const newOffset = startOffset + deltaY * 1.2;
    setOffset(newOffset);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleStart(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Add global mouse events when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startY, startOffset]);

  const handleProjectClick = (project: Project, projectIndex: number) => {
    if (isDragging || isAnimating) return;
    
    setIsAnimating(true);
    setExpandedProject({ ...project, index: projectIndex });
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeExpanded = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setExpandedProject(null);
      setIsAnimating(false);
    }, 300);
  };

  if (!isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center space-y-4 p-8">
          <div className="text-6xl animate-bounce">📱</div>
          <p className="text-gray-600 text-lg font-medium">
            View on mobile to explore the interactive project carousel
          </p>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Create infinite loop effect
  const getVisibleProjects = () => {
    const result: (Project & { key: number; originalIndex: number })[] = [];
    for (let i = 0; i < 4; i++) {
      const projectIndex = (projects.length - 1 - Math.floor(offset / 140) - i + projects.length * 1000) % projects.length;
      result.push({
        ...projects[projectIndex],
        key: Math.floor(offset / 140) + i,
        originalIndex: projectIndex,
      });
    }
    return result;
  };

  const visibleProjects = getVisibleProjects();
  const smoothOffset = offset % 140;

  return (
    <div className="fixed inset-0  overflow-hidden">
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-72  h-[400px] overflow-hidden select-none touch-none"
          style={{ 
            cursor: expandedProject ? 'default' : (isDragging ? 'grabbing' : 'grab')
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {visibleProjects.map((proj, i) => {
            const baseY = (i * 140) + smoothOffset;
            const translateY = baseY;
            
            const normalizedPos = ((i * 140 + smoothOffset) / 140) % 3;
            let translateZ;
            if (normalizedPos < 1) {
              translateZ = -120 + (normalizedPos * 240);
            } else if (normalizedPos < 2) {
              translateZ = 100 - ((normalizedPos - 1) * 240);
            } else {
              translateZ = -120;
            }
            
            const distanceFromCenter = Math.abs(translateY - 140);
            const scale = Math.max(0.8, 1 - (distanceFromCenter / 400));
            const opacity = Math.max(0.1, 1 - (distanceFromCenter / 250));
            
            if (translateY < -200 || translateY > 500) return null;

            return (
              <div
                key={proj.key}
                className={`absolute left-1/2 -translate-x-1/2  w-72 h-32 ${proj.color} text-white font-bold flex items-center justify-center rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95`}
                style={{
                  transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.floor(10 - (translateY / 140)),
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                }}
                onClick={() => handleProjectClick(proj, proj.originalIndex)}
              >
                <span className="text-center px-2 flex items-center space-x-2">
                  <span className="text-2xl">{proj.emoji}</span>
                  <span>{proj.title}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Project Modal */}
      {expandedProject && (
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={closeExpanded}
        >
          <div 
            className={`bg-white rounded-2xl p-8 mx-4 max-w-md w-full shadow-2xl transform transition-all duration-300 ${
              isAnimating ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeExpanded}
              aria-label="Close modal"
              title="Close"
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Project content */}
            <div className="space-y-6">
              {/* Emoji and title */}
              <div className="text-center space-y-3">
                <div className="text-6xl animate-pulse">{expandedProject.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-800">{expandedProject.title}</h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-center">
                {expandedProject.description}
              </p>

              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4">
                <a
                  href={expandedProject.liveUrl}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                  <span className="font-medium">Live Preview</span>
                </a>

                <a
                  href={expandedProject.githubUrl}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                  <span className="font-medium">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
