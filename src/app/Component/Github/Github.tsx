"use client";
import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function GithubStreak() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [streak, setStreak] = useState(0);
  const [tooltip, setTooltip] = useState<{ date: string; x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For simplicity, I’m skipping the sample data and localStorage fallback here
  // But you can keep it if you want!

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("API request failed");
        const days: ContributionDay[] = await res.json();
        setData(days);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

 useEffect(() => {
  if (data.length > 0) {
    const last30 = data.slice(-30);
    let count = 0;

    // Start from the last day and move backward
    for (let i = last30.length - 1; i >= 0; i--) {
      if (last30[i].contributionCount > 0) {
        count++;
      } else {
        // If we haven't counted any day yet (streak start), continue checking previous days
        if (count === 0) {
          continue; // skip zero contributions at the end (today or recent)
        }
        // Once streak started, break at first zero day
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

  // Show only last 30 days for grid and tooltip
  const last30Days = data.slice(-30);

  // Total contributions for all 365 days
  const totalContributions = data.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <div className="w-1/2 min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 relative">
      <div className="max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
            {error}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
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

        {/* Contribution grid - last 30 days only */}
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
