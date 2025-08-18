"use client";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";

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

export default function Aboutus() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [streak, setStreak] = useState(0);
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch contributions and repositories
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
      } catch  {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Repository vertical slider
  useEffect(() => {
    if (repos.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % repos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [repos]);

  // Calculate 30-day streak
  useEffect(() => {
    if (data.length > 0) {
      const last30 = data.slice(-30);
      let count = 0;
      for (let i = last30.length - 1; i >= 0; i--) {
        if (last30[i].contributionCount > 0) count++;
        else if (count !== 0) break;
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

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  const last30Days = data.slice(-30);
  const totalContributions = data.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <div className="w-full p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center">
      <div className="max-w-lg w-full space-y-8">

        {/* Repositories Slider */}
        {repos.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Recent Code Drops
            </h2>
            <div className="relative w-full h-48 overflow-hidden">

              {/* GitHub Link */}
              <a
                href="https://github.com/relatablepradeep"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 flex items-center justify-center w-14 h-14 border-2 rounded-full bg-gray-200 text-gray-700 transition-all duration-300 hover:bg-blue-950 hover:text-white hover:scale-110 cursor-pointer shadow-md hover:shadow-lg z-50"
              >
                <FaGithub className="text-3xl" />
              </a>

              {/* Sliding repository cards */}
              {repos.map((repo, index) => (
                <div
                  key={repo.name}
                  className="absolute w-full transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateY(${(index - currentIndex) * 100}%)`,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                >
                  <div className="mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-xs">
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
                      <span
                        className="inline-block px-2 py-1 text-xs rounded-full font-medium"
                        style={{
                          backgroundColor: repo.primaryLanguage.color || "#6B7280",
                          color: "white",
                        }}
                      >
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
            {error}
          </div>
        )}

        {/* Contribution Legend */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
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

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {weekdayNames.map((day) => (
            <div
              key={day}
              className="text-center font-medium text-xs sm:text-sm text-gray-500 h-6 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Contribution Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 p-4 bg-white rounded-xl shadow-sm border">
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
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md cursor-pointer transition-all duration-200 border border-gray-100 ${getContributionColor(
                day.contributionCount
              )} transform hover:scale-110 hover:shadow-sm`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {totalContributions}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Total contributions (last 365 days)
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{streak}</div>
            <div className="text-xs sm:text-sm text-gray-500">
              Current 30-day contribution streak
            </div>
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
