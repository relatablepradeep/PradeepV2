"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
};

const Project = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isUserScrolling = useRef(false);

  // ✅ detect mobile safely
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ fetch GitHub repos (only those with homepage)
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/relatablepradeep/repos"
        );
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const data = await response.json();

        // ✅ Filter: only repos that have a homepage (live link)
        const filtered = data
          .filter((repo: Repo) => !repo.fork && repo.homepage && repo.homepage.trim() !== "")
          .sort(
            (a: Repo, b: Repo) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .slice(0, 10);

        setRepos(filtered);
      } catch (err: any) {
        setError("Failed to load projects from GitHub.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || repos.length === 0) return;

    const slider = sliderRef.current;
    const scrollStep = 1;
    const interval = 2000;
    let autoScroll: NodeJS.Timeout;

    const startScroll = () => {
      autoScroll = setInterval(() => {
        if (isUserScrolling.current) return;
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, interval);
    };

    const stopScroll = () => clearInterval(autoScroll);

    startScroll();

    const handleTouchStart = () => (isUserScrolling.current = true);
    const handleTouchEnd = () => (isUserScrolling.current = false);

    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      stopScroll();
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, [repos]);

  // 🚫 hide on desktop
  if (!isMobile) return null;

  return (
    <div className="relative bg-white block sm:hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-5 mb-2">
        <h1 className="text-black font-bold text-xl">My Work</h1>
      </div>

      {/* Loading & error states */}
      {loading && (
        <div className="flex justify-center items-center h-40 text-gray-400 animate-pulse">
          Loading projects...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-sm px-4">{error}</div>
      )}

      {!loading && repos.length === 0 && !error && (
        <div className="text-center text-gray-500 text-sm px-4">
          No public projects found with live links.
        </div>
      )}

      {/* Auto-rotating slider */}
      {!loading && repos.length > 0 && (
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 px-5 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="min-w-[280px] w-[280px] flex-shrink-0 snap-start p-4 rounded-lg shadow transition-transform hover:scale-[1.02] bg-white"
            >
              {/* Tags or language */}
              <div className="mb-2 flex flex-wrap gap-2">
                {repo.topics && repo.topics.length > 0 ? (
                  repo.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium border border-blue-500/30"
                    >
                      {topic}
                    </span>
                  ))
                ) : repo.language ? (
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30">
                    {repo.language}
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs italic">No tags</span>
                )}
              </div>

              {/* Project name (linked) */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-lg font-bold mb-1 hover:text-blue-600 transition-colors duration-200 block"
              >
                {repo.name}
              </a>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {repo.description || "No description provided."}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 items-center">
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg text-sm"
                >
                  <ExternalLink size={14} />
                  <span>Live</span>
                </a>

                <a
                  href={repo.html_url}
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
      )}
    </div>
  );
};

export default Project;
