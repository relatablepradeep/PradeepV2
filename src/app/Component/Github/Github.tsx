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

export default function Github() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [streak, setStreak] = useState(0);
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch GitHub API data
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
      } catch {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (repos.length > 1) {
      const interval = setInterval(
        () => setCurrentIndex((prev) => (prev + 1) % repos.length),
        3000
      );
      return () => clearInterval(interval);
    }
  }, [repos]);

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

  // Helpers
  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-200 hover:bg-gray-300";
    if (count < 3) return "bg-green-200 hover:bg-green-300";
    if (count < 6) return "bg-green-400 hover:bg-green-500";
    if (count < 10) return "bg-green-600 hover:bg-green-700";
    return "bg-green-800 hover:bg-green-900";
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  if (isLoading) return <div>Loading...</div>;

  const last30Days = data.slice(-30);
  const totalContributions = data.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <div className="hidden md:block fixed top-0 left-0 w-1/2 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto 2xl:top-16 xl:top-14 lg:top-14 md:top-12">
      <div className="flex flex-col items-center py-15 px-15  space-y-10">

     
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Recent Code Drops
        </h2>


        <section className="flex items-center justify-center gap-5    xl:w-full  lg:w-full  md:w-full 2xl:w-full">

          <div className="flex flex-col items-center">
            <a
              href="https://github.com/relatablepradeep"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center 2xl:w-20 2xl:h-20 border-2 border-gray-300 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-900 hover:text-white transition-transform hover:scale-110"
            >
              <FaGithub className="text-6xl" />
            </a>
          </div>

          <div className="relative w-full 2xl:max-w-xs  xl:max-w-xs  lg:max-w-xs md:max-w-xs 2xl:h-35 xl:h-35 lg:h-35 md:h-35 ">
            {repos.length > 0 ? (
              repos.map((repo, index) => (
                <div
                  key={repo.name}
                  className="absolute inset-0 flex flex-col justify-center items-start transition-transform duration-700 ease-in-out bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow border"
                  style={{
                    transform: `translateY(${(index - currentIndex) * 100}%)`,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                >
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 font-semibold text-sm mb-2"
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  {repo.primaryLanguage && (
                    <span
                      className="px-2 py-1 text-xs rounded-full font-medium text-white"
                      style={{
                        backgroundColor: repo.primaryLanguage.color || "#6B7280",
                      }}
                    >
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No repositories found</p>
            )}
          </div>
        </section>

        
        <section className=" w-full 2xl:max-w-xl xl:max-w-3md">
          {error && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-center  mb-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 bg-gray-200 rounded-sm"></div>
              <div className="w-2.5 h-2.5 bg-green-200 rounded-sm"></div>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-sm"></div>
              <div className="w-2.5 h-2.5 bg-green-600 rounded-sm"></div>
              <div className="w-2.5 h-2.5 bg-green-800 rounded-sm"></div>
            </div>
            <span>More</span>
          </div>

          <div className="grid grid-cols-7 mb-1 ">
            {weekdayNames.map((day) => (
              <div
                key={day}
                className="text-center font-medium text-xs text-gray-500 h-4 flex items-center justify-center "
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-5 2xl:pl-10 2xl:pt-2 xl:pb-2  xl:pl-10 xl:pt-2 2xl:pb-2 lg:pl-10 lg:pt-2 lg:pb-2    md:pl-10 md:pt-2 md:pb-2 bg-gray-50 rounded-xl border">
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
                className={`w-6 h-6 rounded-md cursor-pointer border border-gray-200 ${getContributionColor(
                  day.contributionCount
                )} hover:scale-110 transition-transform`}
              />
            ))}
          </div>
        </section>

        <section className="  w-full max-w-md">
          <div className="grid grid-cols-2 gap-2">
            <div className="  text-center">
              <div className="text-2xl font-bold text-blue-600">{totalContributions}</div>
              <div className="text-xs text-gray-500">Total contributions (last 365 days)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{streak}</div>
              <div className="text-xs text-gray-500">Current 30-day streak</div>
            </div>
          </div>
        </section>

        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: "fixed",
              top: tooltip.y,
              left: tooltip.x,
              transform: "translate(-50%, -100%)",
              pointerEvents: "none",
              backgroundColor: "rgba(55,65,81,0.9)",
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
