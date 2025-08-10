'use client'

import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, isExpanded, onToggle, isHidden, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  // Direction based on index for entrance animation
  const getEntranceDirection = (index) => {
    const directions = ['left', 'right', 'top', 'bottom'];
    return directions[index % 4];
  };

  const direction = getEntranceDirection(index);
  
  const entranceClass = {
    left: 'translate-x-[-100%]',
    right: 'translate-x-[100%]',
    top: 'translate-y-[-100%]',
    bottom: 'translate-y-[100%]'
  };

  const visibleClass = 'translate-x-0 translate-y-0';

  if (isHidden) {
    return (
      <div className={`mb-6 transition-all duration-700 ease-out transform opacity-0 scale-75`} />
    );
  }

  return (
    <div className={`mb-6 transition-all duration-700 ease-out transform ${
      isVisible ? `opacity-100 ${visibleClass}` : `opacity-0 ${entranceClass[direction]}`
    } ${isExpanded ? 'scale-105' : 'scale-100'}`}>
      
      {/* Header Section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 
            className={`text-xl font-semibold text-gray-800 cursor-pointer transition-all duration-500 ease-out transform ${
              isExpanded ? 'opacity-0 scale-75' : 'hover:text-blue-600'
            }`}
            onClick={onToggle}
          >
            {project.name}
          </h2>
          <div className={`flex items-center gap-3 transition-all duration-500 ease-out transform ${
            isExpanded ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <Github size={20} className="text-gray-600 hover:text-gray-800 transition-all duration-300" />
            </a>
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <ExternalLink size={20} className="text-gray-600 hover:text-gray-800 transition-all duration-300" />
            </a>
            <ArrowUpRight 
              size={20} 
              className="text-gray-400 transition-all duration-500 ease-out transform hover:text-blue-500 hover:scale-110"
            />
          </div>
        </div>
        
        {/* Line from Project name to Live preview icon */}
        <div className={`mt-2 h-px bg-gradient-to-r from-gray-300 to-transparent transition-all duration-500 ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}></div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="mt-2 relative">
            {/* Moving border effect */}
            <div className="absolute -inset-[3px] rounded-xl">
              <div className="absolute inset-0 rounded-xl opacity-90" 
                   style={{
                     background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
                     backgroundSize: '400% 400%',
                     animation: 'rainbowMove 1s linear infinite'
                   }}>
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes rainbowMove {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }
            `}} />
            
            {/* Main content box */}
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              
              {/* Project Emoji/Symbol */}
              <div className="text-center mb-6">
                <span className="text-6xl">{project.emoji}</span>
              </div>
              
              {/* Project Name */}
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {project.name}
              </h3>
              
              {/* Brief Overview */}
              <p className="text-gray-600 text-center leading-relaxed mb-6">
                {project.overview}
              </p>
              
              {/* Tech Stack */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.techStack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105"
                >
                  <span className="text-lg">🌐</span>
                  <span className="font-medium">Website</span>
                </a>
                
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg transition-all duration-300 transform hover:bg-gray-700 hover:scale-105"
                >
                  <Github size={18} className="transition-transform duration-300 hover:rotate-12" />
                  <span className="font-medium">Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Liner = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      name: "Project Ayurleaf",
      emoji: "🩺",
      overview: "An innovative Ayurvedic medicine platform that connects users with traditional remedies and modern healthcare solutions.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/yourusername/ayurleaf",
      liveUrl: "https://ayurleaf-demo.com"
    },
    {
      id: 2,
      name: "TaskFlow Manager",
      emoji: "📊",
      overview: "A comprehensive project management tool with real-time collaboration features for seamless team coordination.",
      techStack: ["React", "Express", "Socket.io", "PostgreSQL", "Redis"],
      githubUrl: "https://github.com/yourusername/taskflow",
      liveUrl: "https://taskflow-demo.com"
    },
    {
      id: 3,
      name: "EcoTracker",
      emoji: "🌱",
      overview: "Environmental impact tracking application that helps users monitor their carbon footprint and suggests sustainable alternatives.",
      techStack: ["React", "Node.js", "Chart.js", "OpenCage API", "Firebase"],
      githubUrl: "https://github.com/yourusername/ecotracker",
      liveUrl: "https://ecotracker-demo.com"
    },
    {
      id: 4,
      name: "CodeCollab IDE",
      emoji: "💻",
      overview: "Real-time collaborative code editor with syntax highlighting, live chat, and integrated version control for pair programming.",
      techStack: ["React", "Node.js", "Monaco Editor", "WebSocket", "Docker"],
      githubUrl: "https://github.com/yourusername/codecollab",
      liveUrl: "https://codecollab-demo.com"
    }
  ];

  const handleProjectToggle = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    // <div className="min-h-screen  py-8">
      <div className="max-w-4xl mx-auto   px-4">
       
        
        <div className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedProject === project.id}
              onToggle={() => handleProjectToggle(project.id)}
              isHidden={expandedProject !== null && expandedProject !== project.id}
            />
          ))}
        </div>
        
        {expandedProject && (
          <div className="text-center mt-6 animate-in fade-in slide-in-from-bottom duration-500">
            <button
              onClick={() => setExpandedProject(null)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-all duration-300 transform hover:scale-105"
            >
              ← Show all projects
            </button>
          </div>
        )}
      </div>
    // </div>
  );
};

export default Liner;