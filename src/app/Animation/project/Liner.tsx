'use client'

import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Code2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  overview: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  language?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const handleCardClick = () => {
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`transition-all duration-700 ease-out transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      <div 
        onClick={handleCardClick}
        className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden 2xl:max-w-md xl:max-w-md lg:max-w-md md:max-w-md   "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative p-4 flex flex-col  ">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {project.overview}
              </p>
            </div>
            <div className="ml-4 p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
              <Code2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 ">
            {project.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 group-hover:bg-white text-gray-700 text-xs font-medium rounded-full transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 group-hover:bg-white text-gray-500 text-xs font-medium rounded-full">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Github className="w-4 h-4" />
              <span>Source</span>
            </div>
            {project.liveUrl && (
              <>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <button
                  onClick={handleLiveClick}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300"
                >
                  <Globe className="w-4 h-4" />
                  <span>Live</span>
                </button>
              </>
            )}
            <div className="ml-auto">
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Liner: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/relatablepradeep/repos`);
        const data = await res.json();

        const filtered = data.filter((repo: any) => !repo.fork);

        const formatted: Project[] = filtered.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          overview: repo.description || "A project showcasing innovative solutions and creative problem-solving.",
          techStack: repo.language ? [repo.language, 'GitHub'] : ['GitHub'],
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || "",
          language: repo.language
        }));

        setProjects(formatted);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > projectsPerPage) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % Math.ceil(projects.length / projectsPerPage));
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [projects.length]);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const currentProjects = projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="flex justify-center    relative  2xl:top-8 xl:top-69 lg:top-59 md:top-59 ">
      <div className="  ">
      

       <div className="grid gap-x-4 gap-y-2 p-4 grid-cols-1 md:grid-cols-2">

          {currentProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center  ">
            <button
              onClick={goToPrevPage}
              className="p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPage === idx 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNextPage}
              className="p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

    
      </div>
    </div>
  );
};

export default Liner;