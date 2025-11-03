"use client";
import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string;
  homepage: string;
  html_url: string;
  language?: string;
  updated_at?: string;
};

export default function Project() {
  const [isMobile, setIsMobile] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // ✅ Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Fetch GitHub repos dynamically
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/relatablepradeep/repos");
        if (!res.ok) throw new Error("GitHub API error");
        const data = await res.json();

        const filtered = data
          .filter((repo: Repo) => !repo.fork && repo.homepage && repo.homepage.trim() !== "")
          .sort(
            (a: Repo, b: Repo) =>
              new Date(b.updated_at || "").getTime() - new Date(a.updated_at || "").getTime()
          );

        setRepos(filtered);
      } catch (err) {
        setError("⚠️ Failed to fetch from GitHub API.");
        console.error("GitHub fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // ✅ Auto-scroll every 5s
  useEffect(() => {
    if (repos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % repos.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [repos.length]);

  // ✅ Swipe / Drag logic
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startX;
    setDragOffset(delta);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80;
    if (dragOffset > threshold) {
      // Swipe right → previous project
      setCurrentIndex((prev) => (prev - 1 + repos.length) % repos.length);
    } else if (dragOffset < -threshold) {
      // Swipe left → next project
      setCurrentIndex((prev) => (prev + 1) % repos.length);
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, startX]);

  // ✅ Helper: Limit words in description
  const truncateDescription = (text: string, limit = 20) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "…";
  };

  // ✅ Non-mobile message
  if (!isMobile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-sky-100">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">📱</div>
          <p className="text-lg">View on mobile to explore the project carousel</p>
        </div>
      </div>
    );
  }

  // ✅ Loading / Error / Empty states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-transparent text-sky-400 animate-pulse text-lg">
        Loading projects...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-transparent text-red-400 font-medium">
        {error}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-transparent text-sky-400 text-center px-6">
        🚀 No projects found with a live link.
        <br /> Add the homepage URL in your GitHub repo settings.
      </div>
    );
  }

  const currentRepo = repos[currentIndex];

  return (
    <div className="fixed inset-0 overflow-hidden bg-transparent">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Carousel container */}
      <div className="relative w-full h-full flex items-center justify-center px-6 py-8">
        <div
          className="relative w-full max-w-md select-none"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Card */}
          <div
            className="bg-white rounded-3xl shadow-2xl border-2 border-sky-400 p-8 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${dragOffset}px) scale(${isDragging ? 0.98 : 1})`,
            }}
          >
            {/* Repo Name */}
            <a
              href={currentRepo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-slate-800 hover:text-sky-600 transition-colors duration-200 text-center">
                {currentRepo.name}
              </h2>
            </a>

            {/* Description with word limit */}
            <p className="text-slate-600 text-center mb-8 min-h-[60px] leading-relaxed">
              {currentRepo.description
                ? truncateDescription(currentRepo.description, 20)
                : "No description provided."}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <a
                href={currentRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href={currentRepo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
                <span className="font-medium">Live</span>
              </a>
            </div>

            {/* Language badge */}
            {currentRepo.language && (
              <div className="mt-6 flex justify-center">
                <span className="px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                  {currentRepo.language}
                </span>
              </div>
            )}
          </div>


         
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
