'use client'

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const Project = () => {
  const projects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center",
      name: "E-Commerce Dashboard",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&crop=center",
      name: "Weather App",
      techStack: ["React", "API", "CSS3", "JavaScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      name: "Task Manager",
      techStack: ["Vue.js", "Firebase", "Vuetify"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
      name: "Social Media App",
      techStack: ["React Native", "Express", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop&crop=center",
      name: "Portfolio Website",
      techStack: ["Next.js", "Framer Motion", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <div className="relative bg-white block sm:hidden ">
      
      {/* Header Row */}
      <div className="flex justify-between items-center px-5 ">
        <h1 className="text-black font-bold text-xl">My work</h1>
        <h1 className="text-blue-500 text-sm cursor-pointer">See All</h1>
      </div>

      {/* Slider */}
      <div 
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 px-5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="min-w-[280px] w-[280px] flex-shrink-0 snap-start p-4 rounded-lg shadow"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden rounded-xl mb-3 shadow-lg">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-35 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="mb-2">
              <div className="flex space-x-3 overflow-hidden scrollbar-hide">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs font-medium border border-blue-500/30 flex-shrink-0"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Name */}
            <h3 className="text-black text-lg font-bold ">
              {project.name}
            </h3>

            {/* Buttons */}
            <div className="flex gap-3 items-center">
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg text-sm"
              >
                <ExternalLink size={14} />
                <span>Live</span>
              </a>
              
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;   