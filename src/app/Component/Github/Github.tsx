"use client";
import { useEffect, useState } from "react";
import {FaGithub } from "react-icons/fa6";


interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Repository {
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Github() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [streak, setStreak] = useState(0);
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // ✅ Added for sliding effect

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("API request failed");
        const json = await res.json();
        setData(json.contributions || []);
        setRepos(json.repositories || []);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    if (repos.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % repos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [repos]);

  // Streak calculation
  useEffect(() => {
    if (data.length > 0) {
      const last30 = data.slice(-30);
      let count = 0;
      for (let i = last30.length - 1; i >= 0; i--) {
        if (last30[i].contributionCount > 0) {
          count++;
        } else {
          if (count === 0) continue;
          break;
        }
      }
      setStreak(count);
    }
  }, [data]);

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-200 hover:bg-gray-300";
    if (count < 3) return "bg-green-200 hover:bg-green-300";
    if (count < 6) return "bg-green-400 hover:bg-green-500";
    if (count < 10) return "bg-green-600 hover:bg-green-700";
    return "bg-green-800 hover:bg-green-900";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) return <div>Loading...</div>;

  const last30Days = data.slice(-30);
  const totalContributions = data.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <div className="fixed top-0 left-0 w-1/2 min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl relative top-48  left-24 ">
        
        {repos.length > 0 && (
          <div className="relative bottom-10  ">
            <h2 className="text-lg font-semibold mb-6  text-gray-700 text-center">
              Recent Code Drops
            </h2>

            <div className="relative flex left-24  ">
             

              <div className="relative w-full h-40 overflow-hidden">


<a
  href="https://github.com/relatablepradeep"
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-1/2 left-15 -translate-x-1/2 -translate-y-1/2
             flex items-center justify-center
             w-25 h-25 border-2 rounded-full
             bg-gray-200 text-gray-700
             transition-all duration-300
             hover:bg-blue-950 hover:text-white hover:scale-110
             cursor-pointer shadow-md hover:shadow-lg z-[9999] "
>
  <FaGithub className="text-6xl" />
</a>

                  

                 
                   


             




                {repos.map((repo, index) => (
                  <div
                    key={repo.name}
                    className="absolute w-full transition-transform duration-700  ease-in-out mt-5"
                    style={{
                      transform: `translateY(${(index - currentIndex) * 100}%)`,
                      opacity: index === currentIndex ? 1 : 0,
                      transition: "transform 0.7s ease-in-out, opacity 0.7s ease-in-out",
                    }}
                  >




                    <div className="w-80  mx-auto  bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 font-semibold text-sm line-clamp-1 block mb-2"
                      >
                        {repo.name}
                      </a>

                      {repo.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-tight">
                          {repo.description}
                        </p>
                      )}

                      {repo.primaryLanguage && (
                        <div className="flex justify-start">
                          <span
                            className="inline-block px-2 py-1 text-xs rounded-full font-medium"
                            style={{
                              backgroundColor: repo.primaryLanguage.color || "#6B7280",
                              color: "white",
                              fontSize: "10px",
                            }}
                          >
                            {repo.primaryLanguage.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}


                
                  





              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
            {error}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center space-x-5 p-6 text-sm text-gray-600">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
          </div>
          <span>More</span>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekdayNames.map((day) => (
            <div
              key={day}
              className="text-center font-medium text-sm text-gray-500 h-6 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-xl shadow-sm border">
          {last30Days.map((day) => (
            <div
              key={day.date}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({
                  date: `${formatDate(day.date)} - ${day.contributionCount} contribution${
                    day.contributionCount !== 1 ? "s" : ""
                  }`,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 8,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
              className={`w-8 h-8 rounded-md cursor-pointer transition-all duration-200 border border-gray-100 ${getContributionColor(
                day.contributionCount
              )} transform hover:scale-110 hover:shadow-sm`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{totalContributions}</div>
            <div className="text-sm text-gray-500">Total contributions (last 365 days)</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{streak}</div>
            <div className="text-sm text-gray-500">Current 30-day contribution streak</div>
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: "fixed",
              top: tooltip.y,
              left: tooltip.x,
              transform: "translate(-50%, -100%)",
              pointerEvents: "none",
              backgroundColor: "rgba(55, 65, 81, 0.9)",
              color: "white",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              zIndex: 9999,
            }}
          >
            {tooltip.date}
          </div>
        )}
      </div>
    </div>
  );
}