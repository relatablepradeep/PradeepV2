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
              isExpanded ? 'text-2xl text-blue-600 scale-110' : 'hover:text-blue-600'
            }`}
            onClick={onToggle}
          >
            {project.name}
          </h2>
          <div className="flex items-center gap-3">
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
              className={`text-gray-400 transition-all duration-500 ease-out transform ${
                isExpanded ? 'rotate-180 text-blue-500 scale-125' : 'hover:text-blue-500 hover:scale-110'
              }`} 
            />
          </div>
        </div>
        
        {/* Line from Project name to Live preview icon */}
        <div className={`mt-2 h-px bg-gradient-to-r from-gray-300 to-transparent transition-all duration-500 ${
          isExpanded ? 'bg-gradient-to-r from-blue-500 to-transparent' : ''
        }`}></div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-in slide-in-from-top duration-700 ease-out">
          <div className="mt-4 transform transition-all duration-700 ease-out animate-in fade-in scale-in-95">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-64 object-cover rounded-lg cursor-pointer transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-xl"
              onClick={onToggle}
            />
            
            {/* Action buttons below image */}
            <div className="flex justify-between items-center mt-4 animate-in slide-in-from-bottom duration-500 delay-300">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg transition-all duration-300 transform hover:bg-gray-700 hover:scale-105"
              >
                <Github size={18} className="transition-transform duration-300 hover:rotate-12" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:scale-105"
              >
                <ExternalLink size={18} className="transition-transform duration-300 hover:-rotate-12" />
                <span className="text-sm font-medium">Live Preview</span>
              </a>
            </div>
            
            {/* Project description */}
            <p className="mt-4 text-gray-600 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom duration-500 delay-500">
              {project.description}
            </p>
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
      githubUrl: "https://github.com/yourusername/ayurleaf",
      liveUrl: "https://ayurleaf-demo.com",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      description: "An innovative Ayurvedic medicine platform that connects users with traditional remedies and modern healthcare solutions. Built with React and Node.js."
    },
    {
      id: 2,
      name: "TaskFlow Manager",
      githubUrl: "https://github.com/yourusername/taskflow",
      liveUrl: "https://taskflow-demo.com",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
      description: "A comprehensive project management tool with real-time collaboration features, built using React, Express, and Socket.io for seamless team coordination."
    },
    {
      id: 3,
      name: "EcoTracker",
      githubUrl: "https://github.com/yourusername/ecotracker",
      liveUrl: "https://ecotracker-demo.com",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=800&h=400&fit=crop",
      description: "Environmental impact tracking application that helps users monitor their carbon footprint and suggests sustainable alternatives for daily activities."
    },
    {
      id: 4,
      name: "CodeCollab IDE",
      githubUrl: "https://github.com/yourusername/codecollab",
      liveUrl: "https://codecollab-demo.com",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      description: "Real-time collaborative code editor with syntax highlighting, live chat, and integrated version control for seamless pair programming sessions."
    }
  ];

  const handleProjectToggle = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Projects</h1>
          <p className="text-gray-600">Click on any project name to explore in detail</p>
        </div> */}
        
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
    </div>
  );
};

export default Liner;